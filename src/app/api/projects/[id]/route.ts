// src/app/api/projects/[id]/route.ts
import type { NextRequest } from "next/server";
import { requireAdmin } from "@/server/middlewares/requireAdmin";
import {
  getProjectController,
  updateProjectController,
  deleteProjectController,
} from "@/server/controllers/project.controller";

type RouteCtx = { params: Promise<{ id: string }> };

export async function GET(_: NextRequest, { params }: RouteCtx) {
  const { id } = await params;
  return getProjectController(id);
}

export async function PUT(req: NextRequest, { params }: RouteCtx) {
  const block = requireAdmin(req);
  if (block) return block;

  const { id } = await params;
  return updateProjectController(req, id);
}

export async function DELETE(req: NextRequest, { params }: RouteCtx) {
  const block = requireAdmin(req);
  if (block) return block;

  const { id } = await params;
  return deleteProjectController(id);
}
