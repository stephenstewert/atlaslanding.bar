export type MenuSectionId = "signatures" | "seasonal" | "wines" | "beer" | "snacks";

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  description: string;
  section: MenuSectionId;
};

export type MenuSection = {
  id: MenuSectionId;
  number: string;
  title: string;
  page: 1 | 2;
  items: MenuItem[];
};

export const MENU_SECTION_DEFINITIONS: Array<Omit<MenuSection, "items"> & { categoryName: string }> = [
  { id: "signatures", number: "01", title: "House Signatures", page: 1, categoryName: "Atlas Menu - House Signatures" },
  { id: "seasonal", number: "02", title: "Seasonal Creations", page: 1, categoryName: "Atlas Menu - Seasonal Creations" },
  { id: "wines", number: "03", title: "Wines by the Glass", page: 2, categoryName: "Atlas Menu - Wines by the Glass" },
  { id: "beer", number: "04", title: "Draft Beer", page: 2, categoryName: "Atlas Menu - Draft Beer" },
  { id: "snacks", number: "05", title: "Snacks", page: 2, categoryName: "Atlas Menu - Snacks" },
];

type SeedItem = Omit<MenuItem, "id">;

const seedItems: SeedItem[] = [
  { section: "signatures", name: "Midnight 75", price: 1400, description: "Gray Whale Gin, lemon, simple, blackberry puree, bubbles" },
  { section: "signatures", name: "Passion Spark", price: 1400, description: "Platinum Vodka, Passoa, lime, agave, sparkling water" },
  { section: "signatures", name: "Heatwave", price: 1300, description: "Corazon Tequila, jalapeno, agave, lime, ginger beer" },
  { section: "signatures", name: "Blood Orange Spritz", price: 1400, description: "Aperol, SP Blood Orange, Wycliff Brut, sparkling water" },
  { section: "seasonal", name: "Garden Society", price: 1500, description: "Ketel Cucumber Mint, lemon, raspberry, black tea, sparkling" },
  { section: "seasonal", name: "In Bloom", price: 1500, description: "Fris Vodka, Grind Coffee Liquor, Bailey's, lavender, espresso" },
  { section: "seasonal", name: "Wildflower Sour", price: 1500, description: "Jameson, elderflower, honey, lemon, pomegranate foam" },
  { section: "seasonal", name: "Honeyglass", price: 1400, description: "Corazon Tequila, Aperol, lemon, honey, orange bitters" },
  { section: "wines", name: "Benvolio Prosecco", price: 1300, description: "" },
  { section: "wines", name: "La Marca Prosecco", price: 1300, description: "" },
  { section: "wines", name: "Los Morros Sauv Blanc", price: 1300, description: "" },
  { section: "wines", name: "Los Morros Cabernet", price: 1300, description: "" },
  { section: "wines", name: "Valderba Garnacha", price: 1300, description: "" },
  { section: "wines", name: "Krasnso Merlot", price: 1300, description: "" },
  { section: "wines", name: "Conundrum Red Blend", price: 1300, description: "" },
  { section: "wines", name: "Avaline Cabernet", price: 1400, description: "" },
  { section: "wines", name: "La Crema Pinot Noir", price: 1300, description: "" },
  { section: "wines", name: "Lucien Albrecht Brut Rose", price: 1400, description: "" },
  { section: "beer", name: "Boneyard IPA", price: 800, description: "" },
  { section: "beer", name: "Voodoo Ranger IPA", price: 800, description: "" },
  { section: "beer", name: "Sierra Nevada Pilsner", price: 700, description: "" },
  { section: "beer", name: "Sierra Nevada Hazy IPA", price: 800, description: "" },
  { section: "beer", name: "Modelo", price: 700, description: "" },
  { section: "beer", name: "Sapporo", price: 800, description: "" },
  { section: "beer", name: "805 Blonde", price: 800, description: "" },
  { section: "beer", name: "805 Cerveza", price: 800, description: "" },
  { section: "beer", name: "Cali Squeeze Blood Orange", price: 800, description: "" },
  { section: "beer", name: "Deschutes Porter", price: 800, description: "" },
  { section: "beer", name: "Boneyard Red Ale", price: 800, description: "" },
  { section: "beer", name: "Guinness", price: 800, description: "" },
  { section: "snacks", name: "Peanuts", price: 0, description: "" },
  { section: "snacks", name: "Pub Mix", price: 0, description: "" },
];

export function defaultMenuSections(): MenuSection[] {
  return MENU_SECTION_DEFINITIONS.map((section) => ({
    id: section.id,
    number: section.number,
    title: section.title,
    page: section.page,
    items: seedItems
      .filter((item) => item.section === section.id)
      .map((item, index) => ({ ...item, id: `seed-${section.id}-${index}` })),
  }));
}

export function isMenuSectionId(value: unknown): value is MenuSectionId {
  return MENU_SECTION_DEFINITIONS.some((section) => section.id === value);
}
