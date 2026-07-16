import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { CloverError } from "@/lib/clover";
import { createCloverMenuItem, loadCloverMenu, MenuItemInput } from "@/lib/clover-menu";
import { isMenuSectionId, MenuSectionId } from "@/lib/menu";

function unauthorized() {
  return NextResponse.json({ error: "Your session has expired." }, { status: 401 });
}

function parseItem(body: unknown): { section: MenuSectionId; input: MenuItemInput } | null {
  if (!body || typeof body !== "object") return null;
  const value = body as Record<string, unknown>;
  const section = sectionValue(value.section);
  const name = typeof value.name === "string" ? value.name.trim() : "";
  const description = typeof value.description === "string" ? value.description.trim() : "";
  const price = Number(value.price);
  if (!section || !name || !Number.isInteger(price) || price < 0) return null;
  return { section, input: { name, price, description } };
}

function sectionValue(value: unknown) {
  return isMenuSectionId(value) ? value : null;
}

function failure(error: unknown) {
  if (error instanceof CloverError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  console.error("Menu admin error", error);
  return NextResponse.json({ error: "The menu could not be saved in Clover." }, { status: 500 });
}

export async function GET() {
  if (!(await getAdminSession())) return unauthorized();
  try {
    return NextResponse.json({ sections: await loadCloverMenu({ bootstrap: true }) });
  } catch (error) {
    return failure(error);
  }
}

export async function POST(request: Request) {
  if (!(await getAdminSession())) return unauthorized();
  const parsed = parseItem(await request.json().catch(() => null));
  if (!parsed) {
    return NextResponse.json({ error: "Enter a name and a valid price." }, { status: 400 });
  }
  try {
    return NextResponse.json({
      item: await createCloverMenuItem(parsed.section, parsed.input),
    });
  } catch (error) {
    return failure(error);
  }
}
