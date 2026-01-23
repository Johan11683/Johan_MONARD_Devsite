// src/app/api/admin/uploads/route.ts
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

function safeSlug(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function jsonError(message: string, status = 400, extra?: Record<string, unknown>) {
  return NextResponse.json({ error: message, ...(extra ?? {}) }, { status });
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const file = form.get("file");
    const projectId = String(form.get("projectId") ?? "").trim();
    const previousPublicId = String(form.get("previousPublicId") ?? "").trim();

    if (!file || !(file instanceof File)) {
      return jsonError("Fichier manquant");
    }
    if (!projectId) {
      return jsonError("projectId manquant");
    }

    const safeId = safeSlug(projectId);
    if (!safeId) {
      return jsonError("projectId invalide");
    }

    // ✅ public_id stable => overwrite au même endroit (donc pas d’empilement)
    const publicId = `cv/projects/${safeId}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploaded = await new Promise<{ secure_url: string; public_id: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              public_id: publicId,
              overwrite: true, // ✅ remplace l'existant
              invalidate: true, // ✅ purge CDN
              resource_type: "image",
              folder: undefined, // on force via public_id complet
            },
            (err, res) => {
              if (err || !res) return reject(err);
              resolve({ secure_url: res.secure_url, public_id: res.public_id });
            }
          )
          .end(buffer);
      }
    );

    // ✅ Option bonus :
    // si tu uploadais avant sur un autre publicId (cas rare : tu changes la logique, ou ancien contenu),
    // on supprime l'ancien "best effort"
    if (previousPublicId && previousPublicId !== uploaded.public_id) {
      cloudinary.uploader
        .destroy(previousPublicId, { resource_type: "image", invalidate: true })
        .catch((e) => console.error("cleanup old image failed:", e));
    }

    return NextResponse.json({
      url: uploaded.secure_url,
      publicId: uploaded.public_id,
    });
  } catch (e) {
    console.error("POST /api/admin/uploads error:", e);
    return jsonError("Upload impossible", 500);
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const publicId = (url.searchParams.get("publicId") ?? "").trim();

    if (!publicId) {
      return jsonError("publicId manquant");
    }

    const res = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
      invalidate: true,
    });

    return NextResponse.json({ ok: true, result: res.result });
  } catch (e) {
    console.error("DELETE /api/admin/uploads error:", e);
    return jsonError("Delete impossible", 500);
  }
}
