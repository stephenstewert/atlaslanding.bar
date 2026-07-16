import "server-only";

import {
  associateCloverCategoryItems,
  CloverCategory,
  CloverItemInput,
  createCloverCategory,
  createCloverItem,
  disassociateCloverCategoryItems,
  listCloverCategories,
  listCloverCategoryItems,
  listCloverItems,
  updateCloverItem,
} from "@/lib/clover";
import {
  defaultMenuSections,
  MENU_SECTION_DEFINITIONS,
  MenuItem,
  MenuSection,
  MenuSectionId,
} from "@/lib/menu";

export type MenuItemInput = {
  name: string;
  price: number;
  description?: string;
};

function cloverInput(input: MenuItemInput): CloverItemInput {
  return {
    name: input.name.trim(),
    price: input.price,
    alternateName: input.description?.trim() || "",
    available: true,
    hidden: false,
    priceType: "FIXED",
  };
}

function toMenuItem(
  item: { id: string; name: string; price: number; alternateName?: string },
  section: MenuSectionId
): MenuItem {
  return {
    id: item.id,
    name: item.name,
    price: item.price,
    description: item.alternateName ?? "",
    section,
  };
}

async function ensureCategory(
  definition: (typeof MENU_SECTION_DEFINITIONS)[number],
  categories: CloverCategory[]
) {
  const existing = categories.find((category) => category.name === definition.categoryName);
  if (existing) return { category: existing, created: false };
  const category = await createCloverCategory(definition.categoryName);
  categories.push(category);
  return { category, created: true };
}

async function seedCategory(category: CloverCategory, sectionId: MenuSectionId) {
  const seed = defaultMenuSections().find((section) => section.id === sectionId);
  if (!seed) return;

  const inventory = await listCloverItems();
  const ids: string[] = [];
  for (const seedItem of seed.items) {
    let item = inventory.find(
      (candidate) => candidate.name.trim().toLowerCase() === seedItem.name.trim().toLowerCase()
    );
    if (!item) {
      item = await createCloverItem(cloverInput(seedItem));
      inventory.push(item);
    } else if (!item.alternateName && seedItem.description) {
      item = await updateCloverItem(item.id, cloverInput(seedItem));
    }
    ids.push(item.id);
  }
  await associateCloverCategoryItems(category.id, ids);
}

export async function loadCloverMenu(options: { bootstrap?: boolean } = {}): Promise<MenuSection[]> {
  const bootstrap = options.bootstrap === true;
  const categories = await listCloverCategories();
  const sections: MenuSection[] = [];

  for (const definition of MENU_SECTION_DEFINITIONS) {
    let category = categories.find((candidate) => candidate.name === definition.categoryName);
    let created = false;
    if (!category && bootstrap) {
      const result = await ensureCategory(definition, categories);
      category = result.category;
      created = result.created;
    }

    if (!category) {
      const fallback = defaultMenuSections().find((section) => section.id === definition.id);
      sections.push(fallback ?? { ...definition, items: [] });
      continue;
    }

    if (created) await seedCategory(category, definition.id);
    const items = await listCloverCategoryItems(category.id);
    sections.push({
      id: definition.id,
      number: definition.number,
      title: definition.title,
      page: definition.page,
      items: items
        .filter((item) => item.available !== false && item.hidden !== true)
        .map((item) => toMenuItem(item, definition.id)),
    });
  }

  return sections;
}

export async function createCloverMenuItem(sectionId: MenuSectionId, input: MenuItemInput) {
  const categories = await listCloverCategories();
  const definition = MENU_SECTION_DEFINITIONS.find((section) => section.id === sectionId);
  if (!definition) throw new Error("Unknown menu section.");
  const { category } = await ensureCategory(definition, categories);
  const item = await createCloverItem(cloverInput(input));
  await associateCloverCategoryItems(category.id, [item.id]);
  return toMenuItem(item, sectionId);
}

export async function updateCloverMenuItem(
  id: string,
  sectionId: MenuSectionId,
  input: MenuItemInput
) {
  const item = await updateCloverItem(id, cloverInput(input));
  return toMenuItem(item, sectionId);
}

export async function deleteCloverMenuItem(id: string, sectionId: MenuSectionId) {
  const definition = MENU_SECTION_DEFINITIONS.find((section) => section.id === sectionId);
  if (!definition) throw new Error("Unknown menu section.");
  const category = (await listCloverCategories()).find(
    (candidate) => candidate.name === definition.categoryName
  );
  if (!category) throw new Error("The menu section could not be found in Clover.");
  await disassociateCloverCategoryItems(category.id, [id]);
}
