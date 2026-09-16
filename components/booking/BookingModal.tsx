"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Calendar,
  Users,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Printer,
  ChevronRight,
  ArrowLeft,
  Bed,
  Maximize2,
  ShieldCheck,
  Check,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { formatCurrency } from "@/lib/utils";

interface AvailableRoom {
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
  totalInventory: number;
  bookedCount: number;
  availableRoomsCount: number;
  isAvailable: boolean;
  amenities: string[];
  images: string[];
  pricing: {
    nights: number;
    pricePerNight: number;
    subtotal: number;
    resortTaxes: number;
    serviceCharge: number;
    grandTotal: number;
  };
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialParams?: {
    checkIn?: string;
    checkOut?: string;
    adults?: number;
    children?: number;
    roomTypeId?: string;
  };
}

export function BookingModal({
  isOpen,
  onClose,
  initialParams,
}: BookingModalProps) {
  const [step, setStep] = useState<number>(1);
  const [checkIn, setCheckIn] = useState<string>(initialParams?.checkIn || "");
  const [checkOut, setCheckOut] = useState<string>(initialParams?.checkOut || "");
  const [adults, setAdults] = useState<number>(initialParams?.adults || 2);
  const [childrenCount, setChildrenCount] = useState<number>(
    initialParams?.children || 0
  );
  const [selectedRoom, setSelectedRoom] = useState<AvailableRoom | null>(null);

  // Guest details form state
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  // Loading & error states
  const [isLoading, setIsLoading] = useState(false);
  const [availableRooms, setAvailableRooms] = useState<AvailableRoom[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);

  // Reset or initialize on open
  useEffect(() => {
    if (isOpen) {
      if (initialParams?.checkIn && initialParams?.checkOut) {
        setCheckIn(initialParams.checkIn);
        setCheckOut(initialParams.checkOut);
        setAdults(initialParams.adults || 2);
        setChildrenCount(initialParams.children || 0);
        // Automatically fetch availability
        fetchAvailability(
          initialParams.checkIn,
          initialParams.checkOut,
          initialParams.adults || 2,
          initialParams.children || 0,
          initialParams.roomTypeId
        );
      } else {
        setStep(1);
      }
    } else {
      // Clear confirmation when closed so next time opens fresh
      setErrorMsg(null);
    }
  }, [isOpen, initialParams]);

  const fetchAvailability = async (
    cIn: string,
    cOut: string,
    ad: number,
    ch: number,
    presetRoomId?: string
  ) => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch(
        `/api/availability?checkIn=${cIn}&checkOut=${cOut}&adults=${ad}&children=${ch}`
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to check room availability");
      }

      setAvailableRooms(data.rooms || []);
      setStep(2);

      // If user pre-clicked a specific room type from the showcase, pre-select it
      if (presetRoomId) {
        const match = data.rooms?.find(
          (r: AvailableRoom) => r.id === presetRoomId && r.isAvailable
        );
        if (match) {
          setSelectedRoom(match);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Could not retrieve live availability");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      setErrorMsg("Please select both check-in and check-out dates");
      return;
    }
    fetchAvailability(checkIn, checkOut, adults, childrenCount);
  };

  const handleSelectRoom = (room: AvailableRoom) => {
    setSelectedRoom(room);
    setStep(3);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoom) return;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const payload = {
        roomTypeId: selectedRoom.id,
        checkIn,
        checkOut,
        adults,
        children: childrenCount,
        guestName,
        guestEmail,
        guestPhone,
        specialRequests,
      };

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to confirm reservation.");
      }

      setConfirmedBooking(data.booking);
      setStep(4);
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred during booking.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white dark:bg-marea-teal-dark rounded-3xl shadow-2xl border border-marea-gold/40 text-marea-teal dark:text-marea-sand-light overflow-hidden max-h-[92vh] flex flex-col my-auto">
        {/* Top Header Bar */}
        <div className="px-6 py-5 border-b border-marea-gold/30 flex items-center justify-between bg-marea-sand-light/50 dark:bg-marea-teal/40">
          <div className="flex items-center gap-3">
            {step > 1 && step < 4 && (
              <button
                onClick={() => setStep(step - 1)}
                className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-marea-gold"
                aria-label="Previous step"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-marea-gold font-medium block">
                Marea Bay Resort • Reservation Concierge
              </span>
              <h2 className="font-serif text-xl md:text-2xl font-light text-marea-teal dark:text-white">
                {step === 1 && "Plan Your Oceanfront Stay"}
                {step === 2 && "Available Suites & Villas"}
                {step === 3 && "Guest & Concierge Details"}
                {step === 4 && "Reservation Confirmed"}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-marea-gold/30 flex items-center justify-center hover:bg-marea-gold/20 text-marea-teal dark:text-white transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Step Tracker Progress */}
        <div className="grid grid-cols-4 border-b border-marea-gold/20 text-[11px] font-medium uppercase tracking-wider text-center">
          {[
            { num: 1, label: "Dates & Guests" },
            { num: 2, label: "Select Suite" },
            { num: 3, label: "Guest Info" },
            { num: 4, label: "Confirmation" },
          ].map((item) => (
            <div
              key={item.num}
              className={`py-2.5 flex items-center justify-center gap-2 border-r last:border-r-0 border-marea-gold/20 transition-colors ${
                step === item.num
                  ? "bg-marea-gold/20 text-marea-gold font-semibold"
                  : step > item.num
                  ? "text-marea-gold/70 bg-black/5 dark:bg-white/5"
                  : "text-neutral-400 opacity-60"
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center ${
                  step > item.num
                    ? "bg-marea-gold text-marea-teal-dark"
                    : step === item.num
                    ? "border border-marea-gold text-marea-gold"
                    : "border border-neutral-400"
                }`}
              >
                {step > item.num ? <Check className="w-2.5 h-2.5" /> : item.num}
              </span>
              <span className="hidden sm:inline">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Error Alert Display */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-300 text-sm flex items-start gap-3 animate-fade-in">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium">Notice</p>
              <p className="text-xs mt-0.5 opacity-90">{errorMsg}</p>
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* STEP 1: Date & Guests Setup */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-6 max-w-lg mx-auto py-4">
              <p className="text-center text-sm text-neutral-600 dark:text-neutral-300 font-light">
                Select your preferred arrival and departure dates to check real-time availability across our collection of oceanfront villas and suites.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-marea-gold font-medium flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    Check-In Date
                  </label>
                  <input
                    type="date"
                    required
                    min={format(new Date(), "yyyy-MM-dd")}
                    value={checkIn}
                    onChange={(e) => {
                      setCheckIn(e.target.value);
                      if (e.target.value >= checkOut) {
                        setCheckOut("");
                      }
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-marea-gold/30 bg-marea-sand-light/50 dark:bg-marea-teal/50 text-sm font-medium focus:ring-1 focus:ring-marea-gold focus:outline-none [color-scheme:dark]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-marea-gold font-medium flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    Check-Out Date
                  </label>
                  <input
                    type="date"
                    required
                    min={checkIn || format(new Date(), "yyyy-MM-dd")}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-marea-gold/30 bg-marea-sand-light/50 dark:bg-marea-teal/50 text-sm font-medium focus:ring-1 focus:ring-marea-gold focus:outline-none [color-scheme:dark]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-marea-gold font-medium flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    Adults (13+)
                  </label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-marea-gold/30 bg-marea-sand-light/50 dark:bg-marea-teal/50 text-sm font-medium focus:ring-1 focus:ring-marea-gold focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Adult" : "Adults"}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-marea-gold font-medium flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    Children (0-12)
                  </label>
                  <select
                    value={childrenCount}
                    onChange={(e) => setChildrenCount(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-marea-gold/30 bg-marea-sand-light/50 dark:bg-marea-teal/50 text-sm font-medium focus:ring-1 focus:ring-marea-gold focus:outline-none"
                  >
                    {[0, 1, 2, 3, 4].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Child" : "Children"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-marea-gold via-[#DEBB74] to-marea-gold text-marea-teal-dark font-medium text-sm uppercase tracking-[0.2em] shadow-gold-subtle hover:shadow-gold-glow transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 animate-spin" />
                    Querying Overlap Inventory...
                  </span>
                ) : (
                  <>
                    <span>Search Available Suites</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 2: Room Selection with Live Overlap Availability */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-marea-sand/40 dark:bg-marea-teal/30 border border-marea-gold/20 text-xs">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-marea-gold" />
                  <span>
                    <strong>Dates:</strong> {checkIn} to {checkOut} (
                    {availableRooms[0]?.pricing?.nights || 1} Nights)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-marea-gold" />
                  <span>
                    <strong>Guests:</strong> {adults} Adults
                    {childrenCount > 0 ? `, ${childrenCount} Children` : ""}
                  </span>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-marea-gold underline hover:text-marea-gold-hover font-medium"
                >
                  Change Dates
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {availableRooms.map((room) => {
                  const isSoldOut = !room.isAvailable;
                  return (
                    <div
                      key={room.id}
                      className={`group relative rounded-2xl border overflow-hidden transition-all duration-300 flex flex-col ${
                        isSoldOut
                          ? "opacity-60 border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-black/20"
                          : "border-marea-gold/30 hover:border-marea-gold bg-white dark:bg-marea-teal/50 shadow-sm hover:shadow-md"
                      }`}
                    >
                      {/* Image Thumbnail */}
                      <div className="relative h-52 w-full overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                        {room.images?.[0] && (
                          <Image
                            src={room.images[0]}
                            alt={room.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        )}
                        {/* Overlay Badge */}
                        <div className="absolute top-3 left-3 z-10">
                          {isSoldOut ? (
                            <span className="px-3 py-1 rounded-full bg-red-600/90 text-white text-[10px] uppercase tracking-widest font-semibold backdrop-blur-sm">
                              Sold Out For Selected Dates
                            </span>
                          ) : (
                            <span className="px-3 py-1 rounded-full bg-marea-teal/90 text-marea-gold text-[10px] uppercase tracking-widest font-semibold border border-marea-gold/40 backdrop-blur-sm">
                              {room.availableRoomsCount}{" "}
                              {room.availableRoomsCount === 1 ? "Suite" : "Suites"}{" "}
                              Remaining
                            </span>
                          )}
                        </div>

                        <div className="absolute bottom-3 right-3 z-10 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-serif tracking-wider">
                          {formatCurrency(room.pricePerNight)} / night
                        </div>
                      </div>

                      {/* Content Details */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-serif text-lg font-light text-marea-teal dark:text-white">
                              {room.name}
                            </h3>
                          </div>
                          <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-2 mb-3">
                            {room.tagline}
                          </p>

                          {/* Quick Specs */}
                          <div className="flex items-center gap-3 text-[11px] text-neutral-500 dark:text-neutral-400 pb-3 border-b border-marea-gold/15 mb-3">
                            <span className="flex items-center gap-1">
                              <Maximize2 className="w-3 h-3 text-marea-gold" />
                              {room.sizeSqFt} sq ft
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Bed className="w-3 h-3 text-marea-gold" />
                              {room.bedConfig}
                            </span>
                          </div>

                          {/* Amenities Pill Preview */}
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {room.amenities.slice(0, 3).map((amenity, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded-full text-[10px] bg-marea-gold/10 text-marea-gold dark:text-marea-gold-light border border-marea-gold/20"
                              >
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Price Breakdown & CTA */}
                        <div className="pt-3 border-t border-marea-gold/20 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] uppercase text-neutral-400 block">
                              Total ({room.pricing.nights} Nights incl. taxes)
                            </span>
                            <span className="font-serif text-base font-medium text-marea-gold">
                              {formatCurrency(room.pricing.grandTotal)}
                            </span>
                          </div>

                          <button
                            disabled={isSoldOut}
                            onClick={() => handleSelectRoom(room)}
                            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                              isSoldOut
                                ? "bg-neutral-300 dark:bg-neutral-800 text-neutral-500 cursor-not-allowed"
                                : "bg-marea-gold text-marea-teal-dark hover:bg-marea-gold-hover shadow-gold-subtle hover:scale-105"
                            }`}
                          >
                            {isSoldOut ? "Unavailable" : "Select Suite"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Guest Contact & Reservation Checkout */}
          {step === 3 && selectedRoom && (
            <form onSubmit={handleBookingSubmit} className="space-y-6 max-w-2xl mx-auto py-2">
              {/* Summary Card of Selection */}
              <div className="p-4 rounded-2xl bg-marea-sand/30 dark:bg-marea-teal/30 border border-marea-gold/30 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-marea-gold font-semibold">
                    Selected Sanctuary
                  </span>
                  <h4 className="font-serif text-lg font-light text-marea-teal dark:text-white">
                    {selectedRoom.name}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {checkIn} to {checkOut} ({selectedRoom.pricing.nights} nights) •{" "}
                    {adults} Adults
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-400 block">
                    All-Inclusive Total
                  </span>
                  <span className="font-serif text-xl font-medium text-marea-gold">
                    {formatCurrency(selectedRoom.pricing.grandTotal)}
                  </span>
                </div>
              </div>

              {/* Guest Information Fields */}
              <div className="space-y-4">
                <h4 className="font-serif text-base text-marea-teal dark:text-white border-b border-marea-gold/20 pb-2">
                  Primary Guest Contact Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-marea-gold font-medium">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor Vance"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-marea-gold/30 bg-marea-sand-light/50 dark:bg-marea-teal/50 text-sm focus:ring-1 focus:ring-marea-gold focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-marea-gold font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. eleanor@estate.com"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-marea-gold/30 bg-marea-sand-light/50 dark:bg-marea-teal/50 text-sm focus:ring-1 focus:ring-marea-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-marea-gold font-medium">
                    Phone Number with Country Code *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +1 (555) 392-1084"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-marea-gold/30 bg-marea-sand-light/50 dark:bg-marea-teal/50 text-sm focus:ring-1 focus:ring-marea-gold focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-marea-gold font-medium">
                    Special Concierge Requests & Arrival Details
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Dietary preferences, private boat transfer arrival time, celebratory champagne, or pillow preference..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-marea-gold/30 bg-marea-sand-light/50 dark:bg-marea-teal/50 text-sm focus:ring-1 focus:ring-marea-gold focus:outline-none"
                  />
                </div>
              </div>

              {/* Security & Cancellation Terms */}
              <div className="p-4 rounded-xl bg-marea-sand-light/40 dark:bg-black/20 border border-marea-gold/20 text-xs text-neutral-600 dark:text-neutral-400 space-y-2">
                <div className="flex items-center gap-2 text-marea-gold font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Resort Guarantee & Deposit Policy</span>
                </div>
                <p>
                  Zero cancellation fee up to 14 days prior to arrival. Our 24/7 dedicated concierge will reach out to tailor your arrival itinerary upon confirmation.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs uppercase tracking-wider text-neutral-500 hover:text-marea-gold font-medium"
                >
                  ← Back to Suites
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-marea-gold via-[#DEBB74] to-marea-gold text-marea-teal-dark font-semibold text-xs uppercase tracking-[0.2em] shadow-gold-subtle hover:shadow-gold-glow transition-all flex items-center gap-2"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 animate-spin" />
                      Securing Reservation...
                    </span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Confirm & Lock Reservation</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Instant Confirmation & Digital Voucher */}
          {step === 4 && confirmedBooking && (
            <div className="space-y-6 max-w-xl mx-auto py-2 text-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-marea-gold/20 border-2 border-marea-gold flex items-center justify-center mx-auto text-marea-gold">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-marea-gold font-medium">
                  Reservation Confirmed
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-light text-marea-teal dark:text-white mt-1">
                  We Await Your Arrival, {confirmedBooking.guestName}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  A digital confirmation copy and butler welcome dossier have been dispatched to {confirmedBooking.guestEmail}.
                </p>
              </div>

              {/* Printable Voucher Card */}
              <div className="p-6 rounded-2xl bg-marea-sand-light dark:bg-marea-teal/40 border border-marea-gold/40 text-left space-y-4 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-marea-gold/20">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400">
                      Booking Reference
                    </span>
                    <p className="font-mono text-lg font-bold text-marea-gold">
                      {confirmedBooking.referenceNumber}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400">
                      Status
                    </span>
                    <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                      Confirmed & Guaranteed
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-neutral-400 block">Suite / Villa</span>
                    <span className="font-medium text-marea-teal dark:text-white">
                      {confirmedBooking.roomName}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Duration</span>
                    <span className="font-medium text-marea-teal dark:text-white">
                      {confirmedBooking.nights} Nights
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Check-In</span>
                    <span className="font-medium text-marea-teal dark:text-white">
                      {format(parseISO(confirmedBooking.checkIn), "MMMM dd, yyyy")}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Check-Out</span>
                    <span className="font-medium text-marea-teal dark:text-white">
                      {format(parseISO(confirmedBooking.checkOut), "MMMM dd, yyyy")}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-marea-gold/20 flex items-center justify-between">
                  <span className="text-xs text-neutral-500">Total Investment</span>
                  <span className="font-serif text-lg font-medium text-marea-gold">
                    {formatCurrency(confirmedBooking.totalPrice)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-full border border-marea-gold text-marea-gold hover:bg-marea-gold/10 text-xs font-medium uppercase tracking-wider flex items-center gap-2 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt Voucher</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-marea-gold text-marea-teal-dark hover:bg-marea-gold-hover text-xs font-medium uppercase tracking-wider transition-colors shadow-gold-subtle"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
