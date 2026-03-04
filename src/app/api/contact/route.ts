import { NextResponse } from "next/server";
import { Resend } from "resend";

const FALLBACK_RESEND_API_KEY = "re_Ra3sQ15f_FWLYqbJTzgpnTqVK5qZ2YYBb";
const DEFAULT_CONTACT_TO_EMAIL = "info@atlaslanding.bar";

function required(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = required(formData.get("name"));
    const email = required(formData.get("email"));
    const date = required(formData.get("date"));
    const message = required(formData.get("message"));
    const botField = required(formData.get("company"));

    // Honeypot field for spam bots.
    if (botField) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY ?? FALLBACK_RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL ?? DEFAULT_CONTACT_TO_EMAIL;
    const from =
      process.env.CONTACT_FROM_EMAIL ?? "Atlas Landing <onboarding@resend.dev>";

    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New Atlas Landing inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nDate/Timing: ${date || "Not provided"}\n\nMessage:\n${message}`,
      html: `
        <h2>New Atlas Landing inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date/Timing:</strong> ${date || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error", error);
    return NextResponse.json(
      { ok: false, error: "Failed to send inquiry." },
      { status: 500 }
    );
  }
}
