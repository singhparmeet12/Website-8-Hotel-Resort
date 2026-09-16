"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  Search,
  Calendar,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Printer,
  ArrowLeft,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { formatCurrency } from "@/lib/utils";

export default function ManageBookingPage() {
  const [reference, setReference] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [booking, setBooking] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reference.trim()) return;

    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const queryUrl = `/api/bookings?reference=${encodeURIComponent(
        reference.trim().toUpperCase()
      )}${email ? `&email=${encodeURIComponent(email.trim())}` : ""}`;

      const res = await fetch(queryUrl);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "No matching reservation found.");
      }

      setBooking(data.booking);
    } catch (err: any) {
      setErrorMsg(err.message || "Unable to find reservation.");
      setBooking(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    if (!booking) return;

    const confirmed = window.confirm(
      "Are you sure you wish to cancel this reservation? Room inventory will be immediately released back into the live booking pool."
    );

    if (!confirmed) return;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`/api/bookings/${booking.id}/cancel`, {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to cancel reservation.");
      }

      setBooking(data.booking);
      setSuccessMsg(
        "Reservation successfully cancelled. Room inventory has been restored."
      );
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to cancel booking.");
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoReference = () => {
    setReference("MBR-2026-A8K2");
    setEmail("eleanor.vance@prestigesuites.co.uk");
  };

  return (
    <div className="min-h-screen bg-marea-sand-light dark:bg-marea-teal-night text-marea-teal dark:text-marea-sand-light transition-colors duration-500 py-12 px-6 md:px-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top Return Link & Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-marea-gold hover:text-marea-gold-hover transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Resort</span>
          </Link>

          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-marea-gold" />
            <span className="font-serif text-lg tracking-widest text-marea-teal dark:text-white uppercase font-light">
              Marea Bay
            </span>
          </div>
        </div>

        {/* Search Card */}
        <div className="p-8 rounded-3xl bg-white dark:bg-marea-teal/40 border border-marea-gold/30 shadow-xl space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] text-marea-gold font-medium">
              Reservation Concierge
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-marea-teal dark:text-white">
              Find & Manage Your Reservation
            </h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light">
              Enter your booking reference number and email address to review your stay details, request arrival upgrades, or manage your reservation.
            </p>
          </div>

          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-5 space-y-1">
              <label className="text-xs uppercase tracking-wider text-marea-gold font-medium">
                Booking Reference *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. MBR-2026-A8K2"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-marea-gold/30 bg-marea-sand-light/50 dark:bg-marea-teal/50 text-sm font-mono uppercase focus:outline-none focus:ring-1 focus:ring-marea-gold"
              />
            </div>

            <div className="sm:col-span-5 space-y-1">
              <label className="text-xs uppercase tracking-wider text-marea-gold font-medium">
                Guest Email (Optional)
              </label>
              <input
                type="email"
                placeholder="e.g. guest@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-marea-gold/30 bg-marea-sand-light/50 dark:bg-marea-teal/50 text-sm focus:outline-none focus:ring-1 focus:ring-marea-gold"
              />
            </div>

            <div className="sm:col-span-2 flex items-end">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-marea-gold hover:bg-marea-gold-hover text-marea-teal-dark font-medium text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-gold-subtle"
              >
                {isLoading ? (
                  <Clock className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Search</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between text-xs pt-2 border-t border-marea-gold/15">
            <span className="text-neutral-500">Need sample test credentials?</span>
            <button
              type="button"
              onClick={fillDemoReference}
              className="text-marea-gold hover:underline font-medium"
            >
              Fill Sample Seed Reservation (Lady Eleanor Vance)
            </button>
          </div>
        </div>

        {/* Status Alerts */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-300 text-xs flex items-center gap-3 animate-fade-in">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-3 animate-fade-in">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Found Booking Details Card */}
        {booking && (
          <div className="p-8 rounded-3xl bg-white dark:bg-marea-teal/40 border border-marea-gold/40 shadow-2xl space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-marea-gold/25">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-marea-gold block">
                  Reference Code
                </span>
                <span className="font-mono text-2xl font-bold text-marea-teal dark:text-white">
                  {booking.referenceNumber}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 ${
                    booking.status === "CONFIRMED"
                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30"
                      : "bg-neutral-500/20 text-neutral-500 border border-neutral-500/30"
                  }`}
                >
                  {booking.status === "CONFIRMED" ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5" />
                  )}
                  {booking.status}
                </span>

                <button
                  onClick={() => window.print()}
                  className="p-2 rounded-full border border-marea-gold/30 hover:border-marea-gold text-marea-teal dark:text-white hover:text-marea-gold transition-colors"
                  aria-label="Print reservation voucher"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-xs">
              <div className="space-y-1">
                <span className="text-neutral-400 uppercase tracking-wider block">
                  Sanctuary
                </span>
                <span className="font-serif text-base font-medium text-marea-teal dark:text-white">
                  {booking.roomType?.name || "Suite"}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-neutral-400 uppercase tracking-wider block">
                  Dates & Duration
                </span>
                <span className="text-xs font-medium">
                  {format(parseISO(booking.checkIn), "MMM dd, yyyy")} &rarr;{" "}
                  {format(parseISO(booking.checkOut), "MMM dd, yyyy")}
                </span>
                <span className="text-neutral-400 block">({booking.nights} Nights)</span>
              </div>

              <div className="space-y-1">
                <span className="text-neutral-400 uppercase tracking-wider block">
                  Guest Count
                </span>
                <span className="text-xs font-medium">
                  {booking.adults} Adults
                  {booking.children > 0 ? `, ${booking.children} Children` : ""}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-neutral-400 uppercase tracking-wider block">
                  Total Investment
                </span>
                <span className="font-serif text-lg font-medium text-marea-gold">
                  {formatCurrency(booking.totalPrice)}
                </span>
              </div>
            </div>

            {/* Guest Personal Information */}
            <div className="p-4 rounded-2xl bg-marea-sand-light/50 dark:bg-marea-teal/20 border border-marea-gold/20 text-xs space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span>
                  <strong>Lead Guest:</strong> {booking.guestName}
                </span>
                <span>
                  <strong>Email:</strong> {booking.guestEmail}
                </span>
                <span>
                  <strong>Phone:</strong> {booking.guestPhone}
                </span>
              </div>
              {booking.specialRequests && (
                <div className="pt-2 border-t border-marea-gold/15">
                  <span className="text-neutral-400 block mb-0.5">Special Requests:</span>
                  <p className="italic text-neutral-600 dark:text-neutral-300">
                    &ldquo;{booking.specialRequests}&rdquo;
                  </p>
                </div>
              )}
            </div>

            {/* Cancellation Action if Confirmed */}
            {booking.status === "CONFIRMED" && (
              <div className="pt-4 border-t border-marea-gold/25 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <ShieldCheck className="w-4 h-4 text-marea-gold" />
                  <span>Complimentary cancellation available up to 14 days prior to arrival.</span>
                </div>

                <button
                  onClick={handleCancelBooking}
                  disabled={isLoading}
                  className="px-6 py-2.5 rounded-full border border-red-500/40 text-red-600 dark:text-red-400 hover:bg-red-500/10 text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Cancel Reservation
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
