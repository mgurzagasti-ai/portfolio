import { NextResponse } from "next/server";
import { isValidAdminPassword } from "@/lib/admin";
import {
  deleteProjectImage,
  getProjects,
  saveProjectImage,
  saveProjects,
  slugifyProjectName,
  type Project,
} from "@/lib/projects";

export const runtime = "nodejs";

function badRequest(message: string, status = 400) {
  return NextResponse.json({ message }, { status });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = String(formData.get("password") || "");

  if (!isValidAdminPassword(password)) {
    return badRequest("Contrasena incorrecta.", 401);
  }

  const title = String(formData.get("title") || "").trim();
  const type = String(formData.get("type") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const status = String(formData.get("status") || "").trim();
  const stackRaw = String(formData.get("stack") || "").trim();
  const liveUrl = String(formData.get("liveUrl") || "").trim();
  const repoUrl = String(formData.get("repoUrl") || "").trim();
  const imageFile = formData.get("image");

  if (!title || !type || !description || !status || !stackRaw) {
    return badRequest("Completa titulo, tipo, descripcion, estado y stack.");
  }

  const projects = await getProjects();
  const nextIdBase = slugifyProjectName(title) || `trabajo-${Date.now()}`;
  const id = projects.some((project) => project.id === nextIdBase)
    ? `${nextIdBase}-${Date.now()}`
    : nextIdBase;

  let image: string | undefined;
  if (imageFile instanceof File && imageFile.size > 0) {
    image = await saveProjectImage(imageFile, title);
  }

  const project: Project = {
    id,
    title,
    type,
    description,
    status,
    stack: stackRaw
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    ...(liveUrl ? { liveUrl } : {}),
    ...(repoUrl ? { repoUrl } : {}),
    ...(image ? { image } : {}),
  };

  projects.unshift(project);
  await saveProjects(projects);

  return NextResponse.json({ ok: true, project });
}

export async function DELETE(request: Request) {
  const body = (await request.json()) as { id?: string; password?: string };

  if (!body.password || !isValidAdminPassword(body.password)) {
    return badRequest("Contrasena incorrecta.", 401);
  }

  if (!body.id) {
    return badRequest("Falta el identificador del proyecto.");
  }

  const projects = await getProjects();
  const project = projects.find((item) => item.id === body.id);

  if (!project) {
    return badRequest("No se encontro el proyecto.", 404);
  }

  await deleteProjectImage(project.image);
  await saveProjects(projects.filter((item) => item.id !== body.id));

  return NextResponse.json({ ok: true });
}
