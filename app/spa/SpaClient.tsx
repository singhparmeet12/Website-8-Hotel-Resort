"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Clock,
  Sparkles,
  LayoutGrid,
  List,
  Search,
  X,
  Waves,
  ArrowRight,
} from "lucide-react";

export interface SpaTreatment {
  name: string;
  duration: string;
  price: string;
  category: string;
  description: string;
}

interface SpaClientProps {
  treatments: SpaTreatment[];
}

export function SpaClient({ treatments }: SpaClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "detailed">("grid");

  const categories = [
    { id: "all", label: "All Rituals" },
    { id: "Signature", label: "Marine Soaks" },
    { id: "Massage", label: "Massages" },
    { id: "Facial", label: "Facials" },
    { id: "Couples", label: "Couples" },
  ];

  const filtered = useMemo(() => {
    return treatments.filter((t) => {
      const matchCat =
        activeCategory === "all" ||
        t.category.toLowerCase().includes(activeCategory.toLowerCase());
      if (!matchCat) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.price.toLowerCase().includes(q)
      );
    });
  }, [treatments, activeCategory, searchQuery]);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Search & Mode Bar */}
      <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-marea-teal/40 border border-marea-gold/30 shadow-sm space-y-2.5">
        <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-marea-gold" />
            <input
              type="text"
              placeholder="Search treatments (soak, massage, facial, couples...)"
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

          <div className="flex items-center justify-between w-full sm:w-auto gap-3 text-xs">
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
              Showing <strong>{filtered.length}</strong> Rituals
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
                onClick={() => setViewMode("detailed")}
                aria-label="Detailed View"
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === "detailed"
                    ? "bg-marea-gold text-marea-teal-dark font-medium shadow-xs"
                    : "text-neutral-500 hover:text-marea-gold"
                }`}
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none border-t border-marea-gold/15 pt-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-medium whitespace-nowrap transition-all ${
                activeCategory === c.id
                  ? "bg-marea-gold text-marea-teal-dark font-semibold shadow-xs"
                  : "bg-marea-sand/60 dark:bg-white/5 text-neutral-600 dark:text-neutral-300 hover:text-marea-gold border border-marea-gold/20"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. COMPACT 2-COLUMN MOBILE GRID VIEW (Less Scrolling, More Content) */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-5">
          {filtered.map((t, idx) => (
            <div
              key={idx}
              className="p-2.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-marea-teal/40 border border-marea-gold/25 shadow-xs hover:shadow-md hover:border-marea-gold transition-all flex flex-col justify-between"
            >
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[8px] sm:text-[10px] uppercase tracking-widest text-marea-gold font-semibold truncate">
                    {t.category}
                  </span>
                  <span className="font-serif text-xs sm:text-base font-medium text-marea-gold shrink-0">
                    {t.price}
                  </span>
                </div>

                <h3 className="font-serif text-xs sm:text-lg font-light text-marea-teal dark:text-white leading-tight line-clamp-2">
                  {t.name}
                </h3>

                <div className="flex items-center gap-1 text-[9px] sm:text-xs text-neutral-400">
                  <Clock className="w-2.5 h-2.5 text-marea-gold shrink-0" />
                  <span>{t.duration}</span>
                </div>

                <p className="text-[10px] sm:text-xs text-neutral-600 dark:text-neutral-300 font-light leading-tight line-clamp-3 pt-0.5">
                  {t.description}
                </p>
              </div>

              <div className="pt-2.5 mt-2 border-t border-marea-gold/15">
                <Link
                  href="/book"
                  className="w-full block py-1 sm:py-1.5 rounded-full bg-marea-gold text-marea-teal-dark text-[9px] sm:text-[11px] font-semibold uppercase tracking-wider text-center shadow-gold-subtle hover:scale-102 transition-all"
                >
                  Reserve Ritual
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. DETAILED VIEW */}
      {viewMode === "detailed" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filtered.map((t, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-marea-teal/40 border border-marea-gold/25 shadow-md space-y-3 hover:border-marea-gold transition-colors flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-marea-gold font-semibold">
                    {t.category}
                  </span>
                  <span className="font-serif text-lg font-medium text-marea-gold">
                    {t.price}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-light text-marea-teal dark:text-white">
                  {t.name}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                  <Clock className="w-3.5 h-3.5 text-marea-gold" />
                  <span>{t.duration}</span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-light leading-relaxed pt-1">
                  {t.description}
                </p>
              </div>

              <div className="pt-3 border-t border-marea-gold/20 flex items-center justify-between">
                <span className="text-[11px] text-neutral-400">
                  Complimentary marine herbal tonic
                </span>
                <Link
                  href="/book"
                  className="text-xs text-marea-gold hover:underline font-semibold flex items-center gap-1"
                >
                  <span>Reserve with Stay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
