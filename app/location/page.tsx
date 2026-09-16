import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LocationSection } from "@/components/sections/LocationSection";
import {
  Compass,
  Plane,
  Ship,
  Car,
  MapPin,
  Anchor,
  Sun,
  Waves,
  ShieldCheck,
} from "lucide-react";

export const metadata = {
  title: "Destination & Getting Here | Marea Bay Resort",
  description:
    "Plan your arrival to Marea Bay Resort. Accessible via scenic 40-minute private seaplane flight, private deepwater yacht marina, or luxury chauffeur service.",
};

export default function LocationPage() {
  return (
    <div className="min-h-screen bg-marea-sand-light dark:bg-marea-teal-night flex flex-col justify-between">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-marea-gold font-medium">
            <Anchor className="w-4 h-4" />
            <span>Nautical Coordinates: 9° 32&apos; N, 84° 17&apos; W</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-marea-teal dark:text-white tracking-wide">
            Arrival at Marea Bay
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-light max-w-xl mx-auto">
            A secluded private peninsula jutting into the crystalline waters of Costa Pacifica. Accessible only by private seaplane, private yacht, or gated mountain chauffeur pass.
          </p>
        </div>

        {/* Re-use our interactive nautical cartographic map */}
        <LocationSection />

        {/* Climate & Biosphere Facts Strip - 2-col on mobile */}
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 mt-6 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-6">
          <div className="p-3 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-marea-teal/40 border border-marea-gold/25 shadow-xs space-y-1 sm:space-y-2">
            <div className="flex items-center gap-1.5 text-marea-gold">
              <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-serif text-sm sm:text-lg font-medium">28°C / 82°F</span>
            </div>
            <h3 className="font-serif text-xs sm:text-base font-light text-marea-teal dark:text-white leading-tight">
              Year-Round Microclimate
            </h3>
            <p className="text-[10px] sm:text-xs text-neutral-500 font-light leading-relaxed">
              Sheltered by coastal mountain ridges that buffer trade winds, enjoying calm lagoon waters.
            </p>
          </div>

          <div className="p-3 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-marea-teal/40 border border-marea-gold/25 shadow-xs space-y-1 sm:space-y-2">
            <div className="flex items-center gap-1.5 text-marea-gold">
              <Waves className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-serif text-sm sm:text-lg font-medium">UNESCO Biosphere</span>
            </div>
            <h3 className="font-serif text-xs sm:text-base font-light text-marea-teal dark:text-white leading-tight">
              Protected Coral Reef
            </h3>
            <p className="text-[10px] sm:text-xs text-neutral-500 font-light leading-relaxed">
              Our 1.8km beach is contiguous with healthy coral home to turtles and dolphin pods.
            </p>
          </div>

          <div className="col-span-2 sm:col-span-1 p-3 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-marea-teal/40 border border-marea-gold/25 shadow-xs space-y-1 sm:space-y-2">
            <div className="flex items-center gap-1.5 text-marea-gold">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-serif text-sm sm:text-lg font-medium">Full Seclusion</span>
            </div>
            <h3 className="font-serif text-xs sm:text-base font-light text-marea-teal dark:text-white leading-tight">
              Private Gated Peninsula
            </h3>
            <p className="text-[10px] sm:text-xs text-neutral-500 font-light leading-relaxed">
              Zero public vehicle access. Complete discretion and VIP private seaplane & yacht customs clearance.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
