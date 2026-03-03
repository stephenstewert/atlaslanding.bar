import Image from "next/image";
import Link from "next/link";
import {
  Clock3,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Music4,
  Phone,
  Sparkles,
  Users,
  Wine
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const assets = {
  logo: "https://cdn.prod.website-files.com/643b06564581272492d75842/64ee88e0afb4f279136f0253_green%20logo.svg",
  hero: "https://cdn.prod.website-files.com/643b06564581272492d75842/64aeefdd6b8c0c941a3baee4_IMG_1924-min.JPG",
  gallery: "https://cdn.prod.website-files.com/643b06564581272492d75842/66e384bba07e40107a7b066f_IMG_2684%203-2.jpg"
};

const cocktails = [
  ["Blood Orange Spritz", "$12"],
  ["Passionfruit Soda", "$12"],
  ["Dazed and Confused", "$12"],
  ["Spring Berry 75", "$12"],
  ["Island Time", "$11"],
  ["Atlas Landing Old Fashioned", "$12"],
  ["Spicy Mule", "$12"],
  ["Garden Refresher", "$12"]
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
      <header className="fixed inset-x-0 top-0 z-50">
        <nav className="container mt-3 flex items-center justify-between rounded-full border border-linen/20 bg-gunmetal/75 px-4 py-2.5 backdrop-blur-md md:mt-4 md:px-5 md:py-3">
          <Link href="#home" className="flex items-center gap-3">
            <span className="rounded-full bg-linen/90 px-3 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
              <Image src={assets.logo} alt="Atlas Landing" width={110} height={36} className="h-8 w-auto" priority />
            </span>
          </Link>
          <div className="hidden items-center gap-7 text-sm md:flex">
            <Link href="#story" className="text-linen/80 transition hover:text-linen">Story</Link>
            <Link href="#menu" className="text-linen/80 transition hover:text-linen">Menu</Link>
            <Link href="#visit" className="text-linen/80 transition hover:text-linen">Visit</Link>
            <Link href="#contact" className="text-linen/80 transition hover:text-linen">Contact</Link>
          </div>
          <Button asChild size="sm" className="rounded-full px-4 md:px-5">
            <Link href="#menu">Menu</Link>
          </Button>
        </nav>
      </header>

      <section id="home" className="relative min-h-screen">
        <Image
          src={assets.hero}
          alt="Atlas Landing hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-gunmetal" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(183,109,104,0.25),transparent_45%)]" />

        <div className="container relative z-10 flex min-h-screen items-end pb-14 pt-28 md:items-center md:pb-0 md:pt-36">
          <div className="max-w-4xl">
            <Badge className="mb-6 rounded-full bg-secondary/90 px-4 py-1 text-secondary-foreground">
              Midtown Reno
            </Badge>
            <h1 className="font-display text-4xl leading-[0.95] text-linen sm:text-5xl md:text-8xl">
              Where late nights
              <br />
              pour better.
            </h1>
            <p className="mt-5 max-w-2xl text-base text-linen/85 md:mt-6 md:text-lg">
              Atlas Landing is a cocktail and wine bar built for long conversations,
              deep playlists, and one-more-round energy.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 md:mt-8">
              <Button asChild size="lg" className="w-full rounded-full px-8 sm:w-auto">
                <Link href="#menu">View Cocktails</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full rounded-full border-linen/40 bg-black/20 px-8 text-linen hover:bg-black/35 sm:w-auto"
              >
                <Link href="#visit">Get Directions</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container relative z-20 -mt-10 pb-16 md:-mt-12 md:pb-20">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-lobsterPink/40 bg-gunmetal/80">
            <CardContent className="p-6 text-linen">
              <p className="mb-2 inline-flex items-center gap-2 text-sm text-sandDune"><Sparkles className="h-4 w-4" /> Signature Program</p>
              <p className="text-2xl font-display">Seasonal cocktails + classic flights</p>
            </CardContent>
          </Card>
          <Card className="border-jungleTeal/40 bg-gunmetal/80">
            <CardContent className="p-6 text-linen">
              <p className="mb-2 inline-flex items-center gap-2 text-sm text-sandDune"><Music4 className="h-4 w-4" /> Atmosphere</p>
              <p className="text-2xl font-display">Moody lighting, vinyl energy, intimate tables</p>
            </CardContent>
          </Card>
          <Card className="border-lobsterPink/40 bg-gunmetal/80">
            <CardContent className="p-6 text-linen">
              <p className="mb-2 inline-flex items-center gap-2 text-sm text-sandDune"><Users className="h-4 w-4" /> Community</p>
              <p className="text-2xl font-display">Neighborhood regulars and first dates alike</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="story" className="container pb-16 md:pb-20">
        <div className="grid items-start gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-linen/20 bg-gunmetal/85 text-linen">
            <CardHeader>
              <p className="text-xs uppercase tracking-[0.25em] text-sandDune">Atlas Landing</p>
              <CardTitle className="font-display text-3xl sm:text-4xl md:text-5xl">A Midtown bar with real personality.</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-linen/85">
              <p>
                We focus on cocktails, beer, wine, and whiskey flights without feeling formal.
                The room is warm, the menu rotates, and the soundtrack keeps the pace all night.
              </p>
              <p>
                From opening pours to last call, Atlas is built for people who want a better
                neighborhood bar experience.
              </p>
            </CardContent>
          </Card>
          <div className="overflow-hidden rounded-3xl border border-linen/20">
            <Image
              src={assets.gallery}
              alt="Inside Atlas Landing"
              width={1200}
              height={1500}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-linen/15 bg-lobsterPink/20 py-4">
        <div className="container flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm uppercase tracking-[0.2em] text-sandDune">
          <span>$2 Off Wine Flights</span>
          <span>•</span>
          <span>Craft Cocktails</span>
          <span>•</span>
          <span>Whiskey Flights</span>
          <span>•</span>
          <span>Midtown Reno</span>
        </div>
      </section>

      <section id="menu" className="container py-16 md:py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-sandDune">Cocktail Menu</p>
            <h2 className="font-display text-4xl text-linen md:text-5xl">Now Pouring</h2>
          </div>
          <Badge variant="outline" className="hidden border-linen/30 text-linen sm:inline-flex">Seasonal updates</Badge>
        </div>

        <Card className="border-linen/20 bg-gunmetal/80">
          <CardContent className="grid gap-x-10 gap-y-4 p-8 md:grid-cols-2">
            {cocktails.map(([name, price]) => (
              <div key={name} className="flex items-end justify-between border-b border-linen/15 pb-3">
                <div>
                  <p className="font-display text-2xl text-linen">{name}</p>
                </div>
                <p className="text-lg text-lobsterPink">{price}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section id="visit" className="container pb-20">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <Card className="border-linen/20 bg-gunmetal/85 text-linen">
            <CardHeader>
              <p className="text-xs uppercase tracking-[0.25em] text-sandDune">Visit Us</p>
              <CardTitle className="font-display text-3xl md:text-4xl">772 S Virginia St, Reno, NV 89509</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 text-sm text-linen/85">
              <p className="flex items-center gap-3"><Phone className="h-4 w-4 text-jungleTeal" />(775) 273-8146</p>
              <p className="flex items-center gap-3"><Mail className="h-4 w-4 text-jungleTeal" />info@atlaslanding.bar</p>
              <div className="flex items-start gap-3">
                <Clock3 className="mt-0.5 h-4 w-4 text-jungleTeal" />
                <ul className="space-y-1">
                  {hours.map((time) => (
                    <li key={time}>{time}</li>
                  ))}
                </ul>
              </div>
              <Separator className="bg-linen/20" />
              <div className="grid gap-3">
                <Link href="http://maps.apple.com/?daddr=772+S+Virginia+St,+Reno+NV" target="_blank" className="inline-flex items-center gap-2 text-sandDune hover:text-linen"><MapPin className="h-4 w-4" />Open in Maps</Link>
                <Link href="https://www.instagram.com/atlaslanding/" target="_blank" className="inline-flex items-center gap-2 text-sandDune hover:text-linen"><Instagram className="h-4 w-4" />@atlaslanding</Link>
                <Link href="https://www.facebook.com/profile.php?id=100095380789651" target="_blank" className="inline-flex items-center gap-2 text-sandDune hover:text-linen"><Facebook className="h-4 w-4" />Facebook</Link>
              </div>
            </CardContent>
          </Card>

          <div className="overflow-hidden rounded-3xl border border-linen/20">
            <iframe
              title="Atlas Landing map"
              src="https://www.google.com/maps?q=772+S+Virginia+St,+Reno,+NV+89509&output=embed"
              className="h-full min-h-[430px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section id="contact" className="container pb-20">
        <Card className="border-linen/20 bg-gunmetal/90 text-linen">
          <div className="grid md:grid-cols-[1fr_1.1fr]">
            <CardHeader className="border-b border-linen/15 md:border-b-0 md:border-r">
              <p className="text-xs uppercase tracking-[0.25em] text-sandDune">Events & Inquiries</p>
              <CardTitle className="font-display text-3xl md:text-4xl">Tell us your night plan.</CardTitle>
              <p className="text-linen/80">
                Private events, birthdays, large groups, and collaborations.
                We will reply with options and timing.
              </p>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <form action="/api/contact" method="post" className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input name="name" placeholder="Your name" required className="h-12 rounded-xl border-linen/25 bg-linen/10 text-linen placeholder:text-linen/60" />
                  <Input type="email" name="email" placeholder="Email" required className="h-12 rounded-xl border-linen/25 bg-linen/10 text-linen placeholder:text-linen/60" />
                </div>
                <Input name="date" placeholder="Event date / timing (optional)" className="h-12 rounded-xl border-linen/25 bg-linen/10 text-linen placeholder:text-linen/60" />
                <Textarea name="message" placeholder="Tell us what you're planning" required className="min-h-36 rounded-xl border-linen/25 bg-linen/10 text-linen placeholder:text-linen/60" />
                <Button type="submit" size="lg" className="rounded-full px-8">Send Inquiry</Button>
              </form>
            </CardContent>
          </div>
        </Card>
      </section>
    </main>
  );
}
