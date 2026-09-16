"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  Users,
  Search,
  Sparkles,
  ChevronDown,
  Plus,
  Minus,
  BedDouble,
  ShieldCheck,
} from "lucide-react";
import { format, addDays } from "date-fns";

interface FloatingBookingWidgetProps {
  onCheckAvailability: (params: {
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    roomTypeId?: string;
  }) => void;
  selectedRoomTypeId?: string;
  roomTypes?: Array<{ id: string; name: string }>;
}

export function FloatingBookingWidget({
  onCheckAvailability,
  selectedRoomTypeId,
  roomTypes = [],
}: FloatingBookingWidgetProps) {
  // Set default dates: 1 week from now for 4 nights
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [adults, setAdults] = useState<number>(2);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [roomTypeId, setRoomTypeId] = useState<string>(selectedRoomTypeId || "");
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const defaultIn = addDays(today, 7);
    const defaultOut = addDays(today, 11);
    setCheckIn(format(defaultIn, "yyyy-MM-dd"));
    setCheckOut(format(defaultOut, "yyyy-MM-dd"));
    setMinDate(format(today, "yyyy-MM-dd"));

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolledPastHero(window.scrollY > 480);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (selectedRoomTypeId) {
      setRoomTypeId(selectedRoomTypeId);
    }
  }, [selectedRoomTypeId]);

  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newIn = e.target.value;
    setCheckIn(newIn);
    // Ensure checkOut is at least 1 day after checkIn
    if (newIn >= checkOut) {
      const nextDay = addDays(new Date(newIn), 1);
      setCheckOut(format(nextDay, "yyyy-MM-dd"));
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGuestsOpen(false);
    onCheckAvailability({
      checkIn,
      checkOut,
      adults,
      children: childrenCount,
      roomTypeId: roomTypeId || undefined,
    });
  };

  return (
    <>
      {/* 1. In-Hero Main Floating Widget Anchor */}
      <div
        className={`w-full max-w-5xl mx-auto px-4 transition-all duration-700 ${
          isScrolledPastHero ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="glass-teal-luxury rounded-2xl md:rounded-full p-2.5 sm:p-3 md:p-3 shadow-float border border-marea-gold/40 text-white relative">
          {/* Subtle gold halo glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-marea-gold/20 via-transparent to-marea-gold/20 rounded-2xl md:rounded-full blur -z-10" />

          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2"
          >
            {/* 1. Dates (2 columns on mobile, individual items on desktop) */}
            <div className="grid grid-cols-2 gap-2 flex-1 items-center">
              {/* Check-In Field */}
              <div className="flex items-center gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl md:rounded-full bg-white/5 md:bg-transparent hover:bg-white/10 transition-colors border border-white/10 md:border-transparent">
                <CalendarIcon className="w-4 h-4 text-marea-gold shrink-0" />
                <div className="flex flex-col text-left flex-1 min-w-0">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-marea-gold/90 font-medium">
                    Check-In
                  </span>
                  <input
                    type="date"
                    min={minDate}
                    value={checkIn}
                    onChange={handleCheckInChange}
                    className="bg-transparent text-white text-xs sm:text-sm font-medium focus:outline-none cursor-pointer [color-scheme:dark] w-full"
                    required
                  />
                </div>
              </div>

              {/* Check-Out Field */}
              <div className="flex items-center gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl md:rounded-full bg-white/5 md:bg-transparent hover:bg-white/10 transition-colors border border-white/10 md:border-transparent">
                <CalendarIcon className="w-4 h-4 text-marea-gold shrink-0" />
                <div className="flex flex-col text-left flex-1 min-w-0">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-marea-gold/90 font-medium">
                    Check-Out
                  </span>
                  <input
                    type="date"
                    min={checkIn || minDate}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="bg-transparent text-white text-xs sm:text-sm font-medium focus:outline-none cursor-pointer [color-scheme:dark] w-full"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="hidden md:block w-[1px] h-9 bg-white/20" />

            {/* 2. Guests & Submit (side-by-side on mobile, inline on desktop) */}
            <div className="flex items-center gap-2 flex-1">
              {/* Guests Stepper Dropdown */}
              <div className="relative flex-1">
                <button
                  type="button"
                  onClick={() => setIsGuestsOpen(!isGuestsOpen)}
                  className="w-full flex items-center justify-between gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl md:rounded-full bg-white/5 md:bg-transparent hover:bg-white/10 transition-colors border border-white/10 md:border-transparent min-h-[40px] md:min-h-[44px]"
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 text-left">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-marea-gold shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-marea-gold/90 font-medium hidden sm:block">
                        Guests
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-white truncate">
                        {adults} {adults === 1 ? "Adult" : "Adults"}
                        {childrenCount > 0 ? `, ${childrenCount} Ch` : ""}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-white/60 shrink-0" />
                </button>

                {/* Guests Dropdown Popover */}
                {isGuestsOpen && (
                  <div className="absolute top-full mt-2 left-0 right-0 sm:right-auto sm:w-72 p-4 sm:p-5 rounded-2xl glass-teal-luxury shadow-teal-deep border border-marea-gold/40 z-50 animate-fade-in text-white">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div>
                        <p className="text-sm font-medium">Adults</p>
                        <p className="text-xs text-white/60">Ages 13+</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          disabled={adults <= 1}
                          className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:border-marea-gold disabled:opacity-30"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-4 text-center font-medium text-sm">
                          {adults}
                        </span>
                        <button
                          type="button"
                          onClick={() => setAdults(Math.min(6, adults + 1))}
                          disabled={adults >= 6}
                          className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:border-marea-gold disabled:opacity-30"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3">
                      <div>
                        <p className="text-sm font-medium">Children</p>
                        <p className="text-xs text-white/60">Ages 0-12</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                          disabled={childrenCount <= 0}
                          className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:border-marea-gold disabled:opacity-30"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-4 text-center font-medium text-sm">
                          {childrenCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => setChildrenCount(Math.min(4, childrenCount + 1))}
                          disabled={childrenCount >= 4}
                          className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:border-marea-gold disabled:opacity-30"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsGuestsOpen(false)}
                      className="w-full mt-3 py-2 rounded-full bg-marea-gold text-marea-teal-dark text-xs font-semibold uppercase tracking-wider hover:bg-marea-gold-hover transition-colors"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="flex items-center justify-center gap-1.5 px-4 sm:px-7 py-2.5 sm:py-3.5 md:py-3.5 rounded-xl md:rounded-full bg-gradient-to-r from-marea-gold via-[#DEBB74] to-marea-gold text-marea-teal-dark font-semibold text-xs uppercase tracking-[0.16em] sm:tracking-[0.2em] shadow-gold-subtle hover:shadow-gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 min-h-[40px] md:min-h-[48px] shrink-0"
              >
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-marea-teal-deep shrink-0" />
                <span className="whitespace-nowrap">Check Rates</span>
              </button>
            </div>
          </form>
        </div>

        {/* Real Inventory Assurance Tagline (Desktop Only) */}
        <div className="hidden md:flex items-center justify-center gap-4 text-[11px] text-white/75 mt-3">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-marea-gold" />
            Guaranteed Best Oceanfront Rates
          </span>
          <span className="w-1 h-1 rounded-full bg-marea-gold/60" />
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-marea-gold" />
            Live Real-Time Inventory
          </span>
        </div>
      </div>

      {/* 2. Persistent Floating Sticky Mini-Bar when Scrolled (Desktop Only) */}
      <div
        className={`hidden md:block fixed bottom-5 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 w-[94%] max-w-2xl ${
          isScrolledPastHero
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <div className="glass-teal-luxury rounded-full px-5 py-3 shadow-float border border-marea-gold/50 text-white flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-full bg-marea-gold/20 flex items-center justify-center shrink-0 border border-marea-gold/40">
              <BedDouble className="w-4 h-4 text-marea-gold" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] uppercase tracking-[0.25em] text-marea-gold font-medium">
                Reserve Your Stay
              </span>
              <span className="text-xs text-white/90 truncate font-light">
                {checkIn && checkOut
                  ? `${checkIn} to ${checkOut} • ${adults} ${adults === 1 ? "Guest" : "Guests"}`
                  : "Select dates & live available suites"}
              </span>
            </div>
          </div>

          <button
            onClick={() =>
              onCheckAvailability({
                checkIn,
                checkOut,
                adults,
                children: childrenCount,
                roomTypeId: roomTypeId || undefined,
              })
            }
            className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full bg-marea-gold text-marea-teal-dark text-xs uppercase tracking-[0.16em] font-medium shadow-gold-subtle hover:bg-marea-gold-hover transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>Book Now</span>
            <Search className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </>
  );
}
