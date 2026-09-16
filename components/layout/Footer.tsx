"use client";

import React from "react";
import Link from "next/link";
import {
  Compass,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  ArrowUp,
  ShieldCheck,
  Award,
} from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#051516] text-marea-sand-light border-t border-marea-gold/25 pt-20 pb-12 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Brand & Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Col 1 & 2: Brand Story */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-marea-gold flex items-center justify-center bg-marea-teal/40">
                <Compass className="w-5 h-5 text-marea-gold" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl tracking-[0.2em] font-light uppercase text-white">
                  Marea Bay
                </span>
                <span className="text-[10px] uppercase tracking-[0.35em] text-marea-gold font-medium">
                  Resort & Sanctuary
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-marea-sand/70 font-light leading-relaxed max-w-sm">
              An intimate coastal refuge etched into the limestone cliffs of Costa Pacifica. Dedicated to unparalleled barefoot luxury, sustainable marine conservation, and unforgettable horizons.
            </p>

            <div className="flex items-center gap-3 text-white/80">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-white/20 hover:border-marea-gold flex items-center justify-center hover:text-marea-gold transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-white/20 hover:border-marea-gold flex items-center justify-center hover:text-marea-gold transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full border border-white/20 hover:border-marea-gold flex items-center justify-center hover:text-marea-gold transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Accommodations Quick Links */}
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-marea-gold font-medium block">
              Accommodations
            </span>
            <ul className="space-y-2.5 text-xs text-marea-sand/80 font-light">
              <li>
                <a href="#suites" className="hover:text-marea-gold transition-colors">
                  The Azure Oceanfront Villa
                </a>
              </li>
              <li>
                <a href="#suites" className="hover:text-marea-gold transition-colors">
                  The Clifftop Sunset Penthouse
                </a>
              </li>
              <li>
                <a href="#suites" className="hover:text-marea-gold transition-colors">
                  Beachfront Coral Suite
                </a>
              </li>
              <li>
                <a href="#suites" className="hover:text-marea-gold transition-colors">
                  The Sanctuary Garden Pavilion
                </a>
              </li>
              <li>
                <a href="#suites" className="hover:text-marea-gold transition-colors">
                  Coastal Bay Master Suite
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Sanctuary Experiences */}
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-marea-gold font-medium block">
              Experiences
            </span>
            <ul className="space-y-2.5 text-xs text-marea-sand/80 font-light">
              <li>
                <a href="#experiences" className="hover:text-marea-gold transition-colors">
                  The Coral Thalassotherapy Spa
                </a>
              </li>
              <li>
                <a href="#experiences" className="hover:text-marea-gold transition-colors">
                  L&apos;Horizon Clifftop Dining
                </a>
              </li>
              <li>
                <a href="#experiences" className="hover:text-marea-gold transition-colors">
                  Sunset Catamaran Charters
                </a>
              </li>
              <li>
                <a href="#experiences" className="hover:text-marea-gold transition-colors">
                  Bioluminescent Night Dives
                </a>
              </li>
              <li>
                <Link href="/manage-booking" className="text-marea-gold font-medium hover:underline">
                  Find & Manage Reservation
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Concierge Contact */}
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-marea-gold font-medium block">
              Concierge Desk
            </span>
            <div className="space-y-3 text-xs text-marea-sand/80 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-marea-gold shrink-0 mt-0.5" />
                <span>Punta Marea Peninsula, KM 14, Costa Pacifica</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-marea-gold shrink-0" />
                <span>+1 (800) 842-MAREA (6273)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-marea-gold shrink-0" />
                <span>concierge@mareabayresort.com</span>
              </div>
              <div className="pt-2 text-[11px] text-white/50">
                <span>VHF Marine Channel: 16 / 68</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Certifications & Awards Banner */}
        <div className="pt-10 pb-8 border-y border-white/10 flex flex-wrap items-center justify-between gap-6 text-xs text-marea-sand/70">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-marea-gold" />
            <span>Forbes Five-Star Designated Resort 2025</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-marea-gold" />
            <span>Certified Climate Neutral & Coral Restoration Partner</span>
          </div>
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-marea-gold" />
            <span>Member of The World&apos;s Most Prestigious Independent Lodges</span>
          </div>
        </div>

        {/* Bottom Legal Strip & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 pt-2">
          <div>
            <p>
              &copy; {new Date().getFullYear()} Marea Bay Resort & Sanctuary. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-marea-gold hover:text-marea-gold-hover transition-colors text-[11px] uppercase tracking-wider font-medium"
            >
              <span>Return to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
