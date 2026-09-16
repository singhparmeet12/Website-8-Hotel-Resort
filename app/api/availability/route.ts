import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { availabilityQuerySchema } from "@/lib/validations/booking";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const checkInParam = searchParams.get("checkIn");
    const checkOutParam = searchParams.get("checkOut");
    const adultsParam = searchParams.get("adults") || "2";
    const childrenParam = searchParams.get("children") || "0";
    const roomTypeIdParam = searchParams.get("roomTypeId") || undefined;

    const validation = availabilityQuerySchema.safeParse({
      checkIn: checkInParam,
      checkOut: checkOutParam,
      adults: adultsParam,
      children: childrenParam,
      roomTypeId: roomTypeIdParam,
    });

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid parameters", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { checkIn, checkOut, adults, children, roomTypeId } = validation.data;
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

    // Fetch rooms that match criteria (occupancy and optional roomTypeId)
    const roomWhereClause: any = {
      maxOccupancy: {
        gte: totalGuests,
      },
    };

    if (roomTypeId) {
      roomWhereClause.id = roomTypeId;
    }

    const rooms = await prisma.roomType.findMany({
      where: roomWhereClause,
      orderBy: { sortOrder: "asc" },
      include: {
        bookings: {
          where: {
            status: "CONFIRMED",
            // Standard overlap: checkIn < requestedCheckOut AND checkOut > requestedCheckIn
            checkIn: {
              lt: requestedCheckOut,
            },
            checkOut: {
              gt: requestedCheckIn,
            },
          },
          select: {
            id: true,
            checkIn: true,
            checkOut: true,
          },
        },
      },
    });

    const results = rooms.map((room) => {
      const overlappingBookingsCount = room.bookings.length;
      const availableRooms = Math.max(0, room.totalRooms - overlappingBookingsCount);
      const isAvailable = availableRooms > 0;
      const subtotal = room.pricePerNight * nights;
      const resortTaxes = Math.round(subtotal * 0.14); // 14% luxury resort tax
      const serviceCharge = Math.round(subtotal * 0.05); // 5% coastal preservation & service charge
      const grandTotal = subtotal + resortTaxes + serviceCharge;

      let parsedAmenities: string[] = [];
      let parsedImages: string[] = [];

      try {
        parsedAmenities = JSON.parse(room.amenities);
      } catch {
        parsedAmenities = [];
      }

      try {
        parsedImages = JSON.parse(room.images);
      } catch {
        parsedImages = [];
      }

      return {
        id: room.id,
        slug: room.slug,
        name: room.name,
        tagline: room.tagline,
        description: room.description,
        pricePerNight: room.pricePerNight,
        maxOccupancy: room.maxOccupancy,
        bedConfig: room.bedConfig,
        sizeSqFt: room.sizeSqFt,
        viewType: room.viewType,
        totalInventory: room.totalRooms,
        bookedCount: overlappingBookingsCount,
        availableRoomsCount: availableRooms,
        isAvailable,
        amenities: parsedAmenities,
        images: parsedImages,
        pricing: {
          nights,
          pricePerNight: room.pricePerNight,
          subtotal,
          resortTaxes,
          serviceCharge,
          grandTotal,
        },
      };
    });

    return NextResponse.json({
      dates: {
        checkIn: requestedCheckIn.toISOString(),
        checkOut: requestedCheckOut.toISOString(),
        nights,
      },
      guests: {
        adults,
        children,
        totalGuests,
      },
      totalRoomTypesChecked: results.length,
      availableRoomTypesCount: results.filter((r) => r.isAvailable).length,
      rooms: results,
    });
  } catch (error: any) {
    console.error("Availability query error:", error);
    return NextResponse.json(
      { error: "Internal server error querying availability" },
      { status: 500 }
    );
  }
}
