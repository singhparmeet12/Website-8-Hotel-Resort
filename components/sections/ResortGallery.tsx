"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2, Compass } from "lucide-react";

interface GalleryPhoto {
  id: number;
  title: string;
  category: string;
  url: string;
  span: string; // Tailwind grid span
}

const photos: GalleryPhoto[] = [
  {
    id: 1,
    title: "Twilight over the Clifftop Cantilevered Pool",
    category: "Architecture",
    url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=75",
    span: "col-span-12 md:col-span-8 h-[220px] sm:h-[320px] md:h-[420px]",
  },
  {
    id: 2,
    title: "The Secluded Sands of Marea Bay",
    category: "Shoreline",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=75",
    span: "col-span-6 md:col-span-4 h-[180px] sm:h-[280px] md:h-[420px]",
  },
  {
    id: 3,
    title: "Oceanfront Living Room Pavilion",
    category: "Interiors",
    url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=75",
    span: "col-span-6 md:col-span-4 h-[180px] sm:h-[280px] md:h-[380px]",
  },
  {
    id: 4,
    title: "Candlelit Evening Under the Palms",
    category: "Gastronomy",
    url: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=75",
    span: "col-span-6 md:col-span-4 h-[180px] sm:h-[280px] md:h-[380px]",
  },
  {
    id: 5,
    title: "Tropical Sanctuary Garden Spa",
    category: "Wellness",
    url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=75",
    span: "col-span-6 md:col-span-4 h-[180px] sm:h-[280px] md:h-[380px]",
  },
  {
    id: 6,
    title: "Sunset Voyage Across the Outer Archipelago",
    category: "Expeditions",
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=75",
    span: "col-span-12 md:col-span-7 h-[200px] sm:h-[300px] md:h-[400px]",
  },
  {
    id: 7,
    title: "Organic Woven Rattan & Stone Details",
    category: "Craftsmanship",
    url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=75",
    span: "col-span-12 md:col-span-5 h-[200px] sm:h-[300px] md:h-[400px]",
  },
];

export function ResortGallery() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % photos.length);
    }
  };

  const handlePrev = () => {
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx - 1 + photos.length) % photos.length);
    }
  };

  return (
    <section
      id="gallery"
      className="py-12 md:py-28 px-3 sm:px-6 lg:px-12 bg-white dark:bg-marea-teal-dark transition-colors duration-500 relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-marea-gold font-medium">
            <Compass className="w-4 h-4" />
            <span>Visual Journey</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-marea-teal dark:text-white tracking-wide">
            The Marea Bay Gallery
          </h2>
          <p className="text-xs sm:text-base text-neutral-600 dark:text-neutral-300 font-light max-w-lg mx-auto">
            A window into our secluded Pacific paradise — where architectural elegance meets pristine coastal wonders.
          </p>
        </div>

        {/* Refined Offset Masonry Grid */}
        <div className="grid grid-cols-12 gap-2.5 sm:gap-5 md:gap-6">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setSelectedIdx(index)}
              className={`${photo.span} group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-lg border border-marea-gold/20 hover:border-marea-gold transition-all duration-500`}
            >
              <Image
                src={photo.url}
                alt={photo.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-marea-teal-dark/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Hover Details Card */}
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 flex items-end justify-between text-white transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <div>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-marea-gold font-medium block mb-0.5">
                    {photo.category}
                  </span>
                  <h3 className="font-serif text-sm sm:text-lg md:text-xl font-light leading-snug line-clamp-1">
                    {photo.title}
                  </h3>
                </div>
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:border-marea-gold text-white group-hover:text-marea-gold transition-colors shrink-0 ml-2">
                  <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Smooth Crossfade Lightbox Modal */}
      {selectedIdx !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 md:p-8 animate-fade-in">
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white pb-4 border-b border-white/15">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-marea-gold block">
                {photos[selectedIdx].category} • Photo {selectedIdx + 1} of {photos.length}
              </span>
              <h4 className="font-serif text-lg md:text-xl font-light">
                {photos[selectedIdx].title}
              </h4>
            </div>

            <button
              onClick={() => setSelectedIdx(null)}
              className="w-10 h-10 rounded-full border border-white/20 hover:border-marea-gold flex items-center justify-center text-white hover:text-marea-gold transition-colors"
              aria-label="Close photo lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Central Fullscreen Image with Crossfade */}
          <div className="relative flex-1 my-4 flex items-center justify-center">
            <div className="relative w-full h-full max-w-5xl max-h-[75vh]">
              <Image
                src={photos[selectedIdx].url}
                alt={photos[selectedIdx].title}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Left / Right Nav Arrows */}
            <button
              onClick={handlePrev}
              aria-label="Previous photo"
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 hover:border-marea-gold text-white flex items-center justify-center transition-all hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next photo"
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 hover:border-marea-gold text-white flex items-center justify-center transition-all hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="flex gap-2 overflow-x-auto justify-center pt-2">
            {photos.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setSelectedIdx(i)}
                className={`relative w-16 h-12 rounded-md overflow-hidden shrink-0 border-2 transition-all ${
                  i === selectedIdx
                    ? "border-marea-gold scale-105"
                    : "border-transparent opacity-50 hover:opacity-100"
                }`}
              >
                <Image src={p.url} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
