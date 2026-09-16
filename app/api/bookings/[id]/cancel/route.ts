import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bookingId = params.id;

    const existing = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { roomType: true },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Reservation not found" },
        { status: 404 }
      );
    }

    if (existing.status === "CANCELLED") {
      return NextResponse.json(
        { message: "Reservation is already cancelled", booking: existing },
        { status: 200 }
      );
    }

    const updated = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: "CANCELLED" },
      include: { roomType: true },
    });

    return NextResponse.json({
      success: true,
      message: "Reservation successfully cancelled. Room inventory has been returned to available stock.",
      booking: updated,
    });
  } catch (error: any) {
    console.error("Cancel booking error:", error);
    return NextResponse.json(
      { error: "Failed to cancel reservation" },
      { status: 500 }
    );
  }
}
