"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2, Compass } from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  category: "architecture" | "villas" | "shoreline" | "gastronomy" | "wellness";
  categoryLabel: string;
  url: string;
  heightClass: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Twilight Cantilevered Infinity Pool over Marea Bay",
    category: "architecture",
    categoryLabel: "Architecture",
    url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=85",
    heightClass: "h-36 sm:h-72 md:h-96",
  },
  {
    id: 2,
    title: "The Azure Villa Private Oceanfront Plunge Deck",
    category: "villas",
    categoryLabel: "Villas & Suites",
    url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85",
    heightClass: "h-36 sm:h-72 md:h-80",
  },
  {
    id: 3,
    title: "Secluded White Sand Shoreline & Coral Reef",
    category: "shoreline",
    categoryLabel: "Shoreline",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85",
    heightClass: "h-36 sm:h-72 md:h-96",
  },
  {
    id: 4,
    title: "L'Horizon Clifftop Dining Terrace at Sunset",
    category: "gastronomy",
    categoryLabel: "Gastronomy",
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85",
    heightClass: "h-36 sm:h-72 md:h-80",
  },
  {
    id: 5,
    title: "Open-Air Cedar Thalassotherapy Pavilion",
    category: "wellness",
    categoryLabel: "Spa & Wellness",
    url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=85",
    heightClass: "h-36 sm:h-72 md:h-88",
  },
  {
    id: 6,
    title: "Clifftop Penthouse 270-Degree Horizon Suite",
    category: "villas",
    categoryLabel: "Villas & Suites",
    url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85",
    heightClass: "h-36 sm:h-72 md:h-96",
  },
  {
    id: 7,
    title: "Private Starlight Candlelit Beach Dinner",
    category: "gastronomy",
    categoryLabel: "Gastronomy",
    url: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=85",
    heightClass: "h-36 sm:h-72 md:h-80",
  },
  {
    id: 8,
    title: "54-Foot Sailing Catamaran at Anchor",
    category: "shoreline",
    categoryLabel: "Shoreline",
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85",
    heightClass: "h-36 sm:h-72 md:h-96",
  },
  {
    id: 9,
    title: "Sanctuary Garden Tropical Rain Courtyard",
    category: "architecture",
    categoryLabel: "Architecture",
    url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85",
    heightClass: "h-36 sm:h-72 md:h-88",
  },
  {
    id: 10,
    title: "Bespoke Beachfront Coral Suite Interiors",
    category: "villas",
    categoryLabel: "Villas & Suites",
    url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=85",
    heightClass: "h-36 sm:h-72 md:h-80",
  },
  {
    id: 11,
    title: "Heated Deep Seawater Vitality Pool",
    category: "wellness",
    categoryLabel: "Spa & Wellness",
    url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&q=85",
    heightClass: "h-36 sm:h-72 md:h-96",
  },
  {
    id: 12,
    title: "Handcrafted Rattan & Native Teak Architectural Elements",
    category: "architecture",
    categoryLabel: "Architecture",
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85",
    heightClass: "h-36 sm:h-72 md:h-80",
  },
];

export function GalleryClient() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filters = [
    { id: "all", label: "All Collections" },
    { id: "architecture", label: "Architecture" },
    { id: "villas", label: "Villas & Suites" },
    { id: "shoreline", label: "Shoreline & Ocean" },
    { id: "gastronomy", label: "Gastronomy" },
    { id: "wellness", label: "Spa & Wellness" },
  ];

  const filtered = galleryItems.filter((item) => {
    if (activeFilter === "all") return true;
    return item.category === activeFilter;
  });

  const handleNext = () => {
    if (lightboxIdx !== null) {
      setLightboxIdx((lightboxIdx + 1) % filtered.length);
    }
  };

  const handlePrev = () => {
    if (lightboxIdx !== null) {
      setLightboxIdx((lightboxIdx - 1 + filtered.length) % filtered.length);
    }
  };

  return (
    <div className="space-y-10">
      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-all whitespace-nowrap ${
              activeFilter === f.id
                ? "bg-marea-gold text-marea-teal-dark shadow-gold-subtle"
                : "bg-white dark:bg-marea-teal/40 text-neutral-600 dark:text-neutral-300 hover:text-marea-gold border border-marea-gold/20"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Masonry / Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
        {filtered.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setLightboxIdx(index)}
            className={`group relative ${item.heightClass} rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-lg border border-marea-gold/20 hover:border-marea-gold transition-all duration-500`}
          >
            <Image
              src={item.url}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

            <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 text-white transform translate-y-1 group-hover:translate-y-0 transition-transform">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-marea-gold font-medium block truncate">
                {item.categoryLabel}
              </span>
              <h3 className="font-serif text-xs sm:text-base md:text-lg font-light leading-snug line-clamp-1">
                {item.title}
              </h3>
            </div>

            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/80 group-hover:text-marea-gold border border-white/20 transition-colors">
              <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal with Crossfade */}
      {lightboxIdx !== null && filtered[lightboxIdx] && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 md:p-8 animate-fade-in">
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white pb-3 border-b border-white/15">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-marea-gold block">
                {filtered[lightboxIdx].categoryLabel} • {lightboxIdx + 1} of{" "}
                {filtered.length}
              </span>
              <h4 className="font-serif text-lg font-light">
                {filtered[lightboxIdx].title}
              </h4>
            </div>

            <button
              onClick={() => setLightboxIdx(null)}
              className="w-9 h-9 rounded-full border border-white/20 hover:border-marea-gold flex items-center justify-center text-white hover:text-marea-gold transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Central Image */}
          <div className="relative flex-1 my-4 flex items-center justify-center">
            <div className="relative w-full h-full max-w-5xl max-h-[75vh]">
              <Image
                src={filtered[lightboxIdx].url}
                alt={filtered[lightboxIdx].title}
                fill
                priority
                className="object-contain"
                sizes="100vw"
              />
            </div>

            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 text-white flex items-center justify-center transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 text-white flex items-center justify-center transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto justify-center pt-2">
            {filtered.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setLightboxIdx(idx)}
                className={`relative w-16 h-12 rounded-md overflow-hidden shrink-0 border-2 transition-all ${
                  idx === lightboxIdx
                    ? "border-marea-gold scale-105"
                    : "border-transparent opacity-40 hover:opacity-100"
                }`}
              >
                <Image src={item.url} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
