import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createBookingSchema } from "@/lib/validations/booking";
import { generateBookingReference } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = createBookingSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.format() },
        { status: 400 }
      );
    }

    const {
      roomTypeId,
      checkIn,
      checkOut,
      adults,
      children,
      guestName,
      guestEmail,
      guestPhone,
      specialRequests,
    } = validation.data;

    const requestedCheckIn = new Date(checkIn);
    const requestedCheckOut = new Date(checkOut);
    const totalGuests = adults + children;

    const nights = Math.max(
      1,
      Math.round(
        (requestedCheckOut.getTime() - requestedCheckIn.getTime()) /
          (1000 * 60 * 60 * 24)
      )
    );

    // Execute atomic reservation in a transaction to prevent overbooking
    const bookingResult = await prisma.$transaction(async (tx) => {
      // 1. Fetch the target room type
      const roomType = await tx.roomType.findUnique({
        where: { id: roomTypeId },
      });

      if (!roomType) {
        throw new Error("ROOM_NOT_FOUND");
      }

      // Check max occupancy
      if (totalGuests > roomType.maxOccupancy) {
        throw new Error("EXCEEDS_MAX_OCCUPANCY");
      }

      // 2. Count overlapping confirmed bookings
      const overlappingBookingsCount = await tx.booking.count({
        where: {
          roomTypeId: roomType.id,
          status: "CONFIRMED",
          checkIn: {
            lt: requestedCheckOut,
          },
          checkOut: {
            gt: requestedCheckIn,
          },
        },
      });

      // 3. Prevent overbooking if inventory is full
      if (overlappingBookingsCount >= roomType.totalRooms) {
        throw new Error("SOLD_OUT");
      }

      // 4. Calculate pricing
      const subtotal = roomType.pricePerNight * nights;
      const resortTaxes = Math.round(subtotal * 0.14);
      const serviceCharge = Math.round(subtotal * 0.05);
      const grandTotal = subtotal + resortTaxes + serviceCharge;

      // 5. Generate unique reference number
      let referenceNumber = generateBookingReference();
      let isUnique = false;
      while (!isUnique) {
        const existing = await tx.booking.findUnique({
          where: { referenceNumber },
        });
        if (!existing) {
          isUnique = true;
        } else {
          referenceNumber = generateBookingReference();
        }
      }

      // 6. Create confirmed reservation
      const newBooking = await tx.booking.create({
        data: {
          referenceNumber,
          roomTypeId: roomType.id,
          checkIn: requestedCheckIn,
          checkOut: requestedCheckOut,
          nights,
          guestsCount: totalGuests,
          adults,
          children,
          guestName,
          guestEmail,
          guestPhone,
          specialRequests: specialRequests || null,
          totalPrice: grandTotal,
          status: "CONFIRMED",
        },
        include: {
          roomType: true,
        },
      });

      return {
        booking: newBooking,
        remainingInventory: roomType.totalRooms - (overlappingBookingsCount + 1),
        priceBreakdown: {
          nights,
          pricePerNight: roomType.pricePerNight,
          subtotal,
          resortTaxes,
          serviceCharge,
          grandTotal,
        },
      };
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your luxury reservation at Marea Bay Resort is confirmed.",
        booking: {
          id: bookingResult.booking.id,
          referenceNumber: bookingResult.booking.referenceNumber,
          roomName: bookingResult.booking.roomType.name,
          checkIn: bookingResult.booking.checkIn.toISOString(),
          checkOut: bookingResult.booking.checkOut.toISOString(),
          nights: bookingResult.booking.nights,
          guestsCount: bookingResult.booking.guestsCount,
          adults: bookingResult.booking.adults,
          children: bookingResult.booking.children,
          guestName: bookingResult.booking.guestName,
          guestEmail: bookingResult.booking.guestEmail,
          guestPhone: bookingResult.booking.guestPhone,
          specialRequests: bookingResult.booking.specialRequests,
          status: bookingResult.booking.status,
          totalPrice: bookingResult.booking.totalPrice,
          createdAt: bookingResult.booking.createdAt.toISOString(),
          remainingInventoryForDates: bookingResult.remainingInventory,
          pricing: bookingResult.priceBreakdown,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Booking error:", error);

    if (error.message === "SOLD_OUT") {
      return NextResponse.json(
        {
          error: "Selected room type is fully booked for these dates. Please select alternative dates or a different suite.",
          code: "ROOM_SOLD_OUT",
        },
        { status: 409 }
      );
    }

    if (error.message === "EXCEEDS_MAX_OCCUPANCY") {
      return NextResponse.json(
        {
          error: "The number of guests exceeds the maximum occupancy for this room type.",
          code: "OCCUPANCY_EXCEEDED",
        },
        { status: 400 }
      );
    }

    if (error.message === "ROOM_NOT_FOUND") {
      return NextResponse.json(
        { error: "Room type not found.", code: "ROOM_NOT_FOUND" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred while confirming your reservation." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get("reference");
    const email = searchParams.get("email");

    if (reference) {
      const whereClause: any = {
        referenceNumber: reference.trim().toUpperCase(),
      };
      if (email) {
        whereClause.guestEmail = email.trim().toLowerCase();
      }

      const booking = await prisma.booking.findFirst({
        where: whereClause,
        include: {
          roomType: true,
        },
      });

      if (!booking) {
        return NextResponse.json(
          { error: "No reservation found matching this reference." },
          { status: 404 }
        );
      }

      return NextResponse.json({ booking });
    }

    // Default: fetch latest bookings for admin overview / management
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      include: {
        roomType: {
          select: {
            name: true,
            slug: true,
            totalRooms: true,
            pricePerNight: true,
          },
        },
      },
    });

    return NextResponse.json({ bookings });
  } catch (error: any) {
    console.error("Fetch bookings error:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
