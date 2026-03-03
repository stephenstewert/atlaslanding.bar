import Image from "next/image";
import Link from "next/link";
import {
  Clock3,
  Facebook,
  GlassWater,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Ticket,
  Wine
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const assets = {
  logo: "https://cdn.prod.website-files.com/643b06564581272492d75842/66e22665893360296137d79f_atlasdark.png",
  hero: "https://cdn.prod.website-files.com/643b06564581272492d75842/66e384bba07e40107a7b066f_IMG_2684%203-2.jpg"
};

const cocktails = [
  {
    name: "Blood Orange Spritz",
    price: "$12",
    desc: "Aperol, Prosecco, San Pellegrino Aranciata Rosa, sparkling water"
  },
  {
    name: "Passionfruit Soda",
    price: "$12",
    desc: "Skyy Vodka, Passoa, lime, agave, sparkling water"
  },
  {
    name: "Dazed and Confused",
    price: "$12",
    desc: "Sazerac Rye, stone fruit, lime, simple"
  },
  {
    name: "Spring Berry 75",
    price: "$12",
    desc: "Gray Whale Gin, lemon, blackberry puree, Prosecco"
  },
  {
    name: "Island Time",
    price: "$11",
    desc: "Hawaiian white ginger infused gin, Fever Tree tonic"
  },
  {
    name: "Atlas Landing Old Fashioned",
    price: "$12",
    desc: "Buffalo Trace Bourbon, maraschino, absinthe, bitters"
  },
  {
    name: "Spicy Mule",
    price: "$12",
    desc: "Astral Tequila, lime, ginger beer, jalapeno"
  },
  {
    name: "Garden Refresher",
    price: "$12",
    desc: "Ketel Cucumber Mint Vodka, mint, lemon, sparkling water, iced tea"
  }
];

const flights = [
  "Wine flights from $15 (red, white, bubbles, cabernet)",
  "Whiskey flights from $14 (bourbon, scotch, irish, japanese)",
  "Beer lineup rotates with local + classic pours",
  "Seasonal cocktail menu updates throughout the year"
];

const hours = [
  "Monday: 3pm - 10pm",
  "Tuesday: 3pm - 10pm",
  "Wednesday: 3pm - 10pm",
  "Thursday: 3pm - 10pm",
  "Friday: 4pm - 12am",
  "Saturday: 4pm - 12am",
  "Sunday: Closed"
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0%_20%,rgba(194,156,102,0.2),transparent_45%)]" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#111722]/90 backdrop-blur-xl">
        <nav className="container flex h-16 items-center justify-between">
          <Link href="#home" className="flex items-center">
            <Image src={assets.logo} alt="Atlas Landing" width={150} height={48} className="h-9 w-auto" priority />
          </Link>
          <div className="hidden items-center gap-8 text-sm md:flex">
            <Link href="#menu" className="transition-colors hover:text-primary">Menu</Link>
            <Link href="#visit" className="transition-colors hover:text-primary">Visit</Link>
            <Link href="#contact" className="transition-colors hover:text-primary">Contact</Link>
          </div>
          <Button asChild size="sm"><Link href="#contact">Get In Touch</Link></Button>
        </nav>
      </header>

      <section id="home" className="container py-8 md:py-12">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/15">
          <Image src={assets.hero} alt="Atlas Landing bar interior" width={2200} height={1500} className="h-[74vh] w-full object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10131d] to-transparent" />

          <div className="absolute bottom-0 left-0 max-w-3xl p-6 md:p-12">
            <Badge variant="secondary" className="mb-4 border-white/20 bg-white/15 tracking-[0.2em] uppercase">Midtown Reno</Badge>
            <h1 className="font-display text-5xl leading-[0.95] text-white md:text-7xl">
              Atlas Landing
            </h1>
            <p className="mt-4 max-w-xl text-base text-white/85 md:text-lg">
              Cozy neighborhood bar with craft cocktails, wine flights, whiskey flights,
              and rotating beer in the heart of Midtown.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link href="#menu">See Menu Highlights</Link></Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 bg-black/20 text-white hover:bg-black/30">
                <Link href="#visit">Plan Your Visit</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="container py-16">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-primary">Cocktail Menu</p>
            <h2 className="font-display text-4xl md:text-5xl">Current Signatures</h2>
          </div>
          <Badge variant="outline" className="hidden border-primary/40 text-primary sm:inline-flex">Seasonal changes apply</Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cocktails.map((item, idx) => (
            <Card key={item.name} className="glass reveal border-white/15" style={{ animationDelay: `${idx * 80}ms` }}>
              <CardHeader className="pb-3">
                <div className="mb-2 flex items-center justify-between">
                  <CardTitle className="text-2xl">{item.name}</CardTitle>
                  <span className="font-display text-xl text-primary">{item.price}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 border-white/15 bg-charcoal/60">
          <CardHeader>
            <CardTitle className="text-3xl">Flights + Program Notes</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {flights.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl border border-white/15 bg-black/20 p-3 text-sm">
                <Wine className="h-4 w-4 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section id="visit" className="container py-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <Card className="glass border-white/15">
            <CardHeader>
              <p className="text-xs uppercase tracking-[0.3em] text-primary">Location</p>
              <CardTitle className="text-4xl">772 S Virginia St, Reno, NV 89509</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="flex items-center gap-3 text-sm text-muted-foreground"><Phone className="h-4 w-4 text-primary" />(775) 273-8146</p>
              <p className="flex items-center gap-3 text-sm text-muted-foreground"><Mail className="h-4 w-4 text-primary" />info@atlaslanding.bar</p>
              <p className="flex items-start gap-3 text-sm text-muted-foreground"><Clock3 className="mt-0.5 h-4 w-4 text-primary" />
                <span>{hours.join(" | ")}</span>
              </p>

              <Separator className="bg-white/10" />

              <div className="grid gap-3 text-sm">
                <Link href="http://maps.apple.com/?daddr=772+S+Virginia+St,+Reno+NV" target="_blank" className="inline-flex items-center gap-2 text-primary hover:text-primary/80">
                  <MapPin className="h-4 w-4" />Open in Maps
                </Link>
                <Link href="https://www.instagram.com/atlaslanding/" target="_blank" className="inline-flex items-center gap-2 text-primary hover:text-primary/80">
                  <Instagram className="h-4 w-4" />@atlaslanding
                </Link>
                <Link href="https://www.facebook.com/profile.php?id=100095380789651" target="_blank" className="inline-flex items-center gap-2 text-primary hover:text-primary/80">
                  <Facebook className="h-4 w-4" />Facebook
                </Link>
                <Link href="https://www.yelp.com/biz/atlas-landing-reno-2" target="_blank" className="inline-flex items-center gap-2 text-primary hover:text-primary/80">
                  <GlassWater className="h-4 w-4" />Yelp
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="overflow-hidden rounded-3xl border border-white/15">
            <iframe
              title="Atlas Landing map"
              src="https://www.google.com/maps?q=772+S+Virginia+St,+Reno,+NV+89509&output=embed"
              className="h-full min-h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section id="contact" className="container pb-20 pt-14">
        <Card className="glass border-white/15">
          <div className="grid md:grid-cols-[0.9fr_1.1fr]">
            <CardHeader className="border-b border-white/10 bg-black/20 md:border-b-0 md:border-r">
              <p className="text-xs uppercase tracking-[0.3em] text-primary">Contact</p>
              <CardTitle className="text-4xl">Book a table, group, or private event.</CardTitle>
              <p className="mt-4 text-sm text-muted-foreground">
                Share your date, party size, and request. This form can be wired to your
                preferred provider before launch.
              </p>
              <div className="mt-6 rounded-xl border border-primary/30 bg-primary/10 p-3 text-sm text-primary">
                <p className="flex items-center gap-2"><Ticket className="h-4 w-4" />Current promo: $2 off wine flights</p>
              </div>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <form action="/api/contact" method="post" className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input name="name" placeholder="Your name" required />
                  <Input type="email" name="email" placeholder="Email" required />
                </div>
                <Input name="date" placeholder="Preferred date / time" />
                <Textarea name="message" placeholder="Tell us about your reservation or event" required />
                <Button type="submit" size="lg" className="w-full sm:w-auto">Send Inquiry</Button>
              </form>
            </CardContent>
          </div>
        </Card>
      </section>
    </main>
  );
}
