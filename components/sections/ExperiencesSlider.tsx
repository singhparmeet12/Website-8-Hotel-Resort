"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Compass, Sparkles } from "lucide-react";

interface Experience {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  tag: string;
}

const experiences: Experience[] = [
  {
    id: 1,
    category: "Wellness & Spa",
    title: "The Coral Thalassotherapy Spa",
    description: "Deep sea mineral baths, heated seawater pools, and restorative botanical body rituals performed in open-air clifftop pavilions.",
    imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=75",
    tag: "Signature Ritual",
  },
  {
    id: 2,
    category: "Gastronomy",
    title: "Clifftop Dining at L'Horizon",
    description: "Multi-course ocean-to-table tasting journeys paired with vintage grand crus, framed by dramatic 270-degree sunset ocean horizons.",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=75",
    tag: "Michelin Decorated",
  },
  {
    id: 3,
    category: "Marine Adventures",
    title: "Sunset Catamaran Charters",
    description: "Glide across secluded coastal coves on our 54-foot sailing catamaran with chilled vintage champagne, artisanal canapés, and personal skipper.",
    imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=75",
    tag: "Private Excursion",
  },
  {
    id: 4,
    category: "Leisure & Solitude",
    title: "Clifftop Cantilevered Pool",
    description: "Heated infinity waters suspended 120 feet over the crashing breakers, attended by dedicated cabana hosts offering iced citrus towels.",
    imageUrl: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=75",
    tag: "Panoramic Heights",
  },
  {
    id: 5,
    category: "Biosphere Sanctuary",
    title: "Bioluminescent Reef Diving",
    description: "Accompany our resident marine biologists on twilight snorkel tours exploring our protected coral biosphere as the sea illuminates with living light.",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=75",
    tag: "Eco Sanctuary",
  },
  {
    id: 6,
    category: "Private Moments",
    title: "Starlight Shoreline Beach Dinners",
    description: "Barefoot dining at a private candlelit table carved directly into the white sand, complete with dedicated private chef and acoustic strings.",
    imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=75",
    tag: "Bespoke Romance",
  },
];

export function ExperiencesSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -420 : 420;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      id="experiences"
      className="py-12 md:py-36 bg-marea-sand-light dark:bg-marea-teal-night transition-colors duration-500 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-12">
        {/* Section Heading & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-14">
          <div className="space-y-1.5 sm:space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-marea-gold font-medium">
              <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Sanctuary Pursuits</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-marea-teal dark:text-white tracking-wide">
              Curated Coastal Experiences
            </h2>
            <p className="text-xs sm:text-base text-neutral-600 dark:text-neutral-300 font-light">
              Marine thalassotherapy, starlight yacht voyages, and twilight neon bioluminescent reef exploration.
            </p>
          </div>

          {/* Navigation Scroll Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll experiences left"
              className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-marea-gold/40 hover:border-marea-gold text-marea-teal dark:text-white hover:text-marea-gold flex items-center justify-center transition-colors hover:scale-105"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll experiences right"
              className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-marea-gold/40 hover:border-marea-gold text-marea-teal dark:text-white hover:text-marea-gold flex items-center justify-center transition-colors hover:scale-105"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Horizontally Scrolling Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-6 overflow-x-auto scrollbar-none pb-4 pt-1 snap-x snap-mandatory -mx-3 px-3 sm:-mx-6 sm:px-6 md:-mx-12 md:px-12 cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: "none" }}
        >
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="w-[220px] sm:w-[360px] md:w-[400px] shrink-0 snap-start group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white dark:bg-marea-teal/50 shadow-md border border-marea-gold/25 hover:border-marea-gold transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative h-[160px] sm:h-[320px] w-full overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                <Image
                  src={exp.imageUrl}
                  alt={exp.title}
                  fill
                  sizes="(max-width: 768px) 220px, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-marea-teal-dark via-black/20 to-transparent opacity-90" />

                {/* Badge Tag */}
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10">
                  <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[8px] sm:text-[10px] uppercase tracking-widest font-semibold bg-marea-teal/90 text-marea-gold border border-marea-gold/30 backdrop-blur-sm">
                    {exp.tag}
                  </span>
                </div>

                {/* Overlaid Title on Image */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 z-10 text-white">
                  <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] text-marea-gold font-medium block">
                    {exp.category}
                  </span>
                  <h3 className="font-serif text-sm sm:text-xl font-light leading-tight line-clamp-1">
                    {exp.title}
                  </h3>
                </div>
              </div>

              {/* Caption Description */}
              <div className="p-2.5 sm:p-5 space-y-2 sm:space-y-3">
                <p className="text-[10px] sm:text-xs text-neutral-600 dark:text-neutral-300 font-light leading-relaxed line-clamp-2">
                  {exp.description}
                </p>

                <div className="pt-2 border-t border-marea-gold/20 flex items-center justify-between text-[10px] sm:text-xs text-marea-gold">
                  <span className="uppercase tracking-wider font-medium text-[9px] sm:text-[10px]">
                    Reserve with Stay
                  </span>
                  <Sparkles className="w-3 h-3 text-marea-gold" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
