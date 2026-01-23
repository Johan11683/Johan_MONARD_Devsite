import { NextResponse } from "next/server";
import type { Project } from "@/server/models/projects";
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "@/server/repositories/project.repository";

export async function listProjectsController() {
  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function getProjectController(id: string) {
  const project = await getProjectById(id);

  if (!project) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function createProjectController(req: Request) {
  const body = await req.json();

  const title = String(body?.title ?? "").trim();
  const description = String(body?.description ?? "").trim();
  const url = body?.url ? String(body.url).trim() : undefined;
  const imageUrl = body?.imageUrl ? String(body.imageUrl).trim() : undefined;

  if (!title || !description) {
    return NextResponse.json(
      { error: "title and description are required" },
      { status: 400 }
    );
  }

  const project = await createProject({ title, description, url, imageUrl });

  return NextResponse.json(project, { status: 201 });
}

export async function updateProjectController(req: Request, id: string) {
  const body = await req.json();

  const patch: Partial<Omit<Project, "id" | "createdAt" | "updatedAt">> = {};

  if (body?.title !== undefined) patch.title = String(body.title).trim();
  if (body?.description !== undefined) patch.description = String(body.description).trim();
  if (body?.url !== undefined) patch.url = body.url ? String(body.url).trim() : undefined;
  if (body?.imageUrl !== undefined) patch.imageUrl = body.imageUrl ? String(body.imageUrl).trim() : undefined;

  // validation légère
  if (patch.title === "") {
    return NextResponse.json({ error: "title cannot be empty" }, { status: 400 });
  }

  if (patch.description === "") {
    return NextResponse.json({ error: "description cannot be empty" }, { status: 400 });
  }

  const updated = await updateProject(id, patch);

  if (!updated) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function deleteProjectController(id: string) {
  const ok = await deleteProject(id);

  if (!ok) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
