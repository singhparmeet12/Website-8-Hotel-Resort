"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { BookingModal } from "@/components/booking/BookingModal";

export function NavbarClient() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <Navbar onOpenBookingModal={() => setIsBookingOpen(true)} />
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
}
