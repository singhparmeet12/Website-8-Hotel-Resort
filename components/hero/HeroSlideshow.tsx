"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

interface Slide {
  id: number;
  imageUrl: string;
  subheading: string;
  headline: string;
  tagline: string;
}

const slides: Slide[] = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1920&q=75",
    subheading: "Where the Pacific Meets Untouched Serenity",
    headline: "An Oceanfront Sanctuary Beyond Distinction",
    tagline: "Private villas, secluded sands, and timeless coastal tranquility",
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=75",
    subheading: "Elevated Clifftop Living",
    headline: "Immerse in Endless Horizon & Golden Sunsets",
    tagline: "Bespoke cantilevered pools suspended over the crystalline bay",
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=75",
    subheading: "Barefoot Elegance & Pure Refinement",
    headline: "Awaken to the Rhythms of Marea Bay",
    tagline: "Hermès amenities, dedicated butlers, and tailored private voyages",
  },
  {
    id: 4,
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1920&q=75",
    subheading: "Culinary & Wellness Haven",
    headline: "Ancient Marine Healing & Michelin-Caliber Tastes",
    tagline: "Ocean-to-table dining beneath the canopy of coastal stars",
  },
];

export function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (!isPlaying || isReducedMotion) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6500);
    return () => clearInterval(timer);
  }, [isPlaying, isReducedMotion, nextSlide]);

  return (
    <div className="relative w-full h-screen min-h-[700px] overflow-hidden bg-marea-teal-dark">
      {/* Slides with Crossfade */}
      {slides.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
            }`}
          >
            {/* Image with GPU-accelerated smooth Ken Burns zoom */}
            <div
              className={`relative w-full h-full transform-gpu transition-transform duration-[10000ms] ease-out will-change-transform ${
                isActive && !isReducedMotion ? "scale-105" : "scale-100"
              }`}
            >
              <Image
                src={slide.imageUrl}
                alt={slide.headline}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/20 pointer-events-none" />
            </div>

            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-marea-teal-dark/95 via-marea-teal-dark/40 to-black/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-marea-teal-dark/70 via-transparent to-black/40" />

            {/* Content Text Overlay */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto -translate-y-20 sm:-translate-y-16 md:-translate-y-12">
              <div
                className={`transition-all duration-1000 delay-300 ${
                  isActive
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                <div className="inline-flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                  <span className="h-[1px] w-6 sm:w-12 bg-marea-gold" />
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-marea-gold font-medium">
                    {slide.subheading}
                  </span>
                  <span className="h-[1px] w-6 sm:w-12 bg-marea-gold" />
                </div>

                <h1 className="font-serif text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-wide leading-[1.15] mb-2.5 sm:mb-5 max-w-4xl mx-auto drop-shadow-md">
                  {slide.headline}
                </h1>

                <p className="text-xs sm:text-base md:text-lg text-white/85 font-light tracking-wider max-w-2xl mx-auto font-sans line-clamp-2 sm:line-clamp-none">
                  {slide.tagline}
                </p>
              </div>
            </div>
          </div>
        );
      })}

      {/* Floating Controls Bar at Bottom-Right (Desktop Only - avoids mobile clutter) */}
      <div className="hidden md:flex absolute bottom-8 right-6 md:right-12 z-30 items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white/80">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          className="hover:text-marea-gold transition-colors p-1"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>

        <div className="h-3 w-[1px] bg-white/30" />

        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="hover:text-marea-gold transition-colors p-1"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Indicators */}
        <div className="flex items-center gap-1.5 px-1">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === current ? "w-6 bg-marea-gold" : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="hover:text-marea-gold transition-colors p-1"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Minimal Mobile Progress Dots (Non-intrusive, centered) */}
      <div className="flex md:hidden absolute bottom-2 left-1/2 -translate-x-1/2 z-20 items-center gap-1 pointer-events-none">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`h-1 rounded-full transition-all duration-500 ${
              idx === current ? "w-4 bg-marea-gold" : "w-1 bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* Subtle Scroll Down Prompt */}
      <div className="hidden md:flex absolute bottom-8 left-12 z-30 items-center gap-3 text-white/70 text-xs uppercase tracking-[0.25em]">
        <div className="w-5 h-8 rounded-full border border-white/40 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-marea-gold animate-bounce" />
        </div>
        <span>Explore Sanctuary</span>
      </div>
    </div>
  );
}
