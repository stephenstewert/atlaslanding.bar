import Image from "next/image";

const Arrow = () => <span aria-hidden="true">↗</span>;

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

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand-link" href="#top" aria-label="Atlas Landing home">
          <span className="brand-logo-wrap">
            <Image className="brand-logo" src="/atlas-logo.svg" alt="" width={56} height={56} priority />
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

        <div className="menu-grid">
          <article className="menu-card featured-card">
            <div className="card-top"><span>01</span><p>House Signatures</p></div>
            <div className="drink-list">
              <div><h3>Midnight 75</h3><strong>$14</strong><p>Gray Whale Gin, lemon, blackberry, bubbles</p></div>
              <div><h3>Passion Spark</h3><strong>$14</strong><p>Vodka, passion fruit, lime, agave, sparkling water</p></div>
              <div><h3>Heatwave</h3><strong>$13</strong><p>Tequila, jalapeño, agave, lime, ginger beer</p></div>
              <div><h3>Blood Orange Spritz</h3><strong>$14</strong><p>Aperol, blood orange, brut, sparkling water</p></div>
            </div>
          </article>

          <article className="menu-card">
            <div className="card-top"><span>02</span><p>Seasonal</p></div>
            <div className="drink-list">
              <div><h3>Garden Society</h3><strong>$15</strong><p>Cucumber mint vodka, raspberry, black tea, sparkling</p></div>
              <div><h3>In Bloom</h3><strong>$15</strong><p>Vodka, coffee liqueur, Bailey’s, lavender, espresso</p></div>
              <div><h3>Wildflower Sour</h3><strong>$15</strong><p>Jameson, elderflower, honey, lemon, pomegranate foam</p></div>
              <div><h3>Honeyglass</h3><strong>$14</strong><p>Tequila, Aperol, lemon, honey, orange bitters</p></div>
            </div>
          </article>

          <article className="menu-card compact-card">
            <div className="card-top"><span>03</span><p>Wine & Beer</p></div>
            <div className="simple-list">
              <div><span>Prosecco</span><strong>$13</strong></div>
              <div><span>Sauvignon Blanc</span><strong>$13</strong></div>
              <div><span>La Crema Pinot Noir</span><strong>$13</strong></div>
              <div><span>Lucien Albrecht Brut Rosé</span><strong>$14</strong></div>
              <div><span>Boneyard DTH IPA</span><strong>$8</strong></div>
              <div><span>Sierra Nevada Pilsner</span><strong>$7</strong></div>
              <div><span>Guinness</span><strong>$8</strong></div>
            </div>
          </article>

          <article className="menu-card compact-card snack-card">
            <div className="card-top"><span>04</span><p>Snacks</p></div>
            <div className="simple-list">
              <div><span>Peanuts</span><strong>Ask</strong></div>
              <div><span>Pub Mix</span><strong>Ask</strong></div>
              <div><span>Obour Hummus & Pita Chips</span><strong>$12</strong></div>
            </div>
            <p className="small-print">Full spirits selection available at the bar, including bourbon, rye, scotch, tequila, gin, rum, vodka, Irish and Japanese whisky.</p>
          </article>
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
