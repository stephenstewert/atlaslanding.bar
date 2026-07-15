import "server-only";

export type CloverItem = {
  id: string;
  name: string;
  price: number;
  priceType?: "FIXED" | "VARIABLE" | "PER_UNIT";
  sku?: string;
  available?: boolean;
  hidden?: boolean;
  modifiedTime?: number;
};

export type CloverItemInput = {
  name: string;
  price: number;
  sku?: string;
  available: boolean;
  hidden: boolean;
  priceType: "FIXED";
};

type CloverCollection<T> = { elements?: T[] };

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

  return (await response.json()) as T;
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
