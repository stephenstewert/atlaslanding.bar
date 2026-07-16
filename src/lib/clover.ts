import "server-only";

export type CloverItem = {
  id: string;
  name: string;
  price: number;
  priceType?: "FIXED" | "VARIABLE" | "PER_UNIT";
  sku?: string;
  alternateName?: string;
  available?: boolean;
  hidden?: boolean;
  modifiedTime?: number;
};

export type CloverItemInput = {
  name: string;
  price: number;
  sku?: string;
  alternateName?: string;
  available: boolean;
  hidden: boolean;
  priceType: "FIXED";
};

type CloverCollection<T> = { elements?: T[] };

export type CloverCategory = {
  id: string;
  name: string;
  sortOrder?: number;
};

export class CloverError extends Error {
  status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.name = "CloverError";
    this.status = status;
  }
}

export function cloverConfigured() {
  return Boolean(process.env.CLOVER_MERCHANT_ID && process.env.CLOVER_API_TOKEN);
}

function config() {
  const merchantId = process.env.CLOVER_MERCHANT_ID;
  const token = process.env.CLOVER_API_TOKEN;
  const baseUrl = (process.env.CLOVER_API_BASE_URL ?? "https://api.clover.com").replace(/\/$/, "");

  if (!merchantId || !token) {
    throw new CloverError("Clover has not been connected yet.", 503);
  }

  return { merchantId, token, baseUrl };
}

async function cloverRequest<T>(path: string, init: RequestInit = {}) {
  const { merchantId, token, baseUrl } = config();
  const response = await fetch(`${baseUrl}/v3/merchants/${merchantId}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "AtlasLanding-MenuAdmin/1.0",
      ...init.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    let message = `Clover request failed (${response.status}).`;
    try {
      const data = (await response.json()) as { message?: string; error?: string };
      message = data.message ?? data.error ?? message;
    } catch {
      // Clover sometimes returns an empty or non-JSON error response.
    }
    throw new CloverError(message, response.status);
  }

  if (response.status === 204) return undefined as T;
  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

export async function listCloverItems() {
  const items: CloverItem[] = [];
  const limit = 100;

  for (let offset = 0; offset < 2000; offset += limit) {
    const result = await cloverRequest<CloverCollection<CloverItem>>(
      `/items?limit=${limit}&offset=${offset}`
    );
    const page = result.elements ?? [];
    items.push(...page);
    if (page.length < limit) break;
  }

  return items.sort((a, b) => a.name.localeCompare(b.name));
}

export function createCloverItem(input: CloverItemInput) {
  return cloverRequest<CloverItem>("/items", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateCloverItem(id: string, input: CloverItemInput) {
  return cloverRequest<CloverItem>(`/items/${encodeURIComponent(id)}`, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function deleteCloverItem(id: string) {
  return cloverRequest<void>(`/items/${encodeURIComponent(id)}`, { method: "DELETE" });
}

export async function listCloverCategories() {
  const categories: CloverCategory[] = [];
  const limit = 100;
  for (let offset = 0; offset < 1000; offset += limit) {
    const result = await cloverRequest<CloverCollection<CloverCategory>>(
      `/categories?limit=${limit}&offset=${offset}`
    );
    const page = result.elements ?? [];
    categories.push(...page);
    if (page.length < limit) break;
  }
  return categories;
}

export function createCloverCategory(name: string) {
  return cloverRequest<CloverCategory>("/categories", {
    method: "POST",
    body: JSON.stringify({ name }),
  });
}

export async function listCloverCategoryItems(categoryId: string) {
  const items: CloverItem[] = [];
  const limit = 100;
  for (let offset = 0; offset < 1000; offset += limit) {
    const result = await cloverRequest<CloverCollection<CloverItem>>(
      `/categories/${encodeURIComponent(categoryId)}/items?limit=${limit}&offset=${offset}`
    );
    const page = result.elements ?? [];
    items.push(...page);
    if (page.length < limit) break;
  }
  return items;
}

export function associateCloverCategoryItems(categoryId: string, itemIds: string[]) {
  if (!itemIds.length) return Promise.resolve();
  return cloverRequest<void>("/category_items", {
    method: "POST",
    body: JSON.stringify({
      elements: itemIds.map((itemId) => ({
        category: { id: categoryId },
        item: { id: itemId },
      })),
    }),
  });
}

export function disassociateCloverCategoryItems(categoryId: string, itemIds: string[]) {
  if (!itemIds.length) return Promise.resolve();
  return cloverRequest<void>("/category_items?delete=true", {
    method: "POST",
    body: JSON.stringify({
      elements: itemIds.map((itemId) => ({
        category: { id: categoryId },
        item: { id: itemId },
      })),
    }),
  });
}
