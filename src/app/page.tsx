import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const Arrow = () => (
  <ArrowUpRight
    className="direction-icon"
    aria-hidden="true"
    focusable="false"
    strokeWidth={1.7}
  />
);

const tickerItems = ["Beer", "Craft Cocktails", "Wine", "Snacks", "Midtown Reno"];

const TickerGroup = ({ copy }: { copy: string }) => (
  <div className="ticker-group">
    {tickerItems.map((item) => (
      <span className="ticker-item" key={`${copy}-${item}`}>
        <span>{item}</span><i>•</i>
      </span>
    ))}
  </div>
);

type MenuItem = {
  name: string;
  price?: string;
  description?: string;
};

type MenuSection = {
  number: string;
  label: string;
  title: string;
  tone?: "featured" | "accent";
  items: MenuItem[];
};

const menuSections: MenuSection[] = [
  {
    number: "01",
    label: "Cocktails",
    title: "House Signatures",
    tone: "featured",
    items: [
      { name: "Midnight 75", price: "$14", description: "Gray Whale Gin, lemon, simple, blackberry puree, bubbles" },
      { name: "Passion Spark", price: "$14", description: "Platinum Vodka, Passoa, lime, agave, sparkling water" },
      { name: "Heatwave", price: "$13", description: "Corazon Tequila, jalapeño, agave, lime, ginger beer" },
      { name: "Blood Orange Spritz", price: "$14", description: "Aperol, SP Blood Orange, Wycliff Brut, sparkling water" },
    ],
  },
  {
    number: "02",
    label: "Cocktails",
    title: "Seasonal Creations",
    items: [
      { name: "Garden Society", price: "$15", description: "Ketel Cucumber Mint, lemon, raspberry, black tea, sparkling" },
      { name: "In Bloom", price: "$15", description: "Fris Vodka, Grind Coffee Liquor, Bailey’s, lavender, espresso" },
      { name: "Wildflower Sour", price: "$15", description: "Jameson, elderflower, honey, lemon, pomegranate foam" },
      { name: "Honeyglass", price: "$14", description: "Corazon Tequila, Aperol, lemon, honey, orange bitters" },
    ],
  },
  {
    number: "03",
    label: "By the Glass",
    title: "Wine",
    items: [
      { name: "Benvolio Prosecco", price: "$13" },
      { name: "La Marca Prosecco", price: "$13" },
      { name: "Los Morros Sauv Blanc", price: "$13" },
      { name: "Los Morros Cabernet", price: "$13" },
      { name: "Valderba Garnacha", price: "$13" },
      { name: "Kransno Merlot", price: "$13" },
      { name: "Conundrum Red Blend", price: "$13" },
      { name: "Avaline Cabernet", price: "$14" },
      { name: "La Crema Pinot Noir", price: "$13" },
      { name: "Lucien Albrecht Brut Rose", price: "$14" },
    ],
  },
  {
    number: "04",
    label: "On Draft",
    title: "Beer",
    items: [
      { name: "Boneyard IPA", price: "$8" },
      { name: "Voodoo Ranger IPA", price: "$8" },
      { name: "Sierra Nevada Pilsner", price: "$7" },
      { name: "Sierra Nevada Hazy IPA", price: "$8" },
      { name: "Modelo", price: "$7" },
      { name: "Sapporo", price: "$8" },
      { name: "805 Blonde", price: "$8" },
      { name: "805 Cerveza", price: "$8" },
      { name: "Cali Squeeze Blood Orange", price: "$8" },
      { name: "Deschutes Porter", price: "$8" },
      { name: "Boneyard Red Ale", price: "$8" },
      { name: "Guinness", price: "$8" },
    ],
  },
  {
    number: "05",
    label: "At the Bar",
    title: "Snacks",
    tone: "accent",
    items: [
      { name: "Peanuts" },
      { name: "Pub Mix" },
      { name: "Obour Hummus & Pita Chips", price: "$12" },
    ],
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand-link" href="#top" aria-label="Atlas Landing home">
          <span className="brand-logo-wrap">
            <Image className="brand-logo" src="/atlas-arrow.svg" alt="" width={20} height={24} priority />
          </span>
          <span className="wordmark">Atlas Landing</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#menu">Menu</a>
          <a href="#story">About</a>
          <a href="#events">Private Events</a>
        </nav>
        <a
          className="address-link"
          href="https://maps.apple.com/?address=772%20S%20Virginia%20St,%20Reno,%20NV%2089501"
          target="_blank"
          rel="noreferrer"
        >
          772 S Virginia St <Arrow />
        </a>
        <a className="mobile-menu" href="#menu">Menu</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Midtown Reno <span>•</span> Cocktail Bar</p>
          <h1>Where late nights<br />pour better.</h1>
          <p className="hero-intro">
            A cocktail bar for long conversations, deep playlists, wine and
            late-night snacks.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#menu">View Menu</a>
            <a className="text-link" href="https://maps.apple.com/?address=772%20S%20Virginia%20St,%20Reno,%20NV%2089501" target="_blank" rel="noreferrer">
              Get Directions <Arrow />
            </a>
          </div>
          <div className="hero-meta">
            <div>
              <span>Weeknights</span>
              <p>3 PM–10 PM</p>
            </div>
            <div>
              <span>Find us</span>
              <p>772 S Virginia St</p>
            </div>
          </div>
        </div>
        <div className="hero-image" role="img" aria-label="Green lounge seating inside Atlas Landing">
          <div className="location-tab">Midtown, Reno</div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          <TickerGroup copy="a" />
          <TickerGroup copy="b" />
        </div>
      </div>

      <section className="story section" id="story">
        <div className="section-label">01 / The room</div>
        <div className="story-heading">
          <p className="eyebrow">Atlas Landing</p>
          <h2>A Midtown bar with<br /><em>real personality.</em></h2>
        </div>
        <div className="story-copy">
          <p>
            We focus on cocktails, beer, wine, and easy late-night snacks
            without making the room feel formal.
          </p>
          <p>
            The soundtrack stays on point and the menu keeps things bright,
            crisp, and social. From opening pours to last call, Atlas is built
            for a better neighborhood bar experience.
          </p>
        </div>
      </section>

      <section className="photo-story" id="photos" aria-labelledby="photo-story-title">
        <div className="photo-story-intro">
          <div className="section-label">Inside Atlas</div>
          <div>
            <p className="eyebrow">From the bar</p>
            <h2 id="photo-story-title">Poured, stocked,<br /><em>and ready.</em></h2>
          </div>
          <p className="photo-story-note">
            A closer look at the bottles, pours, and late-night glow behind the bar.
          </p>
        </div>
        <div className="photo-grid">
          <figure className="photo-frame photo-backbar">
            <Image
              src="/atlas-backbar.jpg"
              alt="Atlas Landing back bar with whiskey bottles and draft handles"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <figcaption><span>01</span> The back bar</figcaption>
          </figure>
          <figure className="photo-frame photo-pour">
            <Image
              src="/atlas-cocktail-pour.jpg"
              alt="Bartender straining a cocktail at Atlas Landing"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <figcaption><span>02</span> Made to order</figcaption>
          </figure>
          <figure className="photo-frame photo-whiskey">
            <Image
              src="/atlas-whiskey-wall.jpg"
              alt="Illuminated whiskey selection inside Atlas Landing"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <figcaption><span>03</span> Bottles worth asking about</figcaption>
          </figure>
        </div>
      </section>

      <section className="menu section" id="menu">
        <div className="menu-intro">
          <div className="section-label">02 / Now pouring</div>
          <div>
            <p className="eyebrow">Current Menu</p>
            <h2>Drinks worth<br /><em>staying for.</em></h2>
          </div>
          <p className="menu-note">Seasonal ingredients, straightforward pours, and a back bar that rewards curiosity.</p>
        </div>

        <div className="menu-catalog">
          {menuSections.map((section) => (
            <article
              className={`menu-chapter${section.tone ? ` menu-chapter--${section.tone}` : ""}`}
              key={section.title}
            >
              <header className="menu-chapter-head">
                <p className="menu-chapter-label">{section.number} / {section.label}</p>
                <h3>{section.title}</h3>
              </header>
              <div className="menu-items">
                {section.items.map((item) => (
                  <div className="menu-entry" key={item.name}>
                    <h4>{item.name}</h4>
                    {item.price ? <strong>{item.price}</strong> : null}
                    {item.description ? <p>{item.description}</p> : null}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="events" id="events">
        <div className="events-copy">
          <div className="section-label">03 / Gather here</div>
          <p className="eyebrow">Private Events</p>
          <h2>Tell us your<br /><em>night plan.</em></h2>
          <p>Private events, birthdays, large groups, and collaborations. Send the basics and we’ll reply with options and timing.</p>
          <a className="button button-light" href="mailto:info@atlaslanding.bar?subject=Private%20Event%20Inquiry">Start an Inquiry <Arrow /></a>
        </div>
        <div className="events-quote">
          <span>Good drinks.</span>
          <span>Deep playlists.</span>
          <span>Better company.</span>
        </div>
      </section>

      <section className="visit section" id="visit">
        <div className="section-label">04 / Visit</div>
        <div className="visit-title">
          <p className="eyebrow">Midtown Reno</p>
          <h2>Meet us<br /><em>at Atlas.</em></h2>
          <a className="text-link" href="https://maps.apple.com/?address=772%20S%20Virginia%20St,%20Reno,%20NV%2089501" target="_blank" rel="noreferrer">Open in Maps <Arrow /></a>
        </div>
        <div className="visit-details">
          <div><span>Address</span><p>772 S Virginia St<br />Reno, NV 89509</p></div>
          <div><span>Hours</span><p>Mon–Thu / 3–10 PM<br />Fri–Sat / 4 PM–12 AM<br />Sunday / Closed</p></div>
          <div><span>Contact</span><p><a href="tel:+17752738146">(775) 273-8146</a><br /><a href="mailto:info@atlaslanding.bar">info@atlaslanding.bar</a></p></div>
        </div>
      </section>

      <footer>
        <a className="footer-mark" href="#top">Atlas Landing</a>
        <div className="footer-links">
          <a href="https://www.instagram.com/atlaslanding/" target="_blank" rel="noreferrer">Instagram <Arrow /></a>
          <a href="https://www.facebook.com/atlaslandingbar/" target="_blank" rel="noreferrer">Facebook <Arrow /></a>
        </div>
        <p>Midtown Reno, Nevada</p>
      </footer>
    </main>
  );
}
