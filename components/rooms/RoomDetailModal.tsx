"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Users,
  Bed,
  Eye,
  Check,
  Calendar,
  Sparkles,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export interface RoomItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  pricePerNight: number;
  maxOccupancy: number;
  bedConfig: string;
  sizeSqFt: number;
  viewType: string;
  totalRooms: number;
  amenities: string[];
  images: string[];
}

interface RoomDetailModalProps {
  room: RoomItem | null;
  isOpen: boolean;
  onClose: () => void;
  onBookThisRoom: (roomId: string) => void;
}

export function RoomDetailModal({
  room,
  isOpen,
  onClose,
  onBookThisRoom,
}: RoomDetailModalProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    setActiveImageIdx(0);
  }, [room]);

  if (!isOpen || !room) return null;

  const images = room.images?.length > 0 ? room.images : [];

  const handleNextImg = () => {
    setActiveImageIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrevImg = () => {
    setActiveImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fade-in">
      <div className="relative w-full max-w-5xl bg-white dark:bg-marea-teal-dark rounded-3xl shadow-2xl border border-marea-gold/40 text-marea-teal dark:text-marea-sand-light overflow-hidden flex flex-col my-auto max-h-[94vh]">
        {/* Top Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 flex items-center justify-center backdrop-blur-sm transition-all duration-200 hover:scale-105"
          aria-label="Close suite detail"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto flex-1">
          {/* 1. Lightbox Photo Gallery with Smooth Crossfade */}
          <div className="relative h-[340px] sm:h-[420px] md:h-[480px] w-full bg-black">
            {images.map((img, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  idx === activeImageIdx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Image
                  src={img}
                  alt={`${room.name} photo ${idx + 1}`}
                  fill
                  className="object-cover object-center"
                  priority={idx === 0}
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
              </div>
            ))}

            {/* Gallery Navigation Controls */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImg}
                  aria-label="Previous photo"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={handleNextImg}
                  aria-label="Next photo"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Room Title in Image Overlay */}
            <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-marea-gold font-medium block mb-1">
                  Marea Bay Collection
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-light drop-shadow-md">
                  {room.name}
                </h3>
              </div>
              <div className="sm:text-right">
                <span className="text-[10px] uppercase tracking-wider text-white/70 block">
                  Starting From
                </span>
                <span className="font-serif text-2xl sm:text-3xl text-marea-gold font-light">
                  {formatCurrency(room.pricePerNight)}
                </span>
                <span className="text-xs text-white/70 font-light"> / night</span>
              </div>
            </div>
          </div>

          {/* Photo Thumbnails Strip */}
          {images.length > 1 && (
            <div className="flex gap-2 p-3 bg-marea-teal-night border-b border-marea-gold/25 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative h-16 w-24 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    idx === activeImageIdx
                      ? "border-marea-gold scale-105 shadow-md"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* 2. Room Specifications & Description */}
          <div className="p-6 md:p-8 space-y-8">
            {/* Specs Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-marea-sand-light dark:bg-marea-teal/30 border border-marea-gold/30">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-marea-gold/15 flex items-center justify-center text-marea-gold shrink-0">
                  <Maximize2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 block">
                    Living Space
                  </span>
                  <span className="text-xs font-medium">{room.sizeSqFt} sq. ft.</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-marea-gold/15 flex items-center justify-center text-marea-gold shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 block">
                    Occupancy
                  </span>
                  <span className="text-xs font-medium">Up to {room.maxOccupancy} Guests</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-marea-gold/15 flex items-center justify-center text-marea-gold shrink-0">
                  <Bed className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 block">
                    Bedding
                  </span>
                  <span className="text-xs font-medium">{room.bedConfig}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-marea-gold/15 flex items-center justify-center text-marea-gold shrink-0">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 block">
                    Vantage
                  </span>
                  <span className="text-xs font-medium truncate">{room.viewType}</span>
                </div>
              </div>
            </div>

            {/* Description Narrative */}
            <div className="space-y-3">
              <h4 className="font-serif text-xl font-light text-marea-teal dark:text-white">
                About This Sanctuary
              </h4>
              <p className="text-sm leading-relaxed text-marea-teal/80 dark:text-marea-sand/80 font-light">
                {room.description}
              </p>
              <p className="text-xs text-neutral-500 italic">
                &ldquo;{room.tagline}&rdquo;
              </p>
            </div>

            {/* Curated Amenities Breakdown */}
            <div className="space-y-4">
              <h4 className="font-serif text-xl font-light text-marea-teal dark:text-white">
                Suite Inclusions & Bespoke Amenities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {room.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-marea-sand/30 dark:bg-white/5 border border-marea-gold/20 text-xs"
                  >
                    <div className="w-5 h-5 rounded-full bg-marea-gold/20 text-marea-gold flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-6 border-t border-marea-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">
                  Nightly Reserve
                </span>
                <span className="font-serif text-2xl font-medium text-marea-gold">
                  {formatCurrency(room.pricePerNight)}
                </span>
                <span className="text-xs text-neutral-500"> / night + taxes</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  className="flex-1 sm:flex-none px-6 py-3 rounded-full border border-marea-gold/50 text-xs font-semibold uppercase tracking-wider hover:bg-marea-gold/10 transition-colors"
                >
                  Close
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onBookThisRoom(room.id);
                  }}
                  className="flex-1 sm:flex-none px-8 py-3 rounded-full bg-gradient-to-r from-marea-gold via-[#DEBB74] to-marea-gold text-marea-teal-dark text-xs font-semibold uppercase tracking-[0.18em] shadow-gold-subtle hover:shadow-gold-glow hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-marea-teal-deep" />
                  <span>Reserve This Suite</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
