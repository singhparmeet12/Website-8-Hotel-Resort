import React from "react";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RoomsCatalogClient } from "./RoomsCatalogClient";

export const revalidate = 60;

export const metadata = {
  title: "Suites & Villas Collection | Marea Bay Resort",
  description:
    "Explore our complete portfolio of oceanfront villas, clifftop penthouses, and beachfront suites at Marea Bay Resort. Each residence offers bespoke luxury and panoramic Pacific vistas.",
};

export default async function RoomsCatalogPage() {
  const roomRecords = await prisma.roomType.findMany({
    orderBy: { sortOrder: "asc" },
  });

  const rooms = roomRecords.map((r) => {
    let amenities: string[] = [];
    let images: string[] = [];
    try {
      amenities = JSON.parse(r.amenities);
    } catch {
      amenities = [];
    }
    try {
      images = JSON.parse(r.images);
    } catch {
      images = [];
    }

    return {
      id: r.id,
      slug: r.slug,
      name: r.name,
      tagline: r.tagline,
      description: r.description,
      pricePerNight: r.pricePerNight,
      maxOccupancy: r.maxOccupancy,
      bedConfig: r.bedConfig,
      sizeSqFt: r.sizeSqFt,
      viewType: r.viewType,
      totalRooms: r.totalRooms,
      amenities,
      images,
    };
  });

  return (
    <div className="min-h-screen bg-marea-sand-light dark:bg-marea-teal-night flex flex-col justify-between">
      <Navbar />

      <main className="pt-16 sm:pt-28 pb-10 sm:pb-20 px-2.5 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        {/* Editorial Catalog Hero */}
        <div className="text-center max-w-3xl mx-auto mb-3 sm:mb-8 space-y-1 sm:space-y-2">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-marea-gold font-medium block">
            Residential Architecture
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-marea-teal dark:text-white tracking-wide">
            The Suites & Villas Portfolio
          </h1>
          <p className="text-[11px] sm:text-sm text-neutral-600 dark:text-neutral-300 font-light max-w-lg mx-auto">
            Five bespoke oceanfront sanctuaries with private plunge pools, dedicated butlers, and panoramic Pacific vistas.
          </p>
        </div>

        <RoomsCatalogClient rooms={rooms} />
      </main>

      <Footer />
    </div>
  );
}
