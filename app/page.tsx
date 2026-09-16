import React from "react";
import { prisma } from "@/lib/prisma";
import { HomePageClient } from "./HomePageClient";
import { RoomItem } from "@/components/rooms/RoomDetailModal";

export const revalidate = 60;

export default async function HomePage() {
  const roomRecords = await prisma.roomType.findMany({
    orderBy: { sortOrder: "asc" },
  });

  const rooms: RoomItem[] = roomRecords.map((r) => {
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

  return <HomePageClient initialRooms={rooms} />;
}
