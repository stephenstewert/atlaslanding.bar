"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { Check, Download, LoaderCircle, Pencil, Plus, Trash2, X } from "lucide-react";
import type { MenuItem, MenuSection, MenuSectionId } from "@/lib/menu";

type Draft = {
  id?: string;
  section: MenuSectionId;
  name: string;
  price: string;
  description: string;
};

function displayPrice(cents: number) {
  if (!cents) return "";
  return `$${Number.isInteger(cents / 100) ? cents / 100 : (cents / 100).toFixed(2)}`;
}

function sectionClass(id: MenuSectionId) {
  if (id === "signatures" || id === "seasonal") return "visual-section--cocktails";
  if (id === "snacks") return "visual-section--snacks";
  return "visual-section--list";
}

export function MenuManager() {
  const [sections, setSections] = useState<MenuSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadMenu() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/menu", { cache: "no-store" });
      const result = (await response.json()) as { sections?: MenuSection[]; error?: string };
      if (response.status === 401) return window.location.assign("/admin/login");
      if (!response.ok) throw new Error(result.error ?? "Unable to load the menu.");
      setSections(result.sections ?? []);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to load the menu.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadMenu();
  }, []);

  function startEdit(item: MenuItem) {
    setDraft({
      id: item.id,
      section: item.section,
      name: item.name,
      price: item.price ? (item.price / 100).toFixed(2) : "",
      description: item.description,
    });
    setError("");
    setSuccess("");
  }

  function startAdd(section: MenuSectionId) {
    setDraft({ section, name: "", price: "", description: "" });
    setError("");
    setSuccess("");
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft) return;
    const price = draft.price.trim() ? Math.round(Number(draft.price) * 100) : 0;
    if (!draft.name.trim() || !Number.isInteger(price) || price < 0) {
      setError("Enter an item name and a valid price.");
      return;
    }

    setSaving(true);
    setError("");
    try {
      const response = await fetch(draft.id ? `/api/admin/menu/${draft.id}` : "/api/admin/menu", {
        method: draft.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...draft, price }),
      });
      const result = (await response.json()) as { item?: MenuItem; error?: string };
      if (response.status === 401) return window.location.assign("/admin/login");
      if (!response.ok || !result.item) throw new Error(result.error ?? "Unable to save the item.");

      const savedItem = result.item;
      setSections((current) =>
        current.map((section) =>
          section.id !== savedItem.section
            ? section
            : {
                ...section,
                items: draft.id
                  ? section.items.map((item) => (item.id === savedItem.id ? savedItem : item))
                  : [...section.items, savedItem],
              }
        )
      );
      setDraft(null);
      setSuccess(draft.id ? "Item updated." : "Item added.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to save the item.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(item: MenuItem) {
    if (!window.confirm(`Remove ${item.name} from the website and printed menu?`)) return;
    setDeleting(item.id);
    setError("");
    setSuccess("");
    try {
      const response = await fetch(`/api/admin/menu/${item.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: item.section }),
      });
      const result = (await response.json()) as { error?: string };
      if (response.status === 401) return window.location.assign("/admin/login");
      if (!response.ok) throw new Error(result.error ?? "Unable to remove the item.");
      setSections((current) =>
        current.map((section) => ({
          ...section,
          items: section.items.filter((candidate) => candidate.id !== item.id),
        }))
      );
      if (draft?.id === item.id) setDraft(null);
      setSuccess("Item removed.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to remove the item.");
    } finally {
      setDeleting(null);
    }
  }

  function renderItem(item: MenuItem) {
    const editing = draft?.id === item.id;
    if (editing) return renderEditor(draft);
    return (
      <div className="visual-item" key={item.id} onClick={() => startEdit(item)}>
        <div className="visual-item-copy">
          <h3>{item.name}</h3>
          {item.description ? <p>{item.description}</p> : null}
        </div>
        {item.price ? <strong>{displayPrice(item.price)}</strong> : null}
        <div className="visual-item-actions">
          <button type="button" onClick={(event) => { event.stopPropagation(); startEdit(item); }} aria-label={`Edit ${item.name}`}><Pencil /></button>
          <button className="visual-delete" type="button" disabled={deleting === item.id} onClick={(event) => { event.stopPropagation(); void remove(item); }} aria-label={`Delete ${item.name}`}>
            {deleting === item.id ? <LoaderCircle className="admin-spin" /> : <Trash2 />}
          </button>
        </div>
      </div>
    );
  }

  function renderEditor(value: Draft) {
    return (
      <form className="visual-item visual-item--editing" onSubmit={save} key={value.id ?? `new-${value.section}`}>
        <div className="visual-edit-main">
          <label>
            <span>Item name</span>
            <input value={value.name} onChange={(event) => setDraft({ ...value, name: event.target.value })} autoFocus required />
          </label>
          {(value.section === "signatures" || value.section === "seasonal") ? (
            <label>
              <span>Description</span>
              <textarea value={value.description} onChange={(event) => setDraft({ ...value, description: event.target.value })} rows={2} />
            </label>
          ) : null}
        </div>
        <label className="visual-price-field">
          <span>Price</span>
          <span className="visual-price-input"><i>$</i><input type="number" min="0" step="0.01" inputMode="decimal" value={value.price} onChange={(event) => setDraft({ ...value, price: event.target.value })} placeholder="0" /></span>
        </label>
        <div className="visual-edit-actions">
          <button type="submit" disabled={saving} aria-label="Save item">{saving ? <LoaderCircle className="admin-spin" /> : <Check />}</button>
          <button type="button" disabled={saving} onClick={() => setDraft(null)} aria-label="Cancel editing"><X /></button>
        </div>
      </form>
    );
  }

  function renderSection(value: MenuSection) {
    const addingHere = draft && !draft.id && draft.section === value.id;
    return (
      <section className={`visual-section ${sectionClass(value.id)}${value.id === "signatures" ? " visual-section--featured" : ""}`} key={value.id}>
        <div className="visual-section-head">
          <span>{value.number}</span>
          <h2>{value.title}</h2>
          <button className="visual-add" type="button" onClick={() => startAdd(value.id)} aria-label={`Add item to ${value.title}`}><Plus /></button>
        </div>
        <div className="visual-items">
          {value.items.map(renderItem)}
          {addingHere ? renderEditor(draft) : null}
          {!value.items.length && !addingHere ? <button className="visual-empty" type="button" onClick={() => startAdd(value.id)}>Add the first item</button> : null}
        </div>
      </section>
    );
  }

  const pageOne = sections.filter((section) => section.page === 1);
  const pageTwo = sections.filter((section) => section.page === 2);

  return (
    <div className="admin-main admin-main--visual">
      <div className="admin-heading admin-heading--visual">
        <div><p className="admin-kicker">Physical menu</p><h1>Menu editor</h1></div>
        <p className="admin-heading-copy">Click any item to edit it. The print layout handles sizing and spacing automatically.</p>
      </div>

      <div className="visual-toolbar">
        <div><i className="visual-live-dot" /> Changes are saved to Clover</div>
        <button className="admin-primary" type="button" onClick={() => window.location.assign("/api/admin/menu/pdf")}><Download size={16} /> Download PDF</button>
      </div>
      {error ? <p className="admin-error" role="alert">{error}</p> : null}
      {success ? <p className="admin-success" role="status">{success}</p> : null}

      {loading ? (
        <div className="visual-loading"><LoaderCircle className="admin-spin" /><span>Preparing the visual menu…</span></div>
      ) : (
        <div className="visual-pages">
          <article className="visual-page">
            <div className="visual-page-top"><span><Image src="/atlas-arrow.svg" alt="" width={14} height={18} />Atlas Landing</span><i>01 / Cocktails</i></div>
            <h2 className="visual-page-title">Specialty <em>Cocktails</em></h2>
            <div className="visual-page-sections">{pageOne.map(renderSection)}</div>
            <p className="visual-page-address">772 S Virginia St - Midtown Reno</p>
          </article>
          <article className="visual-page">
            <div className="visual-page-top"><span><Image src="/atlas-arrow.svg" alt="" width={14} height={18} />Atlas Landing</span><i>02 / Wine + Beer</i></div>
            <h2 className="visual-page-title">Wine &amp; Beer</h2>
            <div className="visual-page-two-columns">{pageTwo.filter((section) => section.id !== "snacks").map(renderSection)}</div>
            {pageTwo.filter((section) => section.id === "snacks").map(renderSection)}
          </article>
        </div>
      )}
    </div>
  );
}
