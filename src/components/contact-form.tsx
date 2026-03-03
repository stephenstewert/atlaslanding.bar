"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type FormStatus = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData
      });

      const result = (await response.json()) as { ok: boolean; error?: string };

      if (!response.ok || !result.ok) {
        setStatus("error");
        setError(result.error ?? "Something went wrong.");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        name="company"
        type="text"
        autoComplete="off"
        tabIndex={-1}
        className="hidden"
        aria-hidden="true"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          name="name"
          placeholder="Your name"
          required
          className="h-12 rounded-xl border-linen/25 bg-linen/10 text-linen placeholder:text-linen/60"
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="h-12 rounded-xl border-linen/25 bg-linen/10 text-linen placeholder:text-linen/60"
        />
      </div>
      <Input
        name="date"
        placeholder="Event date / timing (optional)"
        className="h-12 rounded-xl border-linen/25 bg-linen/10 text-linen placeholder:text-linen/60"
      />
      <Textarea
        name="message"
        placeholder="Tell us what you're planning"
        required
        className="min-h-36 rounded-xl border-linen/25 bg-linen/10 text-linen placeholder:text-linen/60"
      />
      <Button type="submit" size="lg" className="rounded-full px-8" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send Inquiry"}
      </Button>
      {status === "success" && (
        <p className="text-sm text-jungleTeal">Thanks, your message was sent.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-lobsterPink">{error}</p>
      )}
    </form>
  );
}
