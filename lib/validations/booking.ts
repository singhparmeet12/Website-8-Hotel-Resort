import { z } from "zod";

export const availabilityQuerySchema = z.object({
  checkIn: z.string().min(1, "Check-in date is required"),
  checkOut: z.string().min(1, "Check-out date is required"),
  adults: z.coerce.number().int().min(1, "At least 1 adult is required").default(2),
  children: z.coerce.number().int().min(0).default(0),
  roomTypeId: z.string().optional(),
}).refine((data) => {
  const checkInDate = new Date(data.checkIn);
  const checkOutDate = new Date(data.checkOut);
  return checkOutDate > checkInDate;
}, {
  message: "Check-out date must be after check-in date",
  path: ["checkOut"],
});

export const createBookingSchema = z.object({
  roomTypeId: z.string().min(1, "Room type is required"),
  checkIn: z.string().min(1, "Check-in date is required"),
  checkOut: z.string().min(1, "Check-out date is required"),
  adults: z.number().int().min(1, "At least 1 adult is required"),
  children: z.number().int().min(0).default(0),
  guestName: z.string().trim().min(2, "Full name must be at least 2 characters").max(100),
  guestEmail: z.string().trim().email("Invalid email address"),
  guestPhone: z.string().trim().min(7, "Valid contact telephone required").max(25),
  specialRequests: z.string().trim().max(500).optional().default(""),
}).refine((data) => {
  const checkInDate = new Date(data.checkIn);
  const checkOutDate = new Date(data.checkOut);
  return checkOutDate > checkInDate;
}, {
  message: "Check-out date must be after check-in date",
  path: ["checkOut"],
});

export const newsletterSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
});
