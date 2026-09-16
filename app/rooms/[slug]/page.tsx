import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Maximize2,
  Users,
  Bed,
  Eye,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  Award,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const room = await prisma.roomType.findUnique({
    where: { slug: params.slug },
  });

  if (!room) return { title: "Suite Not Found | Marea Bay Resort" };

  return {
    title: `${room.name} | Marea Bay Resort`,
    description: room.description,
  };
}

export default async function RoomDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const room = await prisma.roomType.findUnique({
    where: { slug: params.slug },
  });

  if (!room) {
    notFound();
  }

  let amenities: string[] = [];
  let images: string[] = [];
  try {
    amenities = JSON.parse(room.amenities);
  } catch {
    amenities = [];
  }
  try {
    images = JSON.parse(room.images);
  } catch {
    images = [];
  }

  // Fetch other suites for discovery
  const otherRooms = await prisma.roomType.findMany({
    where: { id: { not: room.id } },
    take: 3,
  });

  return (
    <div className="min-h-screen bg-marea-sand-light dark:bg-marea-teal-night flex flex-col justify-between">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Back Link & Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-marea-gold hover:underline font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Suites & Villas</span>
          </Link>
        </div>

        {/* Hero Gallery Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[440px] sm:h-[520px] rounded-3xl overflow-hidden shadow-2xl border border-marea-gold/30">
            {/* Primary Large Image */}
            <div className="md:col-span-8 relative h-full bg-neutral-200">
              {images[0] && (
                <Image
                  src={images[0]}
                  alt={room.name}
                  fill
                  priority
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-[0.3em] text-marea-gold font-medium block mb-1">
                  {room.viewType}
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl font-light">
                  {room.name}
                </h1>
              </div>
            </div>

            {/* Secondary Stacked Images */}
            <div className="hidden md:grid md:col-span-4 grid-rows-2 gap-4 h-full">
              <div className="relative h-full bg-neutral-200 rounded-xl overflow-hidden">
                {images[1] && (
                  <Image src={images[1]} alt="" fill className="object-cover" />
                )}
              </div>
              <div className="relative h-full bg-neutral-200 rounded-xl overflow-hidden">
                {images[2] || images[0] ? (
                  <Image
                    src={images[2] || images[0]}
                    alt=""
                    fill
                    className="object-cover"
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* Content & Booking Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Room In-depth Narrative & Amenities */}
          <div className="lg:col-span-8 space-y-10">
            {/* Tagline & Description */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-marea-teal dark:text-white">
                Residence Overview
              </h2>
              <p className="font-serif italic text-lg text-marea-gold">
                &ldquo;{room.tagline}&rdquo;
              </p>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-light leading-relaxed">
                {room.description}
              </p>
            </div>

            {/* Specifications Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-3xl bg-white dark:bg-marea-teal/40 border border-marea-gold/25 shadow-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-marea-gold">
                  <Maximize2 className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-wider font-semibold">
                    Interior Living
                  </span>
                </div>
                <p className="font-serif text-xl font-light">{room.sizeSqFt} sq. ft.</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-marea-gold">
                  <Users className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-wider font-semibold">
                    Occupancy
                  </span>
                </div>
                <p className="font-serif text-xl font-light">Up to {room.maxOccupancy} Guests</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-marea-gold">
                  <Bed className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-wider font-semibold">
                    Bedding
                  </span>
                </div>
                <p className="font-serif text-xl font-light truncate">{room.bedConfig}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-marea-gold">
                  <Eye className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-wider font-semibold">
                    Vantage
                  </span>
                </div>
                <p className="font-serif text-base font-light truncate">{room.viewType}</p>
              </div>
            </div>

            {/* Luxury Inclusions Breakdown */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-light text-marea-teal dark:text-white">
                Bespoke Suite Amenities & Privileges
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {amenities.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-white dark:bg-white/5 border border-marea-gold/20 text-xs shadow-sm"
                  >
                    <div className="w-5 h-5 rounded-full bg-marea-gold/20 text-marea-gold flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium text-marea-teal dark:text-white">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hospitality Guarantee Strip */}
            <div className="p-6 rounded-3xl bg-marea-sand dark:bg-marea-teal/20 border border-marea-gold/30 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-marea-gold/20 text-marea-gold flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-1 text-xs">
                <h4 className="font-serif text-base font-medium text-marea-teal dark:text-white">
                  The Marea Bay Butler Guarantee
                </h4>
                <p className="text-neutral-600 dark:text-neutral-300 font-light">
                  Every villa reservation includes dedicated 24-hour butler assistance, daily sunset champagne service, personalized luggage packing/unpacking, and priority access to clifftop dining reservations.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Booking Card */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="p-7 rounded-3xl bg-white dark:bg-marea-teal/50 border border-marea-gold/40 shadow-xl space-y-6">
              <div className="flex items-baseline justify-between pb-4 border-b border-marea-gold/20">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">
                    Starting Rate
                  </span>
                  <span className="font-serif text-3xl font-light text-marea-gold">
                    {formatCurrency(room.pricePerNight)}
                  </span>
                  <span className="text-xs text-neutral-400"> / night</span>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider bg-marea-gold/15 text-marea-gold font-medium border border-marea-gold/30">
                  {room.totalRooms} Units
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                  <ShieldCheck className="w-4 h-4 text-marea-gold shrink-0" />
                  <span>Best Rate Guaranteed • No Booking Surcharges</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                  <Sparkles className="w-4 h-4 text-marea-gold shrink-0" />
                  <span>Includes Daily Gourmet Artisanal Breakfast</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                  <Calendar className="w-4 h-4 text-marea-gold shrink-0" />
                  <span>Free Cancellation up to 14 Days Prior</span>
                </div>
              </div>

              <Link
                href={`/book?room=${room.id}`}
                className="w-full py-4 rounded-full bg-gradient-to-r from-marea-gold via-[#DEBB74] to-marea-gold text-marea-teal-dark font-semibold text-xs uppercase tracking-[0.2em] shadow-gold-subtle hover:shadow-gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-marea-teal-deep" />
                <span>Reserve This Suite</span>
              </Link>

              <p className="text-[11px] text-center text-neutral-400">
                Direct booking privileges applied automatically at checkout.
              </p>
            </div>
          </div>
        </div>

        {/* Other Residences Carousel */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-16 border-t border-marea-gold/25 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-marea-gold font-medium">
              Explore More
            </span>
            <h3 className="font-serif text-3xl font-light text-marea-teal dark:text-white">
              Other Sanctuaries in Our Collection
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherRooms.map((oRoom) => {
              let oImages: string[] = [];
              try {
                oImages = JSON.parse(oRoom.images);
              } catch {
                oImages = [];
              }

              return (
                <Link
                  key={oRoom.id}
                  href={`/rooms/${oRoom.slug}`}
                  className="group rounded-3xl overflow-hidden bg-white dark:bg-marea-teal/40 border border-marea-gold/30 shadow-md hover:border-marea-gold transition-all"
                >
                  <div className="relative h-52 w-full overflow-hidden">
                    {oImages[0] && (
                      <Image
                        src={oImages[0]}
                        alt={oRoom.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="text-[10px] uppercase tracking-wider text-marea-gold block">
                      {oRoom.viewType}
                    </span>
                    <h4 className="font-serif text-lg font-light text-marea-teal dark:text-white">
                      {oRoom.name}
                    </h4>
                    <span className="font-serif text-sm text-marea-gold font-medium block">
                      From {formatCurrency(oRoom.pricePerNight)} / night
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
