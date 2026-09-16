"use client";

import React, { useState } from "react";
import { RoomsShowcase } from "@/components/rooms/RoomsShowcase";
import { BookingModal } from "@/components/booking/BookingModal";
import { RoomItem } from "@/components/rooms/RoomDetailModal";

interface RoomsShowcaseClientProps {
  initialRooms: RoomItem[];
}

export function RoomsShowcaseClient({ initialRooms }: RoomsShowcaseClientProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | undefined>();

  const handleOpenBooking = (roomId?: string) => {
    setSelectedRoomId(roomId);
    setIsBookingOpen(true);
  };

  return (
    <>
      <RoomsShowcase
        rooms={initialRooms}
        onOpenBookingModal={handleOpenBooking}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialParams={{
          roomTypeId: selectedRoomId,
        }}
      />
    </>
  );
}
