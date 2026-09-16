"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Users,
  Check,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Printer,
  Maximize2,
  Bed,
  AlertCircle,
  Zap,
} from "lucide-react";
import { format, addDays, parseISO } from "date-fns";
import { formatCurrency } from "@/lib/utils";
import { RoomItem } from "@/components/rooms/RoomDetailModal";

interface AvailableRoom extends RoomItem {
  availableRoomsCount: number;
  isAvailable: boolean;
  bookedCount: number;
  pricing: {
    nights: number;
    pricePerNight: number;
    subtotal: number;
    resortTaxes: number;
    serviceCharge: number;
    grandTotal: number;
  };
}

interface BookClientProps {
  rooms: RoomItem[];
  preselectedRoomId?: string;
  preselectedCheckIn?: string;
  preselectedCheckOut?: string;
}

export function BookClient({
  rooms,
  preselectedRoomId,
  preselectedCheckIn,
  preselectedCheckOut,
}: BookClientProps) {
  // Step tracker: 1 = Dates & Guests, 2 = Select Suite, 3 = Guest Info, 4 = Confirmed
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Dates state
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [minDate, setMinDate] = useState<string>("");

  // Room selection & availability
  const [availableRooms, setAvailableRooms] = useState<AvailableRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<AvailableRoom | null>(null);
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);

  // Guest Information state
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  // Booking process state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmedReservation, setConfirmedReservation] = useState<any | null>(null);

  // Initialize dates
  useEffect(() => {
    const today = new Date();
    setMinDate(format(today, "yyyy-MM-dd"));

    const defaultIn = preselectedCheckIn || format(addDays(today, 10), "yyyy-MM-dd");
    const defaultOut = preselectedCheckOut || format(addDays(today, 14), "yyyy-MM-dd");

    setCheckIn(defaultIn);
    setCheckOut(defaultOut);

    // Initial query
    fetchAvailability(defaultIn, defaultOut, 2, 0, preselectedRoomId);
  }, [preselectedCheckIn, preselectedCheckOut, preselectedRoomId]);

  // Quick Date Preset Helpers
  const applyPreset = (daysFromToday: number, durationNights: number) => {
    const today = new Date();
    const newIn = format(addDays(today, daysFromToday), "yyyy-MM-dd");
    const newOut = format(addDays(today, daysFromToday + durationNights), "yyyy-MM-dd");
    setCheckIn(newIn);
    setCheckOut(newOut);
    fetchAvailability(newIn, newOut, adults, children);
  };

  const fetchAvailability = async (
    cIn: string,
    cOut: string,
    ad: number,
    ch: number,
    presetRoomId?: string
  ) => {
    if (!cIn || !cOut) return;
    setIsLoadingAvailability(true);
    setErrorMsg(null);

    try {
      const res = await fetch(
        `/api/availability?checkIn=${cIn}&checkOut=${cOut}&adults=${ad}&children=${ch}`
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unable to check availability");
      }

      setAvailableRooms(data.rooms || []);

      // If user came with a preselected room, or already selected one, preserve/update it
      const targetId = presetRoomId || selectedRoom?.id;
      if (targetId) {
        const match = data.rooms?.find((r: AvailableRoom) => r.id === targetId);
        if (match && match.isAvailable) {
          setSelectedRoom(match);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to load live room rates");
    } finally {
      setIsLoadingAvailability(false);
    }
  };

  const handleDateChange = (newIn: string, newOut: string) => {
    setCheckIn(newIn);
    setCheckOut(newOut);
    fetchAvailability(newIn, newOut, adults, children);
  };

  const handleSelectRoom = (room: AvailableRoom) => {
    setSelectedRoom(room);
    setCurrentStep(3); // proceed directly to Guest Info
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFillDemoData = () => {
    setGuestName("Lord Arthur Vance");
    setGuestEmail("arthur@vance.com");
    setGuestPhone("+1 (555) 482-9901");
    setSpecialRequests("Chilled Dom Pérignon on arrival and private seaplane transfer coordination.");
  };

  const handleCompleteReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoom) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const payload = {
        roomTypeId: selectedRoom.id,
        checkIn,
        checkOut,
        adults,
        children,
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
        throw new Error(data.error || "Failed to lock reservation.");
      }

      setConfirmedReservation(data.booking);
      setCurrentStep(4);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Header & Step Tracker Bar */}
      <div className="text-center space-y-3">
        <span className="text-[10px] uppercase tracking-[0.35em] text-marea-gold font-medium block">
          Direct Luxury Booking Concierge
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-light text-marea-teal dark:text-white">
          Reserve Your Sanctuary
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-light max-w-lg mx-auto">
          Real-time overlap inventory, best rate guarantee, and bespoke arrival inclusions.
        </p>

        {/* Step Indicator Tabs */}
        <div className="max-w-2xl mx-auto pt-6">
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            {[
              { step: 1, title: "1. Dates & Stay" },
              { step: 2, title: "2. Choose Suite" },
              { step: 3, title: "3. Guest Details" },
              { step: 4, title: "4. Confirmation" },
            ].map((tab) => {
              const isActive = currentStep === tab.step;
              const isPast = currentStep > tab.step;
              return (
                <button
                  key={tab.step}
                  onClick={() => {
                    if (tab.step < currentStep) setCurrentStep(tab.step);
                  }}
                  disabled={tab.step > currentStep}
                  className={`py-2 px-1 rounded-xl font-medium tracking-wide transition-all border ${
                    isActive
                      ? "bg-marea-gold text-marea-teal-dark border-marea-gold shadow-gold-subtle"
                      : isPast
                      ? "bg-marea-gold/15 text-marea-gold border-marea-gold/30 hover:bg-marea-gold/25"
                      : "bg-white/40 dark:bg-white/5 text-neutral-400 border-transparent cursor-not-allowed"
                  }`}
                >
                  <span className="truncate block">{tab.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {errorMsg && (
        <div className="max-w-4xl mx-auto p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="font-medium">{errorMsg}</span>
        </div>
      )}

      {/* 2. Main Booking Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Active Step Controls */}
        <div className="lg:col-span-8 space-y-6">
          {/* STEP 1: Date Range & Guest Parameters */}
          {currentStep <= 2 && (
            <div className="p-6 rounded-3xl bg-white dark:bg-marea-teal/40 border border-marea-gold/30 shadow-lg space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-marea-gold/20">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-marea-gold font-semibold">
                  <Calendar className="w-4 h-4" />
                  <span>Choose Arrival & Departure</span>
                </div>

                {/* Quick Presets */}
                <div className="flex items-center gap-1.5 overflow-x-auto text-[11px]">
                  <span className="text-neutral-400 text-[10px] uppercase tracking-wider mr-1">
                    Quick:
                  </span>
                  <button
                    onClick={() => applyPreset(7, 3)}
                    className="px-2.5 py-1 rounded-full bg-marea-sand dark:bg-white/10 hover:bg-marea-gold hover:text-marea-teal-dark transition-colors whitespace-nowrap"
                  >
                    Next 3 Nights
                  </button>
                  <button
                    onClick={() => applyPreset(14, 5)}
                    className="px-2.5 py-1 rounded-full bg-marea-sand dark:bg-white/10 hover:bg-marea-gold hover:text-marea-teal-dark transition-colors whitespace-nowrap"
                  >
                    5-Day Escape
                  </button>
                  <button
                    onClick={() => applyPreset(21, 7)}
                    className="px-2.5 py-1 rounded-full bg-marea-sand dark:bg-white/10 hover:bg-marea-gold hover:text-marea-teal-dark transition-colors whitespace-nowrap"
                  >
                    7-Day Retreat
                  </button>
                </div>
              </div>

              {/* Date Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-medium">
                    Check-In Date
                  </label>
                  <input
                    type="date"
                    min={minDate}
                    value={checkIn}
                    onChange={(e) => {
                      const newIn = e.target.value;
                      let newOut = checkOut;
                      if (newIn >= checkOut) {
                        newOut = format(addDays(new Date(newIn), 3), "yyyy-MM-dd");
                      }
                      handleDateChange(newIn, newOut);
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-marea-gold/30 bg-marea-sand-light/40 dark:bg-marea-teal/50 text-sm font-medium focus:ring-1 focus:ring-marea-gold focus:outline-none [color-scheme:dark]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-medium">
                    Check-Out Date
                  </label>
                  <input
                    type="date"
                    min={checkIn || minDate}
                    value={checkOut}
                    onChange={(e) => handleDateChange(checkIn, e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-marea-gold/30 bg-marea-sand-light/40 dark:bg-marea-teal/50 text-sm font-medium focus:ring-1 focus:ring-marea-gold focus:outline-none [color-scheme:dark]"
                  />
                </div>
              </div>

              {/* Guest Steppers */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-medium flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-marea-gold" />
                    Adults (13+)
                  </label>
                  <select
                    value={adults}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setAdults(val);
                      fetchAvailability(checkIn, checkOut, val, children);
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-marea-gold/30 bg-marea-sand-light/40 dark:bg-marea-teal/50 text-sm font-medium focus:ring-1 focus:ring-marea-gold focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "Adult" : "Adults"}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-medium flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-marea-gold" />
                    Children (0-12)
                  </label>
                  <select
                    value={children}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setChildren(val);
                      fetchAvailability(checkIn, checkOut, adults, val);
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-marea-gold/30 bg-marea-sand-light/40 dark:bg-marea-teal/50 text-sm font-medium focus:ring-1 focus:ring-marea-gold focus:outline-none"
                  >
                    {[0, 1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "Child" : "Children"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Room Selection Cards with Real Availability */}
          {currentStep <= 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl sm:text-2xl font-light text-marea-teal dark:text-white">
                  Available Suites & Oceanfront Sanctuaries
                </h3>
                {isLoadingAvailability && (
                  <span className="text-xs text-marea-gold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 animate-spin" />
                    Querying live inventory...
                  </span>
                )}
              </div>

              <div className="space-y-5">
                {availableRooms.map((room) => {
                  const isSoldOut = !room.isAvailable;
                  const isChosen = selectedRoom?.id === room.id;

                  return (
                    <div
                      key={room.id}
                      className={`group rounded-3xl border overflow-hidden transition-all duration-300 bg-white dark:bg-marea-teal/40 flex flex-col md:flex-row shadow-sm hover:shadow-md ${
                        isChosen
                          ? "border-marea-gold ring-2 ring-marea-gold/40"
                          : isSoldOut
                          ? "opacity-60 border-neutral-300 dark:border-neutral-800"
                          : "border-marea-gold/30 hover:border-marea-gold"
                      }`}
                    >
                      {/* Image Thumbnail */}
                      <div className="relative h-28 sm:h-44 md:h-auto md:w-64 shrink-0 overflow-hidden bg-neutral-200">
                        {room.images?.[0] && (
                          <Image
                            src={room.images[0]}
                            alt={room.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        )}
                        <div className="absolute top-2 left-2 z-10">
                          {isSoldOut ? (
                            <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-red-600/90 text-white text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold backdrop-blur-sm">
                              Sold Out
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-marea-teal/90 text-marea-gold text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold border border-marea-gold/40 backdrop-blur-sm">
                              {room.availableRoomsCount}{" "}
                              {room.availableRoomsCount === 1 ? "Unit" : "Units"} Left
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content & Select Action */}
                      <div className="p-3 sm:p-6 flex-1 flex flex-col justify-between space-y-2 sm:space-y-4">
                        <div>
                          <div className="flex flex-wrap items-baseline justify-between gap-1 sm:gap-2">
                            <h4 className="font-serif text-base sm:text-2xl font-light text-marea-teal dark:text-white">
                              {room.name}
                            </h4>
                            <div className="text-right">
                              <span className="font-serif text-xl text-marea-gold font-light">
                                {formatCurrency(room.pricePerNight)}
                              </span>
                              <span className="text-xs text-neutral-400 font-light">
                                {" "}
                                / night
                              </span>
                            </div>
                          </div>

                          <p className="text-xs text-neutral-600 dark:text-neutral-300 font-light line-clamp-2 mt-1">
                            {room.tagline}
                          </p>

                          {/* Quick Specs */}
                          <div className="flex items-center gap-4 text-xs text-neutral-500 pt-3">
                            <span className="flex items-center gap-1">
                              <Maximize2 className="w-3.5 h-3.5 text-marea-gold" />
                              {room.sizeSqFt} sq ft
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Bed className="w-3.5 h-3.5 text-marea-gold" />
                              {room.bedConfig}
                            </span>
                            <span>•</span>
                            <span>{room.viewType}</span>
                          </div>

                          {/* Inclusions */}
                          <div className="flex flex-wrap gap-1.5 pt-3">
                            {room.amenities.slice(0, 3).map((amenity, idx) => (
                              <span
                                key={idx}
                                className="px-2.5 py-0.5 rounded-full text-[10px] bg-marea-sand dark:bg-white/5 border border-marea-gold/25 text-marea-teal dark:text-marea-sand"
                              >
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-3 border-t border-marea-gold/20 flex items-center justify-between">
                          <Link
                            href={`/rooms/${room.slug}`}
                            className="text-xs text-marea-gold hover:underline font-medium"
                          >
                            Explore Details & Photos &rarr;
                          </Link>

                          <button
                            disabled={isSoldOut}
                            onClick={() => handleSelectRoom(room)}
                            className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                              isSoldOut
                                ? "bg-neutral-300 dark:bg-neutral-800 text-neutral-500 cursor-not-allowed"
                                : isChosen
                                ? "bg-emerald-600 text-white shadow-md"
                                : "bg-gradient-to-r from-marea-gold to-[#B59149] text-marea-teal-dark shadow-gold-subtle hover:scale-105"
                            }`}
                          >
                            {isChosen ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Selected</span>
                              </>
                            ) : isSoldOut ? (
                              <span>Sold Out</span>
                            ) : (
                              <>
                                <span>Select & Continue</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Guest & Reservation Form */}
          {currentStep === 3 && selectedRoom && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-marea-teal/40 border border-marea-gold/30 shadow-xl space-y-6 animate-fade-in">
              <div className="flex items-center justify-between pb-4 border-b border-marea-gold/20">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-marea-gold font-semibold">
                    Step 3 of 4
                  </span>
                  <h3 className="font-serif text-2xl font-light text-marea-teal dark:text-white">
                    Primary Guest & Arrival Details
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={handleFillDemoData}
                  className="px-3 py-1.5 rounded-full border border-marea-gold/50 text-[11px] text-marea-gold hover:bg-marea-gold/10 font-medium flex items-center gap-1 transition-colors"
                >
                  <Zap className="w-3 h-3 text-marea-gold" />
                  <span>Auto-Fill Demo Guest</span>
                </button>
              </div>

              <form onSubmit={handleCompleteReservation} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-marea-gold font-medium">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lord Arthur Vance"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-marea-gold/30 bg-marea-sand-light/50 dark:bg-marea-teal/50 text-sm focus:ring-1 focus:ring-marea-gold focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-marea-gold font-medium">
                      Email Address (for voucher confirmation) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. arthur@vance.com"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-marea-gold/30 bg-marea-sand-light/50 dark:bg-marea-teal/50 text-sm focus:ring-1 focus:ring-marea-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-marea-gold font-medium">
                    Phone Number with Country Code *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +1 (555) 482-9901"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-marea-gold/30 bg-marea-sand-light/50 dark:bg-marea-teal/50 text-sm focus:ring-1 focus:ring-marea-gold focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-marea-gold font-medium">
                    Special Concierge Inquiries & Arrival Logistics
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Dietary requests, champagne chilling preference, arrival by seaplane or yacht dock..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-marea-gold/30 bg-marea-sand-light/50 dark:bg-marea-teal/50 text-sm focus:ring-1 focus:ring-marea-gold focus:outline-none"
                  />
                </div>

                {/* Terms Notice */}
                <div className="p-4 rounded-2xl bg-marea-sand-light/50 dark:bg-black/20 border border-marea-gold/25 text-xs text-neutral-600 dark:text-neutral-300 space-y-1">
                  <div className="flex items-center gap-1.5 text-marea-gold font-medium">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Complimentary Cancellation up to 14 Days Prior to Arrival</span>
                  </div>
                  <p>
                    Your reservation guarantees immediate room lock across your selected dates with zero overbooking.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-neutral-500 hover:text-marea-gold font-medium"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Suites</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-marea-gold via-[#DEBB74] to-marea-gold text-marea-teal-dark font-semibold text-xs uppercase tracking-[0.2em] shadow-gold-subtle hover:shadow-gold-glow hover:scale-105 transition-all flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 animate-spin" />
                        Locking Inventory...
                      </span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-marea-teal-deep" />
                        <span>Confirm Reservation</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 4: Instant Confirmation Voucher Screen */}
          {currentStep === 4 && confirmedReservation && (
            <div className="p-8 rounded-3xl bg-white dark:bg-marea-teal/40 border border-marea-gold/40 shadow-2xl space-y-6 text-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-marea-gold/20 border-2 border-marea-gold flex items-center justify-center mx-auto text-marea-gold">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-marea-gold font-medium">
                  Confirmed & Inventory Locked
                </span>
                <h3 className="font-serif text-3xl font-light text-marea-teal dark:text-white mt-1">
                  We Await Your Arrival, {confirmedReservation.guestName}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  A confirmation packet and arrival dossier have been dispatched to {confirmedReservation.guestEmail}.
                </p>
              </div>

              {/* Digital Voucher Card */}
              <div className="p-6 rounded-2xl bg-marea-sand-light dark:bg-marea-teal/30 border border-marea-gold/30 text-left space-y-4 max-w-lg mx-auto">
                <div className="flex items-center justify-between pb-3 border-b border-marea-gold/20">
                  <div>
                    <span className="text-[10px] uppercase text-neutral-400">
                      Booking Reference
                    </span>
                    <p className="font-mono text-xl font-bold text-marea-gold">
                      {confirmedReservation.referenceNumber}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase text-neutral-400">
                      Status
                    </span>
                    <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                      Guaranteed
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-neutral-400 block">Sanctuary</span>
                    <span className="font-medium text-marea-teal dark:text-white">
                      {confirmedReservation.roomName}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Stay Duration</span>
                    <span className="font-medium text-marea-teal dark:text-white">
                      {confirmedReservation.nights} Nights
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Check-In</span>
                    <span className="font-medium text-marea-teal dark:text-white">
                      {format(parseISO(confirmedReservation.checkIn), "MMM dd, yyyy")}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Check-Out</span>
                    <span className="font-medium text-marea-teal dark:text-white">
                      {format(parseISO(confirmedReservation.checkOut), "MMM dd, yyyy")}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-marea-gold/20 flex items-center justify-between">
                  <span className="text-xs text-neutral-500">All-Inclusive Total</span>
                  <span className="font-serif text-xl font-medium text-marea-gold">
                    {formatCurrency(confirmedReservation.totalPrice)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-full border border-marea-gold text-marea-gold hover:bg-marea-gold/10 text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt Voucher</span>
                </button>

                <Link
                  href={`/manage-booking?reference=${confirmedReservation.referenceNumber}`}
                  className="px-6 py-2.5 rounded-full bg-marea-gold text-marea-teal-dark hover:bg-marea-gold-hover text-xs font-medium uppercase tracking-wider transition-colors shadow-gold-subtle"
                >
                  Manage In Guest Portal
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Sticky Summary Sidebar */}
        <div className="lg:col-span-4 sticky top-24 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-marea-teal/40 border border-marea-gold/30 shadow-lg space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-marea-gold font-semibold block">
              Reservation Summary
            </span>

            {/* Room Image & Title */}
            {selectedRoom ? (
              <div className="space-y-3">
                <div className="relative h-40 w-full rounded-2xl overflow-hidden border border-marea-gold/20">
                  {selectedRoom.images?.[0] && (
                    <Image
                      src={selectedRoom.images[0]}
                      alt={selectedRoom.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div>
                  <h4 className="font-serif text-lg font-light text-marea-teal dark:text-white">
                    {selectedRoom.name}
                  </h4>
                  <p className="text-xs text-neutral-500">
                    {selectedRoom.viewType} • {selectedRoom.sizeSqFt} sq ft
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-marea-sand-light/50 dark:bg-white/5 border border-dashed border-marea-gold/30 text-center text-xs text-neutral-500">
                Select a suite from the list to view pricing breakdown
              </div>
            )}

            {/* Dates & Duration */}
            <div className="py-3 border-y border-marea-gold/20 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-500">Dates</span>
                <span className="font-medium text-right">
                  {checkIn} &rarr; {checkOut}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Guests</span>
                <span className="font-medium">
                  {adults} Adults{children > 0 ? `, ${children} Children` : ""}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Nights</span>
                <span className="font-medium">
                  {selectedRoom?.pricing?.nights ||
                    Math.max(
                      1,
                      Math.round(
                        (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
                          (1000 * 60 * 60 * 24)
                      ) || 1
                    )}{" "}
                  Nights
                </span>
              </div>
            </div>

            {/* Pricing Calculation Breakdown */}
            {selectedRoom && (
              <div className="text-xs space-y-2 pt-1">
                <div className="flex justify-between text-neutral-500">
                  <span>
                    {formatCurrency(selectedRoom.pricePerNight)} &times;{" "}
                    {selectedRoom.pricing.nights} nights
                  </span>
                  <span>{formatCurrency(selectedRoom.pricing.subtotal)}</span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>Resort & Occupancy Tax (14%)</span>
                  <span>{formatCurrency(selectedRoom.pricing.resortTaxes)}</span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>Marine Conservation & Service (5%)</span>
                  <span>{formatCurrency(selectedRoom.pricing.serviceCharge)}</span>
                </div>

                <div className="pt-3 border-t border-marea-gold/30 flex justify-between items-baseline">
                  <span className="font-medium text-sm">Estimated Total</span>
                  <span className="font-serif text-2xl font-light text-marea-gold">
                    {formatCurrency(selectedRoom.pricing.grandTotal)}
                  </span>
                </div>
              </div>
            )}

            {/* Guarantee Badge */}
            <div className="pt-2 text-[11px] text-neutral-500 dark:text-neutral-400 space-y-1.5 border-t border-marea-gold/15">
              <div className="flex items-center gap-1.5 text-marea-gold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="font-medium">Direct Booking Privileges</span>
              </div>
              <p>
                • Daily Champagne Welcome<br />
                • Complimentary Thalassotherapy Spa pass<br />
                • 24/7 Butler Service on request
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
