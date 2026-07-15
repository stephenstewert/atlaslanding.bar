"use client";

import { FormEvent, useState } from "react";
import { LockKeyhole } from "lucide-react";

export function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(result.error ?? "Unable to sign in.");
        return;
      }
      window.location.assign("/admin");
    } catch {
      setError("Unable to reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="admin-login-form" onSubmit={submit}>
      <p className="admin-kicker">Private access</p>
      <h1>Menu admin</h1>
      <p className="admin-login-copy">Sign in to create and update the items in your Clover inventory.</p>
      <div className="admin-field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="username" required />
      </div>
      <div className="admin-field">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required />
      </div>
      <button className="admin-submit" type="submit" disabled={loading}>
        {loading ? "Signing in…" : "Sign in"}
      </button>
      {error ? <p className="admin-error" role="alert">{error}</p> : null}
      <p className="admin-security-note"><LockKeyhole size={14} /> Protected with a secure, private session.</p>
    </form>
  );
}
