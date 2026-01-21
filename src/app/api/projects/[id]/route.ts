import type { NextRequest } from "next/server";
import { requireAdmin } from "@/server/middlewares/requireAdmin";
import {
  getProjectController,
  updateProjectController,
  deleteProjectController,
} from "@/server/controllers/project.controller";

export async function GET(_: NextRequest, ctx: { params: { id: string } }) {
  return getProjectController(ctx.params.id);
}

export async function PUT(req: NextRequest, ctx: { params: { id: string } }) {
  const block = requireAdmin(req);
  if (block) return block;

  return updateProjectController(req, ctx.params.id);
}

export async function DELETE(req: NextRequest, ctx: { params: { id: string } }) {
  const block = requireAdmin(req);
  if (block) return block;

  return deleteProjectController(ctx.params.id);
}
