import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import {
  CloverError,
  CloverItemInput,
  createCloverItem,
  listCloverItems,
} from "@/lib/clover";

function unauthorized() {
  return NextResponse.json({ error: "Your session has expired." }, { status: 401 });
}

function parseItem(body: unknown): CloverItemInput | null {
  if (!body || typeof body !== "object") return null;
  const item = body as Record<string, unknown>;
  const name = typeof item.name === "string" ? item.name.trim() : "";
  const price = Number(item.price);
  const sku = typeof item.sku === "string" ? item.sku.trim() : "";
  if (!name || !Number.isInteger(price) || price < 0) return null;

  return {
    name,
    price,
    ...(sku ? { sku } : {}),
    available: item.available !== false,
    hidden: item.hidden === true,
    priceType: "FIXED",
  };
}

function errorResponse(error: unknown) {
  if (error instanceof CloverError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  console.error("Clover admin error", error);
  return NextResponse.json({ error: "Something went wrong while contacting Clover." }, { status: 500 });
}

export async function GET() {
  if (!(await getAdminSession())) return unauthorized();
  try {
    return NextResponse.json({ items: await listCloverItems() });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  if (!(await getAdminSession())) return unauthorized();
  const input = parseItem(await request.json().catch(() => null));
  if (!input) {
    return NextResponse.json({ error: "Enter a name and a valid price." }, { status: 400 });
  }
  try {
    return NextResponse.json({ item: await createCloverItem(input) });
  } catch (error) {
    return errorResponse(error);
  }
}
