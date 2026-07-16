import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { CloverError } from "@/lib/clover";
import {
  deleteCloverMenuItem,
  MenuItemInput,
  updateCloverMenuItem,
} from "@/lib/clover-menu";
import { isMenuSectionId, MenuSectionId } from "@/lib/menu";

function failure(error: unknown) {
  if (error instanceof CloverError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  console.error("Menu item error", error);
  return NextResponse.json({ error: "The menu item could not be saved in Clover." }, { status: 500 });
}

function parseItem(body: unknown): { section: MenuSectionId; input: MenuItemInput } | null {
  if (!body || typeof body !== "object") return null;
  const value = body as Record<string, unknown>;
  const name = typeof value.name === "string" ? value.name.trim() : "";
  const description = typeof value.description === "string" ? value.description.trim() : "";
  const price = Number(value.price);
  if (!isMenuSectionId(value.section) || !name || !Number.isInteger(price) || price < 0) {
    return null;
  }
  return { section: value.section, input: { name, price, description } };
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Your session has expired." }, { status: 401 });
  }
  const parsed = parseItem(await request.json().catch(() => null));
  if (!parsed) {
    return NextResponse.json({ error: "Enter a name and a valid price." }, { status: 400 });
  }
  try {
    const { id } = await context.params;
    return NextResponse.json({
      item: await updateCloverMenuItem(id, parsed.section, parsed.input),
    });
  } catch (error) {
    return failure(error);
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Your session has expired." }, { status: 401 });
  }
  try {
    const body = (await request.json().catch(() => null)) as { section?: unknown } | null;
    if (!body || !isMenuSectionId(body.section)) {
      return NextResponse.json({ error: "The menu section is required." }, { status: 400 });
    }
    const { id } = await context.params;
    await deleteCloverMenuItem(id, body.section);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return failure(error);
  }
}
