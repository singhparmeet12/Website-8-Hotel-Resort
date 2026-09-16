import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function runTests() {
  console.log("=== RUNNING AVAILABILITY & OVERLAP LOGIC TEST SUITE ===");

  const now = new Date();
  const testIn = new Date(now.getTime() + 100 * 24 * 60 * 60 * 1000); // 100 days ahead
  const testOut = new Date(testIn.getTime() + 3 * 24 * 60 * 60 * 1000); // 3 nights

  // 1. Get Clifftop Penthouse (totalRooms = 2)
  const penthouse = await prisma.roomType.findUnique({
    where: { slug: "clifftop-sunset-penthouse" },
  });

  if (!penthouse) {
    throw new Error("Penthouse not found in database");
  }

  console.log(`Testing with Room: ${penthouse.name}, Total Inventory: ${penthouse.totalRooms}`);

  // Clean any old test bookings for this period
  await prisma.booking.deleteMany({
    where: {
      roomTypeId: penthouse.id,
      checkIn: { gte: testIn },
    },
  });

  // Test 1: Zero bookings -> Available = 2
  const count0 = await prisma.booking.count({
    where: {
      roomTypeId: penthouse.id,
      status: "CONFIRMED",
      checkIn: { lt: testOut },
      checkOut: { gt: testIn },
    },
  });
  console.log(`Test 1: Overlapping bookings: ${count0}, Available: ${penthouse.totalRooms - count0} (Expected: 2)`);
  if (penthouse.totalRooms - count0 !== 2) throw new Error("Test 1 Failed");

  // Test 2: Book Room 1
  const b1 = await prisma.booking.create({
    data: {
      referenceNumber: "MBR-TEST-0001",
      roomTypeId: penthouse.id,
      checkIn: testIn,
      checkOut: testOut,
      nights: 3,
      guestsCount: 2,
      adults: 2,
      children: 0,
      guestName: "Test Traveler Alpha",
      guestEmail: "alpha@test.com",
      guestPhone: "+15551234567",
      totalPrice: penthouse.pricePerNight * 3,
      status: "CONFIRMED",
    },
  });
  console.log("Created booking 1:", b1.referenceNumber);

  const count1 = await prisma.booking.count({
    where: {
      roomTypeId: penthouse.id,
      status: "CONFIRMED",
      checkIn: { lt: testOut },
      checkOut: { gt: testIn },
    },
  });
  console.log(`Test 2: Overlapping bookings: ${count1}, Available: ${penthouse.totalRooms - count1} (Expected: 1)`);
  if (penthouse.totalRooms - count1 !== 1) throw new Error("Test 2 Failed");

  // Test 3: Book Room 2 (Max inventory reached)
  const b2 = await prisma.booking.create({
    data: {
      referenceNumber: "MBR-TEST-0002",
      roomTypeId: penthouse.id,
      checkIn: testIn,
      checkOut: testOut,
      nights: 3,
      guestsCount: 2,
      adults: 2,
      children: 0,
      guestName: "Test Traveler Beta",
      guestEmail: "beta@test.com",
      guestPhone: "+15551234568",
      totalPrice: penthouse.pricePerNight * 3,
      status: "CONFIRMED",
    },
  });
  console.log("Created booking 2:", b2.referenceNumber);

  const count2 = await prisma.booking.count({
    where: {
      roomTypeId: penthouse.id,
      status: "CONFIRMED",
      checkIn: { lt: testOut },
      checkOut: { gt: testIn },
    },
  });
  console.log(`Test 3: Overlapping bookings: ${count2}, Available: ${penthouse.totalRooms - count2} (Expected: 0)`);
  if (penthouse.totalRooms - count2 !== 0) throw new Error("Test 3 Failed");

  // Test 4: Boundary non-overlap (checkout day = start day of next booking)
  // New booking from testOut to testOut + 3 days
  const nextOut = new Date(testOut.getTime() + 3 * 24 * 60 * 60 * 1000);
  const boundaryCount = await prisma.booking.count({
    where: {
      roomTypeId: penthouse.id,
      status: "CONFIRMED",
      checkIn: { lt: nextOut },
      checkOut: { gt: testOut },
    },
  });
  console.log(`Test 4: Boundary check after checkout day. Overlaps: ${boundaryCount} (Expected: 0)`);
  if (boundaryCount !== 0) throw new Error("Test 4 Failed: Turnover day counted as overlap");

  // Test 5: Cancel Booking 1 -> Inventory released back
  await prisma.booking.update({
    where: { id: b1.id },
    data: { status: "CANCELLED" },
  });
  const countAfterCancel = await prisma.booking.count({
    where: {
      roomTypeId: penthouse.id,
      status: "CONFIRMED",
      checkIn: { lt: testOut },
      checkOut: { gt: testIn },
    },
  });
  console.log(`Test 5: After cancelling booking 1: Active overlaps = ${countAfterCancel}, Available = ${penthouse.totalRooms - countAfterCancel} (Expected: 1)`);
  if (penthouse.totalRooms - countAfterCancel !== 1) throw new Error("Test 5 Failed");

  // Clean test bookings
  await prisma.booking.deleteMany({
    where: {
      referenceNumber: { in: ["MBR-TEST-0001", "MBR-TEST-0002"] },
    },
  });

  console.log("=== ALL AVAILABILITY & OVERLAP TESTS PASSED SUCCESSFULLY! ===");
}

runTests()
  .catch((e) => {
    console.error("Test failure:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
