import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

export type Project = {
  id: string;
  title: string;
  type: string;
  description: string;
  stack: string[];
  status: string;
  liveUrl?: string;
  repoUrl?: string;
  image?: string;
};

const projectsFile = path.join(process.cwd(), "data", "projects.json");
const uploadsDir = path.join(process.cwd(), "public", "uploads", "projects");

export async function getProjects() {
  const file = await readFile(projectsFile, "utf8");
  const projects = JSON.parse(file) as Project[];

  return projects;
}

export async function saveProjects(projects: Project[]) {
  await mkdir(path.dirname(projectsFile), { recursive: true });
  await writeFile(projectsFile, JSON.stringify(projects, null, 2), "utf8");
}

export function slugifyProjectName(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export async function saveProjectImage(file: File, projectTitle: string) {
  if (!file.size) {
    return undefined;
  }

  await mkdir(uploadsDir, { recursive: true });

  const extension = path.extname(file.name) || ".png";
  const safeName = `${Date.now()}-${slugifyProjectName(projectTitle)}${extension}`;
  const target = path.join(uploadsDir, safeName);
  const buffer = Buffer.from(await file.arrayBuffer());

  await writeFile(target, buffer);

  return `/uploads/projects/${safeName}`;
}

export async function deleteProjectImage(imagePath?: string) {
  if (!imagePath?.startsWith("/uploads/projects/")) {
    return;
  }

  const filename = imagePath.replace("/uploads/projects/", "");
  const target = path.join(uploadsDir, filename);

  try {
    await unlink(target);
  } catch {
    // Ignore missing files so deleting a project never breaks the admin flow.
  }
}
