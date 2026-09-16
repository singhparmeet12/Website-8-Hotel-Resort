"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Utensils,
  Clock,
  Sparkles,
  LayoutGrid,
  List,
  Search,
  X,
  Wine,
  Flame,
  ArrowRight,
} from "lucide-react";

export interface DiningVenue {
  name: string;
  tagline: string;
  hours: string;
  dressCode: string;
  image: string;
  description: string;
  sampleDishes: string[];
}

interface DiningClientProps {
  venues: DiningVenue[];
}

export function DiningClient({ venues }: DiningClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "editorial">("grid");

  const filteredVenues = useMemo(() => {
    if (!searchQuery.trim()) return venues;
    const q = searchQuery.toLowerCase();
    return venues.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.tagline.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.dressCode.toLowerCase().includes(q) ||
        v.sampleDishes.some((d) => d.toLowerCase().includes(q))
    );
  }, [venues, searchQuery]);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Search & Mode Bar */}
      <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-marea-teal/40 border border-marea-gold/30 shadow-sm flex flex-col sm:flex-row gap-2 items-center justify-between">
        {/* Search */}
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-marea-gold" />
          <input
            type="text"
            placeholder="Search dining, dishes (lobster, tuna, wine, caviar...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-1.5 sm:py-2 rounded-xl border border-marea-gold/30 bg-marea-sand-light/50 dark:bg-marea-teal/50 text-xs text-marea-teal dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-marea-gold"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-marea-gold"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-3 text-xs">
          <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
            Showing <strong>{filteredVenues.length}</strong> Venues
          </span>
          <div className="flex items-center gap-1 bg-marea-sand dark:bg-white/5 p-0.5 rounded-lg border border-marea-gold/20">
            <button
              onClick={() => setViewMode("grid")}
              aria-label="Grid View"
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "grid"
                  ? "bg-marea-gold text-marea-teal-dark font-medium shadow-xs"
                  : "text-neutral-500 hover:text-marea-gold"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode("editorial")}
              aria-label="Editorial View"
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "editorial"
                  ? "bg-marea-gold text-marea-teal-dark font-medium shadow-xs"
                  : "text-neutral-500 hover:text-marea-gold"
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 1. COMPACT RESPONSIVE GRID (2-Col on Mobile/Tablet for Less Scrolling) */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
          {filteredVenues.map((venue) => (
            <div
              key={venue.name}
              className="group rounded-2xl overflow-hidden bg-white dark:bg-marea-teal/40 border border-marea-gold/25 hover:border-marea-gold shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-28 sm:h-48 w-full overflow-hidden bg-neutral-200">
                  <Image
                    src={venue.image}
                    alt={venue.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-2 left-2 z-10">
                    <span className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider bg-marea-teal/90 text-marea-gold border border-marea-gold/30 font-semibold backdrop-blur-xs">
                      {venue.dressCode}
                    </span>
                  </div>
                  <div className="absolute bottom-2 left-2.5 right-2.5 z-10 text-white">
                    <span className="text-[9px] text-marea-gold/90 font-medium block truncate">
                      {venue.hours}
                    </span>
                    <h3 className="font-serif text-sm sm:text-lg font-light leading-snug line-clamp-1">
                      {venue.name}
                    </h3>
                  </div>
                </div>

                <div className="p-2.5 sm:p-4 space-y-2">
                  <p className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-300 font-light line-clamp-2 leading-relaxed">
                    {venue.description}
                  </p>

                  {/* Sample Dishes */}
                  <div className="pt-1 space-y-1">
                    <span className="text-[9px] uppercase tracking-wider text-marea-gold font-semibold block">
                      Signature Dishes:
                    </span>
                    {venue.sampleDishes.slice(0, 2).map((dish, i) => (
                      <div
                        key={i}
                        className="text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center gap-1 truncate"
                      >
                        <Utensils className="w-2.5 h-2.5 text-marea-gold shrink-0" />
                        <span className="truncate">{dish}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-2.5 sm:p-4 pt-0">
                <Link
                  href="/book"
                  className="w-full block py-1.5 rounded-full bg-marea-gold text-marea-teal-dark text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-center shadow-gold-subtle hover:scale-102 transition-all"
                >
                  Reserve Table
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. EDITORIAL STORY VIEW */}
      {viewMode === "editorial" && (
        <div className="space-y-6 sm:space-y-12">
          {filteredVenues.map((venue, idx) => {
            const isImageLeft = idx % 2 === 0;
            return (
              <div
                key={venue.name}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-center p-4 sm:p-8 rounded-3xl bg-white dark:bg-marea-teal/40 border border-marea-gold/30 shadow-md"
              >
                <div
                  className={`lg:col-span-6 relative h-48 sm:h-80 w-full rounded-2xl overflow-hidden ${
                    isImageLeft ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <Image
                    src={venue.image}
                    alt={venue.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest bg-marea-teal text-marea-gold border border-marea-gold/40 font-semibold">
                    {venue.dressCode}
                  </div>
                </div>

                <div
                  className={`lg:col-span-6 space-y-3 sm:space-y-4 ${
                    isImageLeft ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div>
                    <span className="text-xs text-marea-gold font-medium block">
                      {venue.hours}
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-light text-marea-teal dark:text-white mt-0.5">
                      {venue.name}
                    </h2>
                    <p className="text-xs font-serif italic text-marea-gold/90 mt-0.5">
                      &ldquo;{venue.tagline}&rdquo;
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-light leading-relaxed">
                    {venue.description}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] uppercase tracking-wider text-marea-gold font-semibold block">
                      Signature Selections
                    </span>
                    <div className="space-y-1 text-xs text-neutral-600 dark:text-neutral-300 font-light">
                      {venue.sampleDishes.map((dish, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Sparkles className="w-3 h-3 text-marea-gold shrink-0" />
                          <span>{dish}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/book"
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-marea-gold text-marea-teal-dark text-xs uppercase tracking-wider font-semibold shadow-gold-subtle hover:bg-marea-gold-hover transition-colors"
                    >
                      <span>Inquire Table</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
