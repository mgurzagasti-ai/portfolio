import { NextResponse } from "next/server";
import { isValidAdminPassword } from "@/lib/admin";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };

  if (!body.password || !isValidAdminPassword(body.password)) {
    return NextResponse.json(
      { message: "Contrasena incorrecta." },
      { status: 401 },
    );
  }

  return NextResponse.json({ ok: true });
}
