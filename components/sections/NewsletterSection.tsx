"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, Sparkles, Clock, AlertCircle } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unable to process subscription.");
      }

      setStatus("success");
      setMessage(data.message || "Welcome to the Marea Bay Private Collection.");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 bg-gradient-to-br from-[#C9A45C] via-[#D8B46C] to-[#B59149] text-marea-teal-dark relative overflow-hidden">
      {/* Background Subtle Ornamental Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-black/10 blur-2xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/10 border border-black/15 text-xs uppercase tracking-[0.25em] font-medium text-marea-teal-dark">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Private Collection</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-marea-teal-dark">
          Receive Bespoke Seasonal Invitations & Private Offers
        </h2>

        <p className="text-sm md:text-base font-light text-marea-teal-dark/85 max-w-xl mx-auto">
          Members of our Private Register enjoy priority reservation access to our clifftop penthouses, private chef dinners, and curated seasonal escapes.
        </p>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto flex flex-col sm:flex-row items-center gap-3 pt-2"
        >
          <div className="relative w-full">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-marea-teal-dark/60" />
            <input
              type="email"
              required
              placeholder="Enter your personal email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading" || status === "success"}
              className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white/90 border border-white text-marea-teal-dark placeholder:text-marea-teal-dark/50 text-sm focus:outline-none focus:ring-2 focus:ring-marea-teal shadow-md"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-marea-teal text-white font-medium text-xs uppercase tracking-[0.2em] shadow-lg hover:bg-marea-teal-deep active:scale-98 transition-all shrink-0 disabled:opacity-50"
          >
            {status === "loading" ? (
              <Clock className="w-4 h-4 animate-spin mx-auto" />
            ) : (
              <span>Subscribe</span>
            )}
          </button>
        </form>

        {/* Feedback Messages */}
        {status === "success" && (
          <div className="inline-flex items-center gap-2 p-3 rounded-xl bg-white/40 text-marea-teal-dark text-xs font-medium animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-800" />
            <span>{message}</span>
          </div>
        )}

        {status === "error" && (
          <div className="inline-flex items-center gap-2 p-3 rounded-xl bg-red-500/20 text-red-950 text-xs font-medium animate-fade-in">
            <AlertCircle className="w-4 h-4 text-red-900" />
            <span>{message}</span>
          </div>
        )}

        <p className="text-[11px] text-marea-teal-dark/60 tracking-wider">
          We honor your privacy. Unsubscribe at any time with a single click.
        </p>
      </div>
    </section>
  );
}
