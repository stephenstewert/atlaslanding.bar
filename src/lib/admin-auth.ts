import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "atlas_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 12;

type SessionPayload = {
  email: string;
  expiresAt: number;
};

function encode(value: string) {
  return Buffer.from(value).toString("base64url");
}

function decode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function secret() {
  return process.env.ADMIN_SESSION_SECRET;
}

function sign(payload: string) {
  const sessionSecret = secret();
  if (!sessionSecret) return null;
  return createHmac("sha256", sessionSecret).update(payload).digest("base64url");
}

export function adminAuthConfigured() {
  return Boolean(
    process.env.ADMIN_EMAIL &&
      process.env.ADMIN_PASSWORD &&
      process.env.ADMIN_SESSION_SECRET
  );
}

export function credentialsAreValid(email: string, password: string) {
  const expectedEmail = process.env.ADMIN_EMAIL;
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedEmail || !expectedPassword) return false;

  const suppliedEmail = Buffer.from(email.trim().toLowerCase());
  const configuredEmail = Buffer.from(expectedEmail.trim().toLowerCase());
  const suppliedPassword = Buffer.from(password);
  const configuredPassword = Buffer.from(expectedPassword);

  return (
    suppliedEmail.length === configuredEmail.length &&
    suppliedPassword.length === configuredPassword.length &&
    timingSafeEqual(suppliedEmail, configuredEmail) &&
    timingSafeEqual(suppliedPassword, configuredPassword)
  );
}

export function createAdminSession(email: string) {
  const payload: SessionPayload = {
    email: email.trim().toLowerCase(),
    expiresAt: Date.now() + SESSION_DURATION_SECONDS * 1000,
  };
  const encodedPayload = encode(JSON.stringify(payload));
  const signature = sign(encodedPayload);
  if (!signature) throw new Error("Admin session secret is not configured.");
  return `${encodedPayload}.${signature}`;
}

export function verifyAdminSession(value?: string): SessionPayload | null {
  if (!value) return null;
  const [payload, suppliedSignature] = value.split(".");
  if (!payload || !suppliedSignature) return null;
  const expectedSignature = sign(payload);
  if (!expectedSignature) return null;

  const supplied = Buffer.from(suppliedSignature);
  const expected = Buffer.from(expectedSignature);
  if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) {
    return null;
  }

  try {
    const parsed = JSON.parse(decode(payload)) as SessionPayload;
    if (!parsed.email || parsed.expiresAt <= Date.now()) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  return verifyAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}

export const adminSessionMaxAge = SESSION_DURATION_SECONDS;
