"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  Compass,
  Menu,
  X,
  CalendarCheck,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface NavbarProps {
  onOpenBookingModal?: (initialRoomId?: string) => void;
}

export function Navbar({ onOpenBookingModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Suites & Villas", href: "/rooms" },
    { name: "Experiences", href: "/experiences" },
    { name: "Dining", href: "/dining" },
    { name: "Spa & Wellness", href: "/spa" },
    { name: "Gallery", href: "/gallery" },
    { name: "Location", href: "/location" },
    { name: "My Booking", href: "/manage-booking" },
  ];

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const isHome = pathname === "/";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || !isHome
            ? "glass-teal-luxury shadow-teal-deep py-3 border-b border-marea-gold/30 text-white"
            : "bg-gradient-to-b from-black/70 via-black/35 to-transparent py-5 text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* 1. Sleek Brand Wordmark (Single Line) */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 group transition-transform duration-200 hover:opacity-95"
          >
            <div className="w-8 h-8 rounded-full border border-marea-gold/70 flex items-center justify-center bg-marea-teal/40 backdrop-blur-sm group-hover:border-marea-gold transition-colors">
              <Compass className="w-4 h-4 text-marea-gold" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-lg sm:text-xl tracking-[0.22em] uppercase font-light text-white drop-shadow-sm whitespace-nowrap">
                Marea Bay
              </span>
              <span className="hidden sm:inline-block text-[9px] uppercase tracking-[0.3em] text-marea-gold font-medium">
                Resort
              </span>
            </div>
          </Link>

          {/* 2. Desktop Navigation Links (Single Line, evenly spaced) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[11px] xl:text-xs uppercase tracking-[0.16em] font-medium text-white/90">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-1 transition-colors duration-200 whitespace-nowrap ${
                    isActive
                      ? "text-marea-gold font-semibold"
                      : "text-white/85 hover:text-marea-gold"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-marea-gold rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* 3. Actions (Theme Toggle & Sleek Book CTA) */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme mode"
                className="w-8 h-8 rounded-full flex items-center justify-center border border-white/20 bg-black/20 text-white/90 hover:text-marea-gold hover:border-marea-gold transition-all backdrop-blur-sm"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="w-3.5 h-3.5 text-marea-gold" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-white" />
                )}
              </button>
            )}

            {/* Direct Link to /book page */}
            <Link
              href="/book"
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-marea-gold via-[#DEBB74] to-marea-gold hover:to-[#B59149] text-marea-teal-dark font-semibold text-[11px] sm:text-xs uppercase tracking-[0.18em] shadow-gold-subtle hover:shadow-gold-glow transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
            >
              <Sparkles className="w-3 h-3 text-marea-teal-deep" />
              <span>Book Stay</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-8 h-8 rounded-full flex items-center justify-center border border-white/20 bg-black/20 text-white backdrop-blur-sm hover:border-marea-gold"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-marea-teal-dark/95 backdrop-blur-xl flex flex-col justify-between pt-24 pb-8 px-6 text-white animate-fade-in lg:hidden">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-marea-gold font-semibold">
              Explore Marea Bay
            </span>
            <div className="flex flex-col divide-y divide-white/10 font-serif text-lg">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 flex items-center justify-between text-white/90 hover:text-marea-gold transition-colors"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-marea-gold/60" />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-marea-gold/20">
            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-full bg-marea-gold text-marea-teal-dark font-medium text-xs uppercase tracking-[0.2em] shadow-gold-subtle flex items-center justify-center gap-2"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Your Stay</span>
            </Link>
            <div className="flex items-center justify-between text-[11px] text-white/60">
              <span>Costa Pacifica</span>
              <span>+1 (800) 842-MAREA</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
