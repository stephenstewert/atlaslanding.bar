import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  adminAuthConfigured,
  adminSessionMaxAge,
  createAdminSession,
  credentialsAreValid,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!adminAuthConfigured()) {
    return NextResponse.json(
      { error: "Admin access has not been configured yet." },
      { status: 503 }
    );
  }

  const body = (await request.json().catch(() => null)) as
    | { email?: string; password?: string }
    | null;
  const email = body?.email ?? "";
  const password = body?.password ?? "";

  if (!credentialsAreValid(email, password)) {
    return NextResponse.json({ error: "Incorrect email or password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, createAdminSession(email), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: adminSessionMaxAge,
  });
  return response;
}
