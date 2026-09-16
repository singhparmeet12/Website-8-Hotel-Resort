"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  X,
  Maximize2,
  Users,
  Bed,
  CheckCircle2,
  Eye,
  ArrowRight,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { RoomItem, RoomDetailModal } from "@/components/rooms/RoomDetailModal";

interface RoomsCatalogClientProps {
  rooms: RoomItem[];
}

export function RoomsCatalogClient({ rooms }: RoomsCatalogClientProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "detailed">("grid");
  const [previewModalRoom, setPreviewModalRoom] = useState<RoomItem | null>(null);
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All Residences" },
    { id: "oceanfront", label: "Oceanfront" },
    { id: "penthouse", label: "Penthouses" },
    { id: "beachfront", label: "Beachfront" },
    { id: "garden", label: "Garden Pavilions" },
  ];

  const quickFilterChips = [
    { id: "pool", label: "🏊 Plunge Pool", query: "plunge pool" },
    { id: "king", label: "👑 King Bed", query: "king" },
    { id: "butler", label: "🎩 Butler Service", query: "butler" },
    { id: "under1000", label: "✨ Under $1,000", query: "under1000" },
    { id: "ocean", label: "🌊 Oceanfront", query: "ocean" },
  ];

  // Filter & Search Logic
  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      // Category match
      let matchCat = true;
      if (activeCategory === "oceanfront") matchCat = room.slug.includes("oceanfront");
      else if (activeCategory === "penthouse") matchCat = room.slug.includes("penthouse");
      else if (activeCategory === "beachfront") matchCat = room.slug.includes("beachfront") || room.slug.includes("coastal");
      else if (activeCategory === "garden") matchCat = room.slug.includes("garden");

      if (!matchCat) return false;

      // Quick filter check
      if (activeQuickFilter === "under1000" && room.pricePerNight >= 1000) {
        return false;
      }
      if (activeQuickFilter === "pool") {
        const hasPool = room.amenities.some((a) => a.toLowerCase().includes("pool")) ||
          room.description.toLowerCase().includes("pool") ||
          room.name.toLowerCase().includes("pool");
        if (!hasPool) return false;
      }
      if (activeQuickFilter === "king") {
        const hasKing = room.bedConfig.toLowerCase().includes("king") ||
          room.amenities.some((a) => a.toLowerCase().includes("king"));
        if (!hasKing) return false;
      }
      if (activeQuickFilter === "butler") {
        const hasButler = room.amenities.some((a) => a.toLowerCase().includes("butler")) ||
          room.tagline.toLowerCase().includes("butler") ||
          room.description.toLowerCase().includes("butler");
        if (!hasButler) return false;
      }
      if (activeQuickFilter === "ocean") {
        const isOcean = room.viewType.toLowerCase().includes("ocean") ||
          room.name.toLowerCase().includes("ocean");
        if (!isOcean) return false;
      }

      // Search match
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const searchable = [
        room.name,
        room.tagline,
        room.description,
        room.viewType,
        room.bedConfig,
        ...room.amenities,
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(q);
    });
  }, [rooms, activeCategory, activeQuickFilter, searchQuery]);

  // Sorting Logic
  const sortedRooms = useMemo(() => {
    return [...filteredRooms].sort((a, b) => {
      if (sortBy === "price-low") return a.pricePerNight - b.pricePerNight;
      if (sortBy === "price-high") return b.pricePerNight - a.pricePerNight;
      if (sortBy === "size") return b.sizeSqFt - a.sizeSqFt;
      return 0;
    });
  }, [filteredRooms, sortBy]);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* 1. Sleek Search & Filter Control Center */}
      <div className="p-3 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-marea-teal/40 border border-marea-gold/30 shadow-md space-y-2.5 sm:space-y-3.5">
        {/* Search Bar Input */}
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-marea-gold" />
          <input
            type="text"
            placeholder="Search villas by name, plunge pool, ocean view, butler..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl border border-marea-gold/30 bg-marea-sand-light/50 dark:bg-marea-teal/50 text-xs sm:text-sm text-marea-teal dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-marea-gold"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-marea-gold p-1"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Quick Filter Chips for Mobile & Desktop */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[10px] sm:text-xs">
          <span className="text-[10px] uppercase tracking-wider text-marea-gold font-semibold shrink-0 hidden sm:inline">
            Quick Filters:
          </span>
          {quickFilterChips.map((chip) => {
            const isChipActive = activeQuickFilter === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => setActiveQuickFilter(isChipActive ? null : chip.id)}
                className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-all border ${
                  isChipActive
                    ? "bg-marea-gold text-marea-teal-dark border-marea-gold font-semibold shadow-xs"
                    : "bg-marea-sand/50 dark:bg-white/5 text-neutral-600 dark:text-neutral-300 border-marea-gold/20 hover:border-marea-gold"
                }`}
              >
                {chip.label}
              </button>
            );
          })}
          {(activeQuickFilter || searchQuery || activeCategory !== "all") && (
            <button
              onClick={() => {
                setActiveQuickFilter(null);
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="px-2 py-1 rounded-full text-red-500 hover:text-red-400 font-medium whitespace-nowrap text-[10px]"
            >
              Reset All
            </button>
          )}
        </div>

        {/* Category Pills & View Mode Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-marea-gold/15">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs uppercase tracking-wider font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? "bg-marea-gold text-marea-teal-dark shadow-gold-subtle font-semibold"
                    : "bg-marea-sand/70 dark:bg-white/5 text-neutral-600 dark:text-neutral-300 hover:text-marea-gold border border-marea-gold/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Right Controls: Sort & Grid View Toggle */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end text-xs pt-1 sm:pt-0">
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3 h-3 text-marea-gold shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-2 py-1 rounded-lg border border-marea-gold/30 bg-transparent text-marea-teal dark:text-white text-[10px] sm:text-[11px] font-medium focus:outline-none"
              >
                <option value="featured" className="bg-white dark:bg-marea-teal-dark">
                  Featured
                </option>
                <option value="price-low" className="bg-white dark:bg-marea-teal-dark">
                  Price &uarr;
                </option>
                <option value="price-high" className="bg-white dark:bg-marea-teal-dark">
                  Price &darr;
                </option>
                <option value="size" className="bg-white dark:bg-marea-teal-dark">
                  Area (Sq Ft)
                </option>
              </select>
            </div>

            {/* Grid / List Mode Toggle */}
            <div className="flex items-center gap-1 bg-marea-sand dark:bg-white/5 p-0.5 rounded-lg border border-marea-gold/20">
              <button
                onClick={() => setViewMode("grid")}
                aria-label="Grid View"
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === "grid"
                    ? "bg-marea-gold text-marea-teal-dark shadow-xs"
                    : "text-neutral-500 hover:text-marea-gold"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode("detailed")}
                aria-label="Detailed View"
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === "detailed"
                    ? "bg-marea-gold text-marea-teal-dark shadow-xs"
                    : "text-neutral-500 hover:text-marea-gold"
                }`}
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Counter & Search Tag */}
        <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
          <span>
            Showing <strong>{sortedRooms.length}</strong> of {rooms.length} Sanctuaries
          </span>
          {searchQuery && (
            <span className="text-marea-gold">
              Matching &ldquo;{searchQuery}&rdquo;
            </span>
          )}
        </div>
      </div>

      {/* 2. No Results Fallback */}
      {sortedRooms.length === 0 && (
        <div className="text-center py-12 p-8 rounded-3xl bg-white dark:bg-marea-teal/30 border border-dashed border-marea-gold/40 space-y-3">
          <p className="font-serif text-lg text-marea-teal dark:text-white">
            No sanctuaries match your criteria
          </p>
          <p className="text-xs text-neutral-500">
            Try adjusting your search keywords or switching category filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("all");
            }}
            className="px-4 py-2 rounded-full bg-marea-gold text-marea-teal-dark text-xs font-semibold uppercase tracking-wider"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* 3. OPTION A: COMPACT 2-COLUMN MOBILE GRID (Less Scrolling, More Content) */}
      {viewMode === "grid" && sortedRooms.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6">
          {sortedRooms.map((room) => (
            <div
              key={room.id}
              className="group rounded-2xl sm:rounded-3xl overflow-hidden bg-white dark:bg-marea-teal/40 border border-marea-gold/25 hover:border-marea-gold shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Compact Image with Quick View Trigger */}
                <div
                  onClick={() => setPreviewModalRoom(room)}
                  className="relative h-24 sm:h-48 w-full overflow-hidden bg-neutral-200 cursor-pointer"
                  title="Click to preview photos & floorplan"
                >
                  <Image
                    src={room.images[0] || ""}
                    alt={room.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Price Pill Over Image */}
                  <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-10 px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-marea-teal-dark/90 text-marea-gold text-[9px] sm:text-xs font-serif border border-marea-gold/30 backdrop-blur-xs font-medium">
                    {formatCurrency(room.pricePerNight)}
                    <span className="hidden sm:inline text-white/70"> / nt</span>
                  </div>

                  {/* Quick View Icon Hint */}
                  <div className="absolute top-1.5 left-1.5 z-10 hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 text-[10px] text-white/90 border border-white/20">
                    <Eye className="w-3 h-3 text-marea-gold" />
                    <span>Preview</span>
                  </div>

                  {/* Room Name on Image for compact viewing */}
                  <div className="absolute bottom-1.5 left-2 right-2 z-10 text-white">
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-marea-gold font-medium block truncate">
                      {room.viewType}
                    </span>
                    <h3 className="font-serif text-xs sm:text-base font-light leading-tight line-clamp-1">
                      {room.name}
                    </h3>
                  </div>
                </div>

                {/* Compact Specs Row */}
                <div className="p-2 sm:p-3.5 space-y-1 sm:space-y-2">
                  <div className="flex items-center justify-between text-[9px] sm:text-xs text-neutral-500 dark:text-neutral-400">
                    <span className="flex items-center gap-0.5 sm:gap-1 truncate">
                      <Maximize2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-marea-gold shrink-0" />
                      {room.sizeSqFt} sq ft
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5 sm:gap-1 shrink-0">
                      <Users className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-marea-gold shrink-0" />
                      {room.maxOccupancy} G
                    </span>
                  </div>

                  {/* Bed Config */}
                  <div className="text-[9px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center gap-1 truncate">
                    <Bed className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-marea-gold shrink-0" />
                    <span className="truncate">{room.bedConfig}</span>
                  </div>

                  {/* Amenities (Desktop only to save mobile height) */}
                  <div className="hidden sm:flex flex-wrap gap-1 pt-1">
                    {room.amenities.slice(0, 2).map((a, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-full text-[9px] bg-marea-sand dark:bg-white/5 border border-marea-gold/20 text-marea-teal dark:text-marea-sand truncate max-w-full"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Quick Action Pills */}
              <div className="p-2 sm:p-3.5 pt-0 flex items-center gap-1 sm:gap-1.5">
                <button
                  type="button"
                  onClick={() => setPreviewModalRoom(room)}
                  className="flex-1 py-1 sm:py-1.5 rounded-full border border-marea-gold/40 text-[9px] sm:text-[11px] font-semibold uppercase tracking-wider text-center text-marea-teal dark:text-white hover:text-marea-gold hover:border-marea-gold transition-colors"
                >
                  Specs
                </button>

                <Link
                  href={`/book?room=${room.id}`}
                  className="flex-1 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-marea-gold to-[#B59149] text-marea-teal-dark text-[9px] sm:text-[11px] font-semibold uppercase tracking-wider text-center shadow-gold-subtle hover:scale-102 transition-all font-sans"
                >
                  Book
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. OPTION B: DETAILED EDITORIAL VIEW */}
      {viewMode === "detailed" && sortedRooms.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedRooms.map((room) => (
            <div
              key={room.id}
              className="group rounded-3xl overflow-hidden bg-white dark:bg-marea-teal/40 border border-marea-gold/30 shadow-lg p-5 sm:p-6 space-y-4"
            >
              <div className="relative h-56 sm:h-72 w-full rounded-2xl overflow-hidden">
                <Image
                  src={room.images[0] || ""}
                  alt={room.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full glass-teal-luxury text-white text-xs font-serif">
                  <span className="text-marea-gold font-medium">
                    {formatCurrency(room.pricePerNight)}
                  </span>{" "}
                  / night
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-marea-gold font-medium">
                  {room.viewType}
                </span>
                <h3 className="font-serif text-2xl font-light text-marea-teal dark:text-white">
                  {room.name}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 font-light mt-1">
                  {room.description}
                </p>

                <div className="flex items-center gap-3 text-xs text-neutral-500 py-3 border-y border-marea-gold/15 mt-3">
                  <span>{room.sizeSqFt} sq ft</span>
                  <span>•</span>
                  <span>{room.bedConfig}</span>
                  <span>•</span>
                  <span>Up to {room.maxOccupancy} Guests</span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3">
                  {room.amenities.slice(0, 4).map((a, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-full text-[10px] bg-marea-sand dark:bg-white/5 border border-marea-gold/25"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <Link
                  href={`/rooms/${room.slug}`}
                  className="text-xs text-marea-gold hover:underline font-medium"
                >
                  Explore Complete Dossier &rarr;
                </Link>

                <Link
                  href={`/book?room=${room.id}`}
                  className="px-6 py-2.5 rounded-full bg-marea-gold text-marea-teal-dark text-xs uppercase tracking-wider font-semibold shadow-gold-subtle hover:scale-105 transition-all"
                >
                  Reserve Suite
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Preview Modal */}
      <RoomDetailModal
        room={previewModalRoom}
        isOpen={Boolean(previewModalRoom)}
        onClose={() => setPreviewModalRoom(null)}
        onBookThisRoom={(roomId) => {
          window.location.href = `/book?room=${roomId}`;
        }}
      />
    </div>
  );
}
