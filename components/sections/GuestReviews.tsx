"use client";

import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, Award } from "lucide-react";

interface Review {
  id: number;
  quote: string;
  author: string;
  title: string;
  location: string;
  stayedSuite: string;
  stayDate: string;
}

const reviews: Review[] = [
  {
    id: 1,
    quote:
      "Marea Bay redefines the standard of coastal seclusion. Watching the twilight tide from our private plunge pool as the butler poured chilled champagne was one of the most serene moments of our lives. Flawlessly understated luxury.",
    author: "Caroline & Julian Sterling",
    title: "Forbes Travel Guide Luxury Contributor",
    location: "London, United Kingdom",
    stayedSuite: "The Azure Oceanfront Villa",
    stayDate: "Stayed January 2026",
  },
  {
    id: 2,
    quote:
      "The architecture here respects the topography rather than conquering it. The clifftop dining at L'Horizon paired with ocean breeze and hyper-local coastal cuisine was equal to any three-star table in Paris.",
    author: "Henri Duprès",
    title: "Private Collector & Sommelier",
    location: "Bordeaux, France",
    stayedSuite: "The Clifftop Sunset Penthouse",
    stayDate: "Stayed November 2025",
  },
  {
    id: 3,
    quote:
      "Barefoot sophistication at its purest. You awaken to the rhythmic crest of turquoise swells and step straight onto powder sand without encountering a soul. Truly an oceanfront sanctuary beyond distinction.",
    author: "Victoria & David Chen",
    title: "Architectural Digest Feature Guest",
    location: "San Francisco, California",
    stayedSuite: "Beachfront Coral Suite",
    stayDate: "Stayed February 2026",
  },
];

export function GuestReviews() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const nextReview = () => {
    setCurrent((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="py-24 md:py-36 bg-marea-sand dark:bg-marea-teal-night transition-colors duration-500 overflow-hidden relative">
      {/* Background Stylized Compass Accent */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 opacity-5 dark:opacity-10 text-marea-gold pointer-events-none">
        <Quote className="w-96 h-96" />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center relative z-10">
        {/* Five Star Luxury Rating Indicator */}
        <div className="flex items-center justify-center gap-1.5 mb-8">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-5 h-5 fill-marea-gold text-marea-gold drop-shadow-sm"
            />
          ))}
        </div>

        {/* Dynamic Rotating Quote Box */}
        <div className="min-h-[260px] md:min-h-[220px] flex items-center justify-center">
          {reviews.map((rev, index) => {
            const isActive = index === current;
            return (
              <div
                key={rev.id}
                className={`transition-opacity duration-700 ease-in-out ${
                  isActive ? "opacity-100 block" : "opacity-0 hidden"
                }`}
              >
                <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light italic leading-relaxed text-marea-teal dark:text-marea-sand-light max-w-4xl mx-auto">
                  &ldquo;{rev.quote}&rdquo;
                </blockquote>

                <div className="mt-8 space-y-1">
                  <p className="font-serif text-lg font-medium text-marea-gold tracking-wide">
                    {rev.author}
                  </p>
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                    {rev.title} • {rev.location}
                  </p>
                  <p className="text-[11px] text-marea-gold/80 italic font-serif pt-1">
                    {rev.stayedSuite} ({rev.stayDate})
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Control Dots & Arrows */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={prevReview}
            aria-label="Previous guest review"
            className="w-10 h-10 rounded-full border border-marea-gold/40 hover:border-marea-gold text-marea-teal dark:text-white hover:text-marea-gold flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                aria-label={`Go to review ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-500 ${
                  idx === current ? "w-8 bg-marea-gold" : "w-2 bg-marea-gold/30"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextReview}
            aria-label="Next guest review"
            className="w-10 h-10 rounded-full border border-marea-gold/40 hover:border-marea-gold text-marea-teal dark:text-white hover:text-marea-gold flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Luxury Accolades Ribbon */}
        <div className="mt-16 pt-10 border-t border-marea-gold/25 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-xs uppercase tracking-widest text-marea-teal/70 dark:text-marea-sand/70">
          <div className="space-y-1">
            <span className="font-serif text-lg font-light text-marea-gold block">
              Forbes 5-Star
            </span>
            <span>Official 2025 Rating</span>
          </div>
          <div className="space-y-1">
            <span className="font-serif text-lg font-light text-marea-gold block">
              Condé Nast
            </span>
            <span>Gold List #1 Resort</span>
          </div>
          <div className="space-y-1">
            <span className="font-serif text-lg font-light text-marea-gold block">
              Travel + Leisure
            </span>
            <span>World&apos;s Best Award</span>
          </div>
          <div className="space-y-1">
            <span className="font-serif text-lg font-light text-marea-gold block">
              Ocean Biosphere
            </span>
            <span>Certified Sustainable</span>
          </div>
        </div>
      </div>
    </section>
  );
}
