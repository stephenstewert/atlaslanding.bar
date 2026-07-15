import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { CloverError, CloverItemInput, updateCloverItem } from "@/lib/clover";

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

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Your session has expired." }, { status: 401 });
  }
  const input = parseItem(await request.json().catch(() => null));
  if (!input) {
    return NextResponse.json({ error: "Enter a name and a valid price." }, { status: 400 });
  }

  try {
    const { id } = await context.params;
    return NextResponse.json({ item: await updateCloverItem(id, input) });
  } catch (error) {
    if (error instanceof CloverError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Clover update error", error);
    return NextResponse.json({ error: "Something went wrong while contacting Clover." }, { status: 500 });
  }
}
