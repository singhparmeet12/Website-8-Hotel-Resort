"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { HeroSlideshow } from "@/components/hero/HeroSlideshow";
import { FloatingBookingWidget } from "@/components/booking/FloatingBookingWidget";
import { WelcomeSection } from "@/components/sections/WelcomeSection";
import { RoomsShowcase } from "@/components/rooms/RoomsShowcase";
import { ExperiencesSlider } from "@/components/sections/ExperiencesSlider";
import { ResortGallery } from "@/components/sections/ResortGallery";
import { GuestReviews } from "@/components/sections/GuestReviews";
import { LocationSection } from "@/components/sections/LocationSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { Footer } from "@/components/layout/Footer";
import { BookingModal } from "@/components/booking/BookingModal";
import { RoomItem } from "@/components/rooms/RoomDetailModal";

import { useRouter } from "next/navigation";

interface HomePageClientProps {
  initialRooms: RoomItem[];
}

export function HomePageClient({ initialRooms }: HomePageClientProps) {
  const router = useRouter();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingParams, setBookingParams] = useState<{
    checkIn?: string;
    checkOut?: string;
    adults?: number;
    children?: number;
    roomTypeId?: string;
  }>({});

  const handleOpenBookingModal = (initialRoomId?: string) => {
    if (initialRoomId) {
      router.push(`/book?room=${initialRoomId}`);
    } else {
      router.push("/book");
    }
  };

  const handleCheckAvailabilityFromWidget = (params: {
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    roomTypeId?: string;
  }) => {
    const search = new URLSearchParams();
    if (params.checkIn) search.set("checkIn", params.checkIn);
    if (params.checkOut) search.set("checkOut", params.checkOut);
    if (params.adults) search.set("adults", params.adults.toString());
    if (params.children) search.set("children", params.children.toString());
    if (params.roomTypeId) search.set("room", params.roomTypeId);

    router.push(`/book?${search.toString()}`);
  };

  return (
    <div className="relative min-h-screen">
      {/* 1. Transparent-over-hero, morphs to warm translucent teal glass on scroll */}
      <Navbar onOpenBookingModal={handleOpenBookingModal} />

      {/* 2. Full-Screen Slideshow Hero with Floating Booking Widget Overlay */}
      <div className="relative">
        <HeroSlideshow />

        {/* Floating Booking Widget Positioned lower in the hero */}
        <div className="absolute bottom-6 sm:bottom-10 md:bottom-20 left-0 right-0 z-30">
          <FloatingBookingWidget
            onCheckAvailability={handleCheckAvailabilityFromWidget}
            selectedRoomTypeId={bookingParams.roomTypeId}
            roomTypes={initialRooms.map((r) => ({ id: r.id, name: r.name }))}
          />
        </div>
      </div>

      {/* 3. Intro / Welcome Section */}
      <WelcomeSection />

      {/* 4. Core Interactive Feature - Alternating Rooms & Suites Panels */}
      <RoomsShowcase
        rooms={initialRooms}
        onOpenBookingModal={handleOpenBookingModal}
      />

      {/* 5. Experiences / Amenities Showcase (Horizontally Scrolling) */}
      <ExperiencesSlider />

      {/* 6. Refined Masonry Gallery with Lightbox */}
      <ResortGallery />

      {/* 7. Guest Reviews with Cross-Dissolve Rotation */}
      <GuestReviews />

      {/* 8. Location & Arrival Guide with Nautical Cartographic Map */}
      <LocationSection />

      {/* 9. Newsletter & Private Offers Band */}
      <NewsletterSection />

      {/* 10. Footer */}
      <Footer />

      {/* 11. Multi-Step Live Overlap Booking Engine Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialParams={bookingParams}
      />
    </div>
  );
}
