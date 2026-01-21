import { promises as fs } from "fs";
import path from "path";
import type { Project } from "@/server/models/projects";

const filePath = path.join(process.cwd(), "src", "server", "data", "projects.json");

async function readAll(): Promise<Project[]> {
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as Project[];
}

async function writeAll(projects: Project[]): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(projects, null, 2), "utf-8");
}

export async function getProjects(): Promise<Project[]> {
  return readAll();
}

export async function getProjectById(id: string): Promise<Project | null> {
  const all = await readAll();
  return all.find((p) => p.id === id) ?? null;
}

export async function createProject(input: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<Project> {
  const all = await readAll();
  const now = new Date().toISOString();

  const project: Project = {
    id: crypto.randomUUID(),
    ...input,
    createdAt: now,
    updatedAt: now,
  };

  all.unshift(project);
  await writeAll(all);
  return project;
}

export async function updateProject(
  id: string,
  patch: Partial<Omit<Project, "id" | "createdAt" | "updatedAt">>
): Promise<Project | null> {
  const all = await readAll();
  const idx = all.findIndex((p) => p.id === id);
  if (idx === -1) return null;

  const updated: Project = {
    ...all[idx],
    ...patch,
    updatedAt: new Date().toISOString(),
  };

  all[idx] = updated;
  await writeAll(all);
  return updated;
}

export async function deleteProject(id: string): Promise<boolean> {
  const all = await readAll();
  const next = all.filter((p) => p.id !== id);
  if (next.length === all.length) return false;

  await writeAll(next);
  return true;
}
