"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Compass,
  BedDouble,
  Utensils,
  Sparkles,
  CalendarCheck,
  MoreHorizontal,
  X,
  MapPin,
  Image as ImageIcon,
  BookOpen,
  Phone,
  Sun,
  Moon,
  ChevronRight,
} from "lucide-react";

export function MobileFloatingNav() {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close sheet on route change
  useEffect(() => {
    setIsMoreOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Compass,
      exact: true,
    },
    {
      label: "Suites",
      href: "/rooms",
      icon: BedDouble,
      exact: false,
    },
    {
      label: "Dining",
      href: "/dining",
      icon: Utensils,
      exact: false,
    },
    {
      label: "Spa",
      href: "/spa",
      icon: Sparkles,
      exact: false,
    },
  ];

  const quickLinks = [
    {
      name: "Curated Experiences",
      desc: "Yacht charters, diving & marine sanctuary",
      href: "/experiences",
      icon: Compass,
    },
    {
      name: "Resort Gallery",
      desc: "Visual journey through villas & coastline",
      href: "/gallery",
      icon: ImageIcon,
    },
    {
      name: "Arrival & Location",
      desc: "Seaplane transfers, yacht marina & maps",
      href: "/location",
      icon: MapPin,
    },
    {
      name: "Manage Reservation",
      desc: "Retrieve your voucher & itinerary",
      href: "/manage-booking",
      icon: BookOpen,
    },
  ];

  return (
    <>
      {/* 1. Backdrop Overlay for Quick Menu */}
      {isMoreOpen && (
        <div
          onClick={() => setIsMoreOpen(false)}
          className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-sm transition-opacity animate-fade-in md:hidden cursor-pointer"
        />
      )}

      {/* 2. Slide-up Luxury Concierge Sheet */}
      {isMoreOpen && (
        <div className="fixed bottom-20 inset-x-3 sm:inset-x-6 max-w-md mx-auto z-[70] rounded-3xl bg-[#071F21]/98 backdrop-blur-2xl border border-marea-gold/50 shadow-2xl p-4 sm:p-5 text-white animate-slide-up md:hidden">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-marea-gold/20 border border-marea-gold/50 flex items-center justify-center text-marea-gold shrink-0">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <span className="font-serif text-sm tracking-wider uppercase text-white block leading-tight">
                  Marea Bay Sanctuary
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-marea-gold font-medium">
                  Concierge Services
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsMoreOpen(false)}
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-marea-gold hover:border-marea-gold active:scale-90 transition-all cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Nav Links List */}
          <div className="divide-y divide-white/10 py-1.5 space-y-0.5">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              const isItemActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMoreOpen(false)}
                  className={`w-full py-2.5 px-3 rounded-2xl flex items-center justify-between group transition-all cursor-pointer hover:bg-white/5 active:bg-white/15 active:scale-[0.98] ${
                    isItemActive ? "text-marea-gold bg-white/5" : "text-white/90 hover:text-marea-gold"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isItemActive
                          ? "bg-marea-gold text-marea-teal-dark shadow-gold-subtle"
                          : "bg-white/5 border border-white/10 group-hover:border-marea-gold text-marea-gold group-active:bg-marea-gold group-active:text-marea-teal-dark"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 text-left">
                      <p className="text-xs sm:text-sm font-medium tracking-wide leading-tight truncate">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-white/50 font-light mt-0.5 truncate">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-marea-gold group-hover:translate-x-0.5 shrink-0 transition-all ml-2" />
                </Link>
              );
            })}
          </div>

          {/* Bottom Actions: Call Concierge & Dark/Light Toggle */}
          <div className="pt-3.5 border-t border-white/10 flex items-center justify-between gap-3">
            <a
              href="tel:+18008426273"
              className="flex-1 py-2.5 px-3 rounded-full bg-white/5 border border-marea-gold/30 hover:border-marea-gold hover:bg-white/10 active:bg-marea-gold/20 active:scale-95 text-[11px] text-white/90 flex items-center justify-center gap-2 transition-all cursor-pointer font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-marea-gold" />
              <span>Call Concierge</span>
            </a>

            {mounted && (
              <button
                onClick={toggleTheme}
                className="py-2.5 px-4 rounded-full bg-white/5 border border-white/20 hover:border-marea-gold hover:bg-white/10 active:bg-white/15 active:scale-95 text-[11px] text-white/90 flex items-center gap-2 transition-all cursor-pointer"
                aria-label="Toggle dark/light mode"
              >
                {resolvedTheme === "dark" ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-marea-gold" />
                    <span className="text-marea-gold font-medium">Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-white" />
                    <span>Dark</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      )}

      {/* 3. Luxury Floating App Navigation Bar (Always Fixed at Bottom on Mobile) */}
      <nav
        aria-label="Mobile Application Navigation"
        className="fixed bottom-3 inset-x-3 sm:inset-x-6 max-w-md mx-auto z-50 md:hidden"
      >
        <div className="relative rounded-full bg-[#061819]/95 backdrop-blur-xl border border-marea-gold/45 shadow-[0_10px_30px_rgba(0,0,0,0.65)] px-2 py-1.5 flex items-center justify-between gap-1 transition-all">
          {/* Subtle gold ambient glow ring */}
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-marea-gold/25 via-transparent to-marea-gold/25 -z-10 blur-xs pointer-events-none" />

          {/* Primary 4 Navigation Links */}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-full transition-all duration-200 active:scale-90 ${
                  isActive
                    ? "text-marea-gold font-semibold"
                    : "text-white/65 hover:text-white"
                }`}
              >
                <div className="relative">
                  <Icon className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-colors ${
                    isActive ? "text-marea-gold" : "text-white/70"
                  }`} />
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-marea-gold shadow-[0_0_6px_#C9A45C]" />
                  )}
                </div>
                <span className="text-[9px] uppercase tracking-wider mt-1 font-medium leading-none">
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* Luxury Prominent 'Book' Gold Action Button */}
          <Link
            href="/book"
            className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full font-sans font-semibold text-[10px] sm:text-[11px] uppercase tracking-[0.16em] transition-all duration-200 active:scale-95 shadow-gold-subtle ${
              pathname === "/book"
                ? "bg-white text-marea-teal-dark ring-2 ring-marea-gold"
                : "bg-gradient-to-r from-marea-gold via-[#E5C785] to-marea-gold text-marea-teal-dark hover:brightness-105"
            }`}
          >
            <CalendarCheck className="w-3.5 h-3.5 text-marea-teal-dark" />
            <span>Book</span>
          </Link>

          {/* 'More' Drawer Trigger */}
          <button
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            aria-label="Toggle concierge menu"
            className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-full transition-all duration-200 active:scale-90 ${
              isMoreOpen
                ? "text-marea-gold font-semibold"
                : "text-white/65 hover:text-white"
            }`}
          >
            <div className="relative">
              <MoreHorizontal className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${
                isMoreOpen ? "text-marea-gold" : "text-white/70"
              }`} />
              {isMoreOpen && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-marea-gold shadow-[0_0_6px_#C9A45C]" />
              )}
            </div>
            <span className="text-[9px] uppercase tracking-wider mt-1 font-medium leading-none">
              More
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}
