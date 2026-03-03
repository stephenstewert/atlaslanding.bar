"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

type SiteHeaderProps = {
  logoSrc: string;
};

const navItems = [
  { href: "#story", label: "Story" },
  { href: "#visit", label: "Visit" },
  { href: "#contact", label: "Contact" },
  { href: "#menu", label: "Menu" }
];

export function SiteHeader({ logoSrc }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="motion-nav container mt-3 flex items-center justify-between rounded-full border border-linen/20 bg-gunmetal/75 px-4 py-2.5 backdrop-blur-md md:mt-4 md:px-5 md:py-3">
        <Link href="#home" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="rounded-full bg-linen/95 p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
            <Image
              src={logoSrc}
              alt="Atlas Landing"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover"
              priority
            />
          </span>
        </Link>

        <div className="hidden items-center gap-7 text-sm md:flex">
          <Link href="#story" className="text-linen/80 transition hover:text-linen">Story</Link>
          <Link href="#visit" className="text-linen/80 transition hover:text-linen">Visit</Link>
          <Link href="#contact" className="text-linen/80 transition hover:text-linen">Contact</Link>
        </div>

        <Button asChild size="sm" className="hidden rounded-full px-4 md:inline-flex md:px-5">
          <Link href="#menu">Menu</Link>
        </Button>

        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="text-linen md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </nav>

      {open && (
        <div className="container mt-2 md:hidden">
          <div className="motion-up rounded-2xl border border-linen/20 bg-gunmetal/95 p-3 backdrop-blur-xl">
            {navItems.map((item, idx) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-xl px-4 py-3 text-sm ${idx === navItems.length - 1 ? "bg-primary text-primary-foreground" : "text-linen/90 hover:bg-linen/10"}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
