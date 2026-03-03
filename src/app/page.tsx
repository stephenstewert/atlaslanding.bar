import Image from "next/image";
import Link from "next/link";
import {
  Clock3,
  Compass,
  GlassWater,
  Instagram,
  Mail,
  MapPin,
  Martini,
  Phone,
  Wine
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const heroImage =
  "https://static.wixstatic.com/media/4934df_cf5f3de62f1d4645a0b5f6136f64d9f7~mv2.jpg";

const logoImage =
  "https://static.wixstatic.com/media/4934df_9cbf87147ce945bfbf4f005d2f5cbcbf~mv2.png";

const cocktails = [
  {
    name: "Orange Blossom",
    description: "Gin, orange blossom honey, lemon, and sparkling wine.",
    price: "$14"
  },
  {
    name: "Espresso Martini",
    description: "Vodka, house cold brew concentrate, and coffee liqueur.",
    price: "$15"
  },
  {
    name: "Gold Rush",
    description: "Bourbon, charred lemon, and wildflower syrup.",
    price: "$14"
  },
  {
    name: "Black Manhattan",
    description: "Rye, amaro blend, bitters, and brandied cherry.",
    price: "$16"
  },
  {
    name: "Cucumber Gimlet",
    description: "London dry gin, cucumber cordial, lime, and mint.",
    price: "$14"
  },
  {
    name: "Zero Proof Ritual",
    description: "Seedlip, grapefruit, basil, and tonic.",
    price: "$11"
  }
];

const spirits = [
  "Highland & Islay scotch flights",
  "Small-batch Kentucky bourbon",
  "Japanese whisky selections",
  "Agave-focused mezcal & tequila",
  "Botanical and navy-strength gin",
  "Amaro and aperitivo back bar"
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_20%,rgba(255,196,118,0.12),transparent_45%)]" />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#10141f]/85 backdrop-blur-lg">
        <nav className="container flex h-16 items-center justify-between">
          <Link href="#home" className="flex items-center gap-3">
            <Image
              src={logoImage}
              alt="Atlas Bar"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>

          <div className="hidden items-center gap-7 text-sm md:flex">
            <Link href="#menu" className="hover:text-primary transition-colors">
              Cocktails
            </Link>
            <Link href="#spirits" className="hover:text-primary transition-colors">
              Spirits
            </Link>
            <Link href="#visit" className="hover:text-primary transition-colors">
              Visit
            </Link>
            <Link href="#contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="#contact">Reserve / Inquire</Link>
          </Button>
        </nav>
      </header>

      <section id="home" className="container py-8 md:py-12">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#111723]">
          <Image
            src={heroImage}
            alt="Guests enjoying cocktails at Atlas"
            width={1800}
            height={1100}
            priority
            className="h-[72vh] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111723] via-transparent to-transparent" />

          <div className="absolute bottom-0 left-0 p-6 md:max-w-2xl md:p-12">
            <Badge variant="secondary" className="mb-4 glass border-white/20 uppercase tracking-[0.2em]">
              Portland Cocktail Bar
            </Badge>
            <h1 className="font-display text-5xl leading-[0.96] text-white md:text-7xl">
              Atlas pours bold classics and new rituals.
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/80 md:text-lg">
              A dimly lit room for nights that linger: focused cocktails, deep spirits,
              and a soundtrack that keeps the energy moving.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="#menu">Explore The Menu</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white/10 text-white hover:bg-white/20">
                <Link href="#visit">Find Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="container py-16">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-primary">Cocktail Program</p>
            <h2 className="font-display text-4xl md:text-5xl">House Favorites</h2>
          </div>
          <Button asChild variant="ghost" className="text-primary">
            <Link href="#contact">Request Full Menu</Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cocktails.map((cocktail, index) => (
            <Card
              key={cocktail.name}
              className="glass reveal border-white/15"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <CardHeader className="pb-4">
                <div className="mb-3 flex items-center justify-between">
                  <Badge variant="outline" className="border-primary/40 text-primary">
                    Signature
                  </Badge>
                  <span className="font-display text-xl">{cocktail.price}</span>
                </div>
                <CardTitle>{cocktail.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{cocktail.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="spirits" className="container py-8">
        <Card className="overflow-hidden border-white/20 bg-charcoal/60">
          <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
            <CardHeader className="border-b border-white/10 bg-gradient-to-br from-white/5 to-transparent md:border-b-0 md:border-r">
              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-primary">Back Bar</p>
              <CardTitle className="text-4xl">Rare, classic, and hard to put down.</CardTitle>
              <p className="mt-4 max-w-lg text-muted-foreground">
                We carry a rotating list of bottles selected for depth and character.
                Ask your bartender for pairing suggestions with our seasonal cocktails.
              </p>
            </CardHeader>
            <CardContent className="grid content-center gap-4 py-8">
              {spirits.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-white/15 bg-black/20 p-3">
                  <Wine className="h-4 w-4 text-primary" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </CardContent>
          </div>
        </Card>
      </section>

      <section id="visit" className="container py-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <Card className="glass border-white/15">
            <CardHeader>
              <p className="text-xs uppercase tracking-[0.3em] text-primary">Visit Atlas</p>
              <CardTitle className="text-4xl">3801 N Williams Ave, Portland</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 text-sm text-muted-foreground">
                <p className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-primary" />97227, Oregon</p>
                <p className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 text-primary" />(503) 206-4328</p>
                <p className="flex items-start gap-3"><Clock3 className="mt-0.5 h-4 w-4 text-primary" />Mon-Thu 4pm-11pm | Fri-Sat 4pm-12am | Sun 4pm-10pm</p>
              </div>

              <Separator className="bg-white/10" />

              <div className="grid gap-3 text-sm">
                <Link href="https://maps.google.com/?q=3801+N+Williams+Ave+Portland+OR+97227" target="_blank" className="inline-flex items-center gap-2 text-primary hover:text-primary/80">
                  <Compass className="h-4 w-4" />
                  Open in Google Maps
                </Link>
                <Link href="mailto:hello@atlaslanding.bar" className="inline-flex items-center gap-2 text-primary hover:text-primary/80">
                  <Mail className="h-4 w-4" />
                  hello@atlaslanding.bar
                </Link>
                <Link href="https://www.instagram.com" target="_blank" className="inline-flex items-center gap-2 text-primary hover:text-primary/80">
                  <Instagram className="h-4 w-4" />
                  Follow on Instagram
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="overflow-hidden rounded-3xl border border-white/15">
            <iframe
              title="Atlas Bar map"
              src="https://www.google.com/maps?q=3801+N+Williams+Ave+Portland+OR+97227&output=embed"
              className="h-full min-h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section id="contact" className="container pb-20">
        <Card className="glass border-white/15">
          <div className="grid gap-0 md:grid-cols-[1fr_1.1fr]">
            <CardHeader className="border-b border-white/10 bg-black/20 md:border-b-0 md:border-r">
              <p className="text-xs uppercase tracking-[0.3em] text-primary">Contact</p>
              <CardTitle className="text-4xl">Private events, reservations, and collabs.</CardTitle>
              <p className="mt-4 text-sm text-muted-foreground">
                Share your date, party size, and vibe. Our team replies quickly with
                options and next steps.
              </p>
              <div className="mt-8 grid gap-3 text-sm text-muted-foreground">
                <p className="flex items-center gap-2"><Martini className="h-4 w-4 text-primary" />Cocktail catering available</p>
                <p className="flex items-center gap-2"><GlassWater className="h-4 w-4 text-primary" />NA beverage packages available</p>
              </div>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <form action="/api/contact" method="post" className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    name="name"
                    placeholder="Your name"
                    required
                    className="flex h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="flex h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm"
                  />
                </div>
                <input
                  name="eventDate"
                  placeholder="Date or preferred night"
                  className="flex h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm"
                />
                <textarea
                  name="message"
                  placeholder="Tell us what you need"
                  required
                  className="flex min-h-36 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm"
                />
                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  Send Inquiry
                </Button>
              </form>
            </CardContent>
          </div>
        </Card>
      </section>
    </main>
  );
}
