import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { newsletterSchema } from "@/lib/validations/booking";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = newsletterSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const { email } = validation.data;
    const cleanEmail = email.toLowerCase().trim();

    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: cleanEmail },
    });

    if (existing) {
      return NextResponse.json({
        success: true,
        message: "You are already subscribed to the Marea Bay Resort Private Collection newsletter.",
      });
    }

    await prisma.newsletterSubscriber.create({
      data: { email: cleanEmail },
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing. Welcome to the Marea Bay Resort Private Collection.",
    });
  } catch (error: any) {
    console.error("Newsletter error:", error);
    return NextResponse.json(
      { error: "Failed to process subscription" },
      { status: 500 }
    );
  }
}
