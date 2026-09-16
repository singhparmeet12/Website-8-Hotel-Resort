import React from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GalleryClient } from "./GalleryClient";

export const metadata = {
  title: "Resort Visual Gallery | Marea Bay Resort",
  description:
    "Explore the visual world of Marea Bay Resort — architectural oceanfront villas, clifftop dining vistas, and secluded Pacific beaches.",
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-marea-sand-light dark:bg-marea-teal-night flex flex-col justify-between">
      <Navbar />

      <main className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="text-[10px] uppercase tracking-[0.35em] text-marea-gold font-medium block">
            Visual Portfolio
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-marea-teal dark:text-white tracking-wide">
            The Marea Bay Gallery
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-light max-w-lg mx-auto">
            Glimpses into our secluded sanctuary — where contemporary limestone pavilions harmonize with the raw drama of the Pacific Ocean.
          </p>
        </div>

        <GalleryClient />
      </main>

      <Footer />
    </div>
  );
}
