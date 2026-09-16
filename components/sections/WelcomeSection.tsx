"use client";

import React from "react";
import Image from "next/image";
import { Compass, Waves, SunMedium, Award } from "lucide-react";

export function WelcomeSection() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-marea-sand-light dark:bg-marea-teal-night transition-colors duration-500 overflow-hidden relative">
      {/* Background Subtle Water Mark */}
      <div className="absolute top-1/2 -right-40 -translate-y-1/2 w-96 h-96 rounded-full border border-marea-gold/10 pointer-events-none" />
      <div className="absolute top-1/2 -right-28 -translate-y-1/2 w-72 h-72 rounded-full border border-marea-gold/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Editorial Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2.5">
              <Compass className="w-4 h-4 text-marea-gold" />
              <span className="text-xs uppercase tracking-[0.3em] text-marea-gold font-medium">
                The Marea Bay Philosophy
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-marea-teal dark:text-white leading-[1.15] tracking-wide">
              An Architectural Ode to the Untamed Pacific Ocean
            </h2>

            {/* Gold Accent Divider Line */}
            <div className="flex items-center gap-3 pt-1">
              <span className="w-14 h-[1.5px] bg-marea-gold" />
              <span className="w-2 h-2 rounded-full bg-marea-gold" />
              <span className="w-6 h-[1.5px] bg-marea-gold/50" />
            </div>

            <p className="text-base sm:text-lg text-marea-teal/80 dark:text-marea-sand/80 font-light leading-relaxed pt-2">
              Conceived as a secluded sanctuary where dramatic limestone cliffs meet the whispering rhythm of turquoise tides, Marea Bay Resort harmonizes barefoot luxury with profound serenity. Each oceanfront villa and suite is meticulously oriented to capture the Pacific breeze, uninterrupted horizon horizons, and golden hour light.
            </p>

            <p className="text-sm text-marea-teal/70 dark:text-marea-sand/70 font-light leading-relaxed">
              Here, unhurried time becomes the ultimate indulgence. Indulge in private ocean-to-table culinary journeys, thalassotherapy rituals infused with native marine botanicals, and bespoke yacht excursions across crystalline marine reserves.
            </p>

            {/* Core Resort Badges */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-marea-gold/25">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-marea-gold">
                  <Award className="w-4 h-4" />
                  <span className="font-serif text-2xl font-light">5-Star</span>
                </div>
                <p className="text-[11px] uppercase tracking-wider text-marea-teal/60 dark:text-marea-sand/60">
                  Forbes Luxury Guide 2025
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-marea-gold">
                  <Waves className="w-4 h-4" />
                  <span className="font-serif text-2xl font-light">1.8 km</span>
                </div>
                <p className="text-[11px] uppercase tracking-wider text-marea-teal/60 dark:text-marea-sand/60">
                  Private Beachfront
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-marea-gold">
                  <SunMedium className="w-4 h-4" />
                  <span className="font-serif text-2xl font-light">100%</span>
                </div>
                <p className="text-[11px] uppercase tracking-wider text-marea-teal/60 dark:text-marea-sand/60">
                  Solar & Marine Neutral
                </p>
              </div>
            </div>
          </div>

          {/* Luxury Imagery Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[480px] sm:h-[540px] w-full rounded-3xl overflow-hidden shadow-2xl border border-marea-gold/30">
              <Image
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85"
                alt="Marea Bay oceanfront infinity villa"
                fill
                className="object-cover object-center filter contrast-[1.03]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-marea-teal-dark/60 via-transparent to-transparent" />
            </div>

            {/* Overlapping Floating Inset Card */}
            <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-8 max-w-xs p-5 rounded-2xl glass-teal-luxury text-white shadow-teal-deep border border-marea-gold/40">
              <span className="text-[10px] uppercase tracking-[0.25em] text-marea-gold font-medium block mb-1">
                Sanctuary Highlights
              </span>
              <p className="font-serif text-base font-light italic leading-snug">
                &ldquo;Where mornings begin with sunrise yoga over the breakers and evenings dissolve into champagne under the stars.&rdquo;
              </p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10 text-[10px] text-white/70">
                <span>The Pacific Pavilion</span>
                <span className="text-marea-gold">Costa Pacifica</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
