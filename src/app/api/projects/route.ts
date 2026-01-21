import type { NextRequest } from "next/server";
import { requireAdmin } from "@/server/middlewares/requireAdmin";
import { listProjectsController, createProjectController } from "@/server/controllers/project.controller";

export async function GET() {
  return listProjectsController();
}

export async function POST(req: NextRequest) {
  const block = requireAdmin(req);
  if (block) return block;

  return createProjectController(req);
}
