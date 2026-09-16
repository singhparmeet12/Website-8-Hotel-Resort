import React from "react";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookClient } from "./BookClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Book Your Stay | Marea Bay Resort",
  description: "Reserve your oceanfront villa or clifftop penthouse at Marea Bay Resort with live inventory and guaranteed best rates.",
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
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

  const preselectedRoomId = typeof searchParams.room === "string" ? searchParams.room : undefined;
  const preselectedCheckIn = typeof searchParams.checkIn === "string" ? searchParams.checkIn : undefined;
  const preselectedCheckOut = typeof searchParams.checkOut === "string" ? searchParams.checkOut : undefined;

  return (
    <div className="min-h-screen bg-marea-sand-light dark:bg-marea-teal-night flex flex-col justify-between">
      <Navbar />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        <BookClient
          rooms={rooms}
          preselectedRoomId={preselectedRoomId}
          preselectedCheckIn={preselectedCheckIn}
          preselectedCheckOut={preselectedCheckOut}
        />
      </main>

      <Footer />
    </div>
  );
}
