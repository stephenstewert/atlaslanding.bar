"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Edit3, Plus, Search, X } from "lucide-react";
import type { CloverItem } from "@/lib/clover";

type ItemDraft = {
  id?: string;
  name: string;
  price: string;
  sku: string;
  available: boolean;
  hidden: boolean;
};

const emptyDraft: ItemDraft = { name: "", price: "", sku: "", available: true, hidden: false };

function dollars(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

export function MenuManager() {
  const [items, setItems] = useState<CloverItem[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [draft, setDraft] = useState<ItemDraft | null>(null);

  async function loadItems() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/items", { cache: "no-store" });
      const result = (await response.json()) as { items?: CloverItem[]; error?: string };
      if (response.status === 401) return window.location.assign("/admin/login");
      if (!response.ok) throw new Error(result.error ?? "Unable to load Clover items.");
      setItems(result.items ?? []);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to load Clover items.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void loadItems(); }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return items;
    return items.filter((item) => `${item.name} ${item.sku ?? ""}`.toLowerCase().includes(needle));
  }, [items, query]);

  function edit(item: CloverItem) {
    setError("");
    setSuccess("");
    setDraft({
      id: item.id,
      name: item.name,
      price: (item.price / 100).toFixed(2),
      sku: item.sku ?? "",
      available: item.available !== false,
      hidden: item.hidden === true,
    });
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft) return;
    const price = Math.round(Number(draft.price) * 100);
    if (!draft.name.trim() || !Number.isFinite(price) || price < 0) {
      setError("Enter an item name and a valid price.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const response = await fetch(draft.id ? `/api/admin/items/${draft.id}` : "/api/admin/items", {
        method: draft.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...draft, price }),
      });
      const result = (await response.json()) as { item?: CloverItem; error?: string };
      if (response.status === 401) return window.location.assign("/admin/login");
      if (!response.ok) throw new Error(result.error ?? "Clover could not save this item.");
      setDraft(null);
      setSuccess(draft.id ? "Item updated in Clover." : "Item created in Clover.");
      await loadItems();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Clover could not save this item.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="admin-main">
      <div className="admin-heading">
        <div><p className="admin-kicker">Clover inventory</p><h1>Menu items</h1></div>
        <p className="admin-heading-copy">Create and edit items here. Every saved change is written directly to Clover.</p>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search-wrap"><Search aria-hidden="true" /><input className="admin-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name or SKU" aria-label="Search menu items" /></div>
        <span className="admin-count">{filtered.length} {filtered.length === 1 ? "item" : "items"}</span>
        <button className="admin-primary" type="button" onClick={() => { setDraft(emptyDraft); setError(""); setSuccess(""); }}><Plus size={16} /> New item</button>
      </div>

      {error && !draft ? <p className="admin-error" role="alert">{error}</p> : null}
      {success ? <p className="admin-success" role="status">{success}</p> : null}

      <div className="admin-list">
        <div className="admin-list-head"><span>Item</span><span>Price</span><span>Status</span><span>Action</span></div>
        {loading ? <div className="admin-empty">Loading your Clover inventory…</div> : null}
        {!loading && !filtered.length ? <div className="admin-empty">{query ? "No items match your search." : "No Clover items found. Create the first one."}</div> : null}
        {!loading && filtered.map((item) => (
          <div className="admin-row" key={item.id}>
            <div><h2 className="admin-item-name">{item.name}</h2><span className="admin-item-sku">{item.sku ? `SKU ${item.sku}` : "No SKU"}</span></div>
            <span className="admin-price">{dollars(item.price)}</span>
            <span className={`admin-status${item.available === false || item.hidden ? " admin-status--off" : ""}`}>{item.hidden ? "Hidden" : item.available === false ? "Unavailable" : "Available"}</span>
            <button className="admin-icon-button" type="button" onClick={() => edit(item)} aria-label={`Edit ${item.name}`}><Edit3 /></button>
          </div>
        ))}
      </div>

      {draft ? (
        <div className="admin-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !saving) setDraft(null); }}>
          <aside className="admin-drawer" role="dialog" aria-modal="true" aria-labelledby="item-form-title">
            <div className="admin-drawer-head"><div><p className="admin-kicker">{draft.id ? "Edit inventory" : "Add to inventory"}</p><h2 id="item-form-title">{draft.id ? "Edit item" : "New item"}</h2></div><button className="admin-close" type="button" onClick={() => setDraft(null)} aria-label="Close"><X /></button></div>
            <form onSubmit={save}>
              <div className="admin-form-grid">
                <div className="admin-field"><label htmlFor="item-name">Item name</label><input id="item-name" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} autoFocus required /></div>
                <div className="admin-field"><label htmlFor="item-price">Price (USD)</label><input id="item-price" type="number" min="0" step="0.01" inputMode="decimal" value={draft.price} onChange={(event) => setDraft({ ...draft, price: event.target.value })} placeholder="14.00" required /></div>
                <div className="admin-field"><label htmlFor="item-sku">SKU (optional)</label><input id="item-sku" value={draft.sku} onChange={(event) => setDraft({ ...draft, sku: event.target.value })} /></div>
              </div>
              <div className="admin-toggle-group">
                <label className="admin-toggle"><span>Available for sale<small>Controls availability across Clover sales channels.</small></span><input type="checkbox" checked={draft.available} onChange={(event) => setDraft({ ...draft, available: event.target.checked })} /></label>
                <label className="admin-toggle"><span>Hidden on Register<small>Keeps the item out of the Clover Register app.</small></span><input type="checkbox" checked={draft.hidden} onChange={(event) => setDraft({ ...draft, hidden: event.target.checked })} /></label>
              </div>
              {error ? <p className="admin-error" role="alert">{error}</p> : null}
              <div className="admin-drawer-actions"><button className="admin-primary" type="submit" disabled={saving}>{saving ? "Saving…" : draft.id ? "Save changes" : "Create item"}</button><button className="admin-secondary" type="button" onClick={() => setDraft(null)} disabled={saving}>Cancel</button></div>
            </form>
          </aside>
        </div>
      ) : null}
    </div>
  );
}
