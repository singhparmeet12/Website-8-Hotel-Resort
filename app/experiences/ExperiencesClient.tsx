"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  Clock,
  Sparkles,
  LayoutGrid,
  List,
  Search,
  X,
  ArrowRight,
} from "lucide-react";

export interface ExperienceItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  image: string;
  description: string;
  highlights: string[];
}

interface ExperiencesClientProps {
  experiences: ExperienceItem[];
}

export function ExperiencesClient({ experiences }: ExperiencesClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "editorial">("grid");

  const categories = [
    { id: "all", label: "All Pursuits" },
    { id: "Marine Voyage", label: "Marine" },
    { id: "UNESCO Biosphere", label: "Biosphere" },
    { id: "Leisure & Solitude", label: "Leisure" },
    { id: "Conservation", label: "Conservation" },
  ];

  const filtered = useMemo(() => {
    return experiences.filter((exp) => {
      const matchCat =
        activeCategory === "all" || exp.category.toLowerCase().includes(activeCategory.toLowerCase());
      if (!matchCat) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        exp.title.toLowerCase().includes(q) ||
        exp.description.toLowerCase().includes(q) ||
        exp.category.toLowerCase().includes(q) ||
        exp.highlights.some((h) => h.toLowerCase().includes(q))
      );
    });
  }, [experiences, activeCategory, searchQuery]);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Search & Mode Bar */}
      <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-marea-teal/40 border border-marea-gold/30 shadow-sm space-y-2.5">
        <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-marea-gold" />
            <input
              type="text"
              placeholder="Search experiences (catamaran, diving, cabana...)"
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

          {/* View Mode Toggle & Results Count */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-3 text-xs">
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
              Showing <strong>{filtered.length}</strong> Experiences
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

      {/* 1. COMPACT 2-COLUMN MOBILE GRID VIEW */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-5">
          {filtered.map((exp) => (
            <div
              key={exp.id}
              className="group rounded-2xl overflow-hidden bg-white dark:bg-marea-teal/40 border border-marea-gold/25 hover:border-marea-gold shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-24 sm:h-44 w-full overflow-hidden bg-neutral-200">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-1.5 left-1.5 z-10">
                    <span className="px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] uppercase tracking-wider bg-marea-teal/90 text-marea-gold border border-marea-gold/30 font-semibold backdrop-blur-xs">
                      {exp.category}
                    </span>
                  </div>
                  <div className="absolute bottom-1.5 left-2 right-2 z-10 text-white flex items-center gap-1 text-[9px] text-white/90">
                    <Clock className="w-2.5 h-2.5 text-marea-gold shrink-0" />
                    <span className="truncate">{exp.duration.split("(")[0]}</span>
                  </div>
                </div>

                <div className="p-2 sm:p-3.5 space-y-1 sm:space-y-1.5">
                  <h3 className="font-serif text-xs sm:text-base font-light text-marea-teal dark:text-white leading-tight line-clamp-2">
                    {exp.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-neutral-600 dark:text-neutral-300 font-light line-clamp-2 leading-relaxed">
                    {exp.description}
                  </p>
                  <div className="hidden sm:block pt-1 space-y-1">
                    {exp.highlights.slice(0, 2).map((h, i) => (
                      <div key={i} className="flex items-center gap-1 text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
                        <Sparkles className="w-2.5 h-2.5 text-marea-gold shrink-0" />
                        <span className="truncate">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-2 sm:p-3.5 pt-0">
                <Link
                  href="/book"
                  className="w-full block py-1 sm:py-1.5 rounded-full bg-marea-gold text-marea-teal-dark text-[9px] sm:text-[11px] font-semibold uppercase tracking-wider text-center shadow-gold-subtle hover:scale-102 transition-all"
                >
                  Reserve
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. EDITORIAL STORY VIEW */}
      {viewMode === "editorial" && (
        <div className="space-y-6 sm:space-y-12">
          {filtered.map((exp, idx) => {
            const isImageLeft = idx % 2 === 0;
            return (
              <div
                key={exp.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-center p-4 sm:p-8 rounded-3xl bg-white dark:bg-marea-teal/40 border border-marea-gold/30 shadow-md"
              >
                <div
                  className={`lg:col-span-7 relative h-48 sm:h-80 w-full rounded-2xl overflow-hidden ${
                    isImageLeft ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest bg-marea-teal text-marea-gold border border-marea-gold/40 font-semibold">
                      {exp.category}
                    </span>
                  </div>
                </div>

                <div
                  className={`lg:col-span-5 space-y-3 sm:space-y-4 ${
                    isImageLeft ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                      <Clock className="w-3.5 h-3.5 text-marea-gold" />
                      <span>{exp.duration}</span>
                    </div>
                    <h2 className="font-serif text-xl sm:text-2xl font-light text-marea-teal dark:text-white mt-1">
                      {exp.title}
                    </h2>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-light leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] uppercase tracking-wider text-marea-gold font-semibold block">
                      Curated Highlights
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-neutral-600 dark:text-neutral-300">
                      {exp.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-marea-gold shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/book"
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-marea-gold text-marea-teal-dark text-xs uppercase tracking-wider font-semibold shadow-gold-subtle hover:bg-marea-gold-hover transition-colors"
                    >
                      <span>Inquire Reservation</span>
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
