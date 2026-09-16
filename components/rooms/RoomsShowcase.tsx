"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Maximize2,
  Users,
  Bed,
  ArrowRight,
  Sparkles,
  Calendar,
  Eye,
  CheckCircle2,
  LayoutGrid,
  List,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { RoomDetailModal, RoomItem } from "./RoomDetailModal";

interface RoomsShowcaseProps {
  rooms: RoomItem[];
  onOpenBookingModal: (initialRoomId?: string) => void;
}

export function RoomsShowcase({ rooms, onOpenBookingModal }: RoomsShowcaseProps) {
  const [activeModalRoom, setActiveModalRoom] = useState<RoomItem | null>(null);
  const [homeViewMode, setHomeViewMode] = useState<"grid" | "editorial">("grid");

  return (
    <section
      id="suites"
      className="py-12 md:py-36 px-2.5 sm:px-6 md:px-12 bg-white dark:bg-marea-teal-dark transition-colors duration-500 relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-16 space-y-2 sm:space-y-4">
          <div className="inline-flex items-center gap-3">
            <span className="h-[1px] w-6 sm:w-8 bg-marea-gold" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-marea-gold font-medium">
              Accommodations
            </span>
            <span className="h-[1px] w-6 sm:w-8 bg-marea-gold" />
          </div>

          <h2 className="font-serif text-2xl sm:text-5xl md:text-6xl font-light text-marea-teal dark:text-white tracking-wide">
            Suites & Oceanfront Sanctuaries
          </h2>

          <p className="text-xs sm:text-base text-neutral-600 dark:text-neutral-300 font-light max-w-xl mx-auto">
            Bespoke pavilions crafted with native limestone, teak timbers, private plunge pools, and unobstructed Pacific horizons.
          </p>

          {/* Quick View Mode Switcher & Catalog Link */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-1 bg-marea-sand/70 dark:bg-white/5 p-1 rounded-full border border-marea-gold/30">
              <button
                onClick={() => setHomeViewMode("grid")}
                className={`px-3 py-1 rounded-full text-[10px] sm:text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 ${
                  homeViewMode === "grid"
                    ? "bg-marea-gold text-marea-teal-dark shadow-xs"
                    : "text-neutral-500 hover:text-marea-gold"
                }`}
              >
                <LayoutGrid className="w-3 h-3" />
                <span>2-Col Grid (Compact)</span>
              </button>
              <button
                onClick={() => setHomeViewMode("editorial")}
                className={`px-3 py-1 rounded-full text-[10px] sm:text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 ${
                  homeViewMode === "editorial"
                    ? "bg-marea-gold text-marea-teal-dark shadow-xs"
                    : "text-neutral-500 hover:text-marea-gold"
                }`}
              >
                <List className="w-3 h-3" />
                <span>Editorial Panels</span>
              </button>
            </div>

            <Link
              href="/rooms"
              className="text-[11px] sm:text-xs text-marea-gold hover:underline font-medium inline-flex items-center gap-1"
            >
              <span>Explore All 5 with Live Search</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* 1. COMPACT 2-COLUMN MOBILE GRID VIEW */}
        {homeViewMode === "grid" && (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6 mb-8 sm:mb-16">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="group rounded-2xl sm:rounded-3xl overflow-hidden bg-white dark:bg-marea-teal/40 border border-marea-gold/25 hover:border-marea-gold shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div
                    onClick={() => setActiveModalRoom(room)}
                    className="relative h-24 sm:h-48 w-full overflow-hidden bg-neutral-200 cursor-pointer"
                    title="Click to preview gallery"
                  >
                    <Image
                      src={room.images[0] || ""}
                      alt={room.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute top-1.5 right-1.5 z-10 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-marea-teal-dark/90 text-marea-gold text-[9px] sm:text-xs font-serif border border-marea-gold/30">
                      {formatCurrency(room.pricePerNight)}
                      <span className="hidden sm:inline text-white/70"> / nt</span>
                    </div>
                    <div className="absolute bottom-1.5 left-2 right-2 z-10 text-white">
                      <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-marea-gold font-medium block truncate">
                        {room.viewType}
                      </span>
                      <h3 className="font-serif text-xs sm:text-base font-light leading-tight line-clamp-1">
                        {room.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-2 sm:p-3.5 space-y-1 sm:space-y-1.5">
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

                    <p className="text-[10px] sm:text-xs text-neutral-600 dark:text-neutral-300 font-light line-clamp-2 leading-tight">
                      {room.tagline}
                    </p>
                  </div>
                </div>

                <div className="p-2 sm:p-3.5 pt-0 flex items-center gap-1 sm:gap-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveModalRoom(room)}
                    className="flex-1 py-1 sm:py-1.5 rounded-full border border-marea-gold/40 text-[9px] sm:text-[11px] font-semibold uppercase tracking-wider text-center text-marea-teal dark:text-white hover:text-marea-gold hover:border-marea-gold transition-colors"
                  >
                    Specs
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenBookingModal(room.id)}
                    className="flex-1 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-marea-gold to-[#B59149] text-marea-teal-dark text-[9px] sm:text-[11px] font-semibold uppercase tracking-wider text-center shadow-gold-subtle hover:scale-102 transition-all font-sans"
                  >
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. Alternating Panels (Editorial View) */}
        {homeViewMode === "editorial" && (
          <div className="space-y-12 md:space-y-32">
          {rooms.map((room, index) => {
            const isImageLeft = index % 2 === 0;

            return (
              <div
                key={room.id}
                className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
              >
                {/* Image Column */}
                <div
                  className={`lg:col-span-7 relative ${
                    isImageLeft ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="relative h-[360px] sm:h-[460px] md:h-[520px] w-full rounded-3xl overflow-hidden shadow-2xl border border-marea-gold/30 bg-neutral-200 dark:bg-neutral-900 group-hover:border-marea-gold transition-all duration-700">
                    <Image
                      src={room.images[0] || ""}
                      alt={room.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover object-center filter contrast-[1.03] group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-marea-teal-dark/60 via-transparent to-transparent" />

                    {/* Quick Specs Pill at Image Bottom */}
                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-10 text-white">
                      <div className="px-3.5 py-1.5 rounded-full glass-teal-luxury text-xs font-serif tracking-wider border border-marea-gold/40 flex items-center gap-2">
                        <Maximize2 className="w-3.5 h-3.5 text-marea-gold" />
                        <span>{room.sizeSqFt} sq ft</span>
                        <span className="text-marea-gold">•</span>
                        <span>{room.bedConfig}</span>
                      </div>

                      <button
                        onClick={() => setActiveModalRoom(room)}
                        className="px-3.5 py-1.5 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-xs text-white/90 hover:text-marea-gold transition-colors flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5 text-marea-gold" />
                        <span>View Gallery ({room.images.length})</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Text Content Column */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    isImageLeft ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-marea-gold font-medium">
                      <span>Vantage: {room.viewType}</span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-marea-teal dark:text-white leading-tight">
                      {room.name}
                    </h3>

                    <p className="text-sm font-serif italic text-marea-gold/90 dark:text-marea-gold-light">
                      &ldquo;{room.tagline}&rdquo;
                    </p>
                  </div>

                  <p className="text-sm text-neutral-600 dark:text-neutral-300 font-light leading-relaxed">
                    {room.description}
                  </p>

                  {/* Amenities Badges */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[11px] uppercase tracking-wider text-neutral-400 block font-medium">
                      Featured Inclusions
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.slice(0, 4).map((amenity, aIdx) => (
                        <span
                          key={aIdx}
                          className="px-3 py-1 rounded-full text-xs bg-marea-sand dark:bg-white/5 border border-marea-gold/25 text-marea-teal dark:text-marea-sand-light font-light flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3 h-3 text-marea-gold" />
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-6 border-t border-marea-gold/25 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">
                        From
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-serif text-2xl md:text-3xl text-marea-gold font-light">
                          {formatCurrency(room.pricePerNight)}
                        </span>
                        <span className="text-xs text-neutral-500 font-light">/ night</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/rooms/${room.slug}`}
                        className="px-4 py-2.5 rounded-full border border-marea-gold/40 hover:border-marea-gold text-xs font-semibold uppercase tracking-wider text-marea-teal dark:text-white hover:text-marea-gold transition-colors"
                      >
                        Explore Suite
                      </Link>

                      <button
                        onClick={() => onOpenBookingModal(room.id)}
                        className="px-5 py-2.5 rounded-full bg-gradient-to-r from-marea-gold via-[#DEBB74] to-marea-gold text-marea-teal-dark font-semibold text-xs uppercase tracking-[0.16em] shadow-gold-subtle hover:shadow-gold-glow hover:scale-105 transition-all flex items-center gap-1.5"
                      >
                        <span>Check Availability</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        )}

        {/* View All Suites Dedicated Page Banner */}
        <div className="mt-20 p-8 rounded-3xl bg-marea-sand-light dark:bg-marea-teal/30 border border-marea-gold/30 text-center space-y-4 shadow-sm">
          <span className="text-[10px] uppercase tracking-[0.3em] text-marea-gold font-semibold">
            Full Portfolio Catalog
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-light text-marea-teal dark:text-white">
            Looking for All Villa Categories & Detailed Floorplans?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-light max-w-lg mx-auto">
            Browse our complete portfolio of five oceanfront sanctuaries with category filters, living areas, and bespoke butler inclusions.
          </p>
          <div className="pt-2">
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-marea-gold text-marea-teal-dark font-semibold text-xs uppercase tracking-[0.18em] shadow-gold-subtle hover:bg-marea-gold-hover hover:scale-105 transition-all"
            >
              <span>View All 5 Residences & Villas</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Room Detail Modal with Lightbox Crossfade */}
      <RoomDetailModal
        room={activeModalRoom}
        isOpen={Boolean(activeModalRoom)}
        onClose={() => setActiveModalRoom(null)}
        onBookThisRoom={(roomId) => {
          onOpenBookingModal(roomId);
        }}
      />
    </section>
  );
}
