import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Marea Bay Resort database...");

  // Clean existing data
  await prisma.booking.deleteMany();
  await prisma.roomType.deleteMany();
  await prisma.newsletterSubscriber.deleteMany();

  // 1. Create Room Types
  const azureVilla = await prisma.roomType.create({
    data: {
      slug: "azure-oceanfront-villa",
      name: "The Azure Oceanfront Villa",
      tagline: "Direct private beach access with an infinity edge plunge pool suspended over the bay",
      description: "An ultra-private oceanfront sanctuary featuring floor-to-ceiling glass pavilions opening onto a cantilevered teak deck. Includes an infinity plunge pool, handcrafted king bed woven from local organic rattan, private outdoor soaking tub, and bespoke 24-hour butler service.",
      pricePerNight: 1450,
      maxOccupancy: 3,
      bedConfig: "1 King Bed + 1 Daybed",
      sizeSqFt: 1850,
      viewType: "Panoramic Oceanfront & Sunset Horizon",
      totalRooms: 4,
      isFeatured: true,
      sortOrder: 1,
      amenities: JSON.stringify([
        "Private Infinity Plunge Pool",
        "24/7 Dedicated Butler Service",
        "Hermès Eau d'Orange Verte Amenities",
        "Direct White Sand Beach Access",
        "Outdoor Rain Shower & Soaking Tub",
        "Daily Sunset Champagne & Caviar",
        "Bang & Olufsen Sound System",
        "Private In-Villa Dining Pavilion"
      ]),
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1920&q=85",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85"
      ]),
    },
  });

  const clifftopPenthouse = await prisma.roomType.create({
    data: {
      slug: "clifftop-sunset-penthouse",
      name: "The Clifftop Sunset Penthouse",
      tagline: "Perched 120 feet above Marea Bay with 270-degree dramatic cliff and ocean vistas",
      description: "The resort's crown jewel. Commanding the highest vantage point of Marea Bay, this dual-level penthouse boasts a heated cantilevered pool, expansive limestone terrace with fire pit, private wine cellar curated with grand crus, and an ocean-facing primary suite.",
      pricePerNight: 2200,
      maxOccupancy: 4,
      bedConfig: "2 King Primary Suites",
      sizeSqFt: 2600,
      viewType: "270° Clifftop Bay & Coastal Horizon",
      totalRooms: 2,
      isFeatured: true,
      sortOrder: 2,
      amenities: JSON.stringify([
        "Heated Cantilevered Pool",
        "Private Helipad Transfer Available",
        "Curated In-Suite Wine Cellar",
        "Limestone Fire Pit Terrace",
        "Personal Sommelier & Chef on Request",
        "Dyson Supersonic Care Kits",
        "Custom Frette 1,000-Thread Linens",
        "Private Keyed Elevator Access"
      ]),
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=85",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85"
      ]),
    },
  });

  const coralSuite = await prisma.roomType.create({
    data: {
      slug: "beachfront-coral-suite",
      name: "Beachfront Coral Suite",
      tagline: "Barefoot luxury stepping directly onto the powdered sands of Marea Bay",
      description: "Designed for effortless coastal living, the Beachfront Coral Suite frames calm crystalline turquoise waters. Relax on your private shaded veranda with oversized daybeds, steps from our protected coral reef.",
      pricePerNight: 980,
      maxOccupancy: 3,
      bedConfig: "1 King Bed or 2 Queens",
      sizeSqFt: 1200,
      viewType: "White Sand Beach & Turquoise Lagoon",
      totalRooms: 6,
      isFeatured: false,
      sortOrder: 3,
      amenities: JSON.stringify([
        "Direct Beachfront Access",
        "Oversized Shaded Daybed Veranda",
        "Deep Soaking Freestanding Stone Tub",
        "Acqua di Parma Bath Amenities",
        "Custom Snorkeling Equipment & Reef Shoes",
        "Artisanal Espresso & Loose Leaf Tea Bar",
        "Twice-Daily Housekeeping with Turndown"
      ]),
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1920&q=85",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85"
      ]),
    },
  });

  const gardenPavilion = await prisma.roomType.create({
    data: {
      slug: "sanctuary-garden-pavilion",
      name: "The Sanctuary Garden Pavilion",
      tagline: "Tucked amidst lush tropical palms with secluded garden plunge pool and courtyard",
      description: "An intimate verdant oasis shaded by towering coconut palms and blooming frangipani. Features an open-air rain courtyard, stone plunge pool, and serene spa-inspired marble bathroom.",
      pricePerNight: 790,
      maxOccupancy: 2,
      bedConfig: "1 Handcrafted King Bed",
      sizeSqFt: 950,
      viewType: "Tropical Botanical Garden & Secret Courtyard",
      totalRooms: 8,
      isFeatured: false,
      sortOrder: 4,
      amenities: JSON.stringify([
        "Secluded Garden Plunge Pool",
        "Open-Air Rain Shower Courtyard",
        "Le Labo Santal 33 Amenities",
        "Private Yoga & Meditation Deck",
        "Nightly Aromatherapy Turndown",
        "Organic Botanical Mini-Bar",
        "Private Woven Hammock Grove"
      ]),
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1920&q=85",
        "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=85"
      ]),
    },
  });

  const coastalSuite = await prisma.roomType.create({
    data: {
      slug: "coastal-bay-master-suite",
      name: "Coastal Bay Master Suite",
      tagline: "Elevated ocean views, expansive living salon, and dual private sunrise balconies",
      description: "Combining generous indoor-outdoor living, the Coastal Bay Master Suite features dual private verandas overlooking the bay, a spacious marble bathroom with double rain showers, and an elegant dining salon.",
      pricePerNight: 1150,
      maxOccupancy: 4,
      bedConfig: "1 King Bed + 1 Queen Sofa Bed",
      sizeSqFt: 1500,
      viewType: "Elevated Marea Bay Panoramic",
      totalRooms: 5,
      isFeatured: false,
      sortOrder: 5,
      amenities: JSON.stringify([
        "Dual Private Ocean Verandas",
        "Separate Living & Dining Salon",
        "Double Rain Showers & Spa Tub",
        "Personalized Pillow & Linen Menu",
        "Illy Espresso Station & Cellar Bar",
        "Priority Spa & Clifftop Dining Reservations",
        "Bespoke Beach Tote & Sun Care Set"
      ]),
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1920&q=85",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85"
      ]),
    },
  });

  // 2. Create Sample Initial Bookings for real overlap demonstration
  // Let's create realistic dates (starting from today + 7 days)
  const now = new Date();
  const sampleStart = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000); // 10 days from now
  const sampleEnd = new Date(sampleStart.getTime() + 4 * 24 * 60 * 60 * 1000); // 4 nights

  // Booking 1 on Azure Villa
  await prisma.booking.create({
    data: {
      referenceNumber: "MBR-2026-A8K2",
      roomTypeId: azureVilla.id,
      checkIn: sampleStart,
      checkOut: sampleEnd,
      nights: 4,
      guestsCount: 2,
      adults: 2,
      children: 0,
      guestName: "Lady Eleanor Vance",
      guestEmail: "eleanor.vance@prestigesuites.co.uk",
      guestPhone: "+44 20 7946 0912",
      specialRequests: "Arriving via private yacht charter. Please chill Dom Pérignon upon arrival.",
      totalPrice: 1450 * 4,
      status: "CONFIRMED",
    },
  });

  // Booking 2 on Clifftop Penthouse (1 out of 2 booked for next month)
  const nextMonthStart = new Date(now.getTime() + 25 * 24 * 60 * 60 * 1000);
  const nextMonthEnd = new Date(nextMonthStart.getTime() + 5 * 24 * 60 * 60 * 1000);

  await prisma.booking.create({
    data: {
      referenceNumber: "MBR-2026-C9X1",
      roomTypeId: clifftopPenthouse.id,
      checkIn: nextMonthStart,
      checkOut: nextMonthEnd,
      nights: 5,
      guestsCount: 3,
      adults: 2,
      children: 1,
      guestName: "Arthur Montgomery",
      guestEmail: "arthur.montgomery@montereycap.com",
      guestPhone: "+1 (415) 892-4411",
      specialRequests: "Helipad transfer requested from international terminal at 14:00.",
      totalPrice: 2200 * 5,
      status: "CONFIRMED",
    },
  });

  // 3. Seed sample newsletter subscribers
  await prisma.newsletterSubscriber.create({
    data: {
      email: "concierge@wanderlust-private.com",
    },
  });

  console.log("Marea Bay Resort seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
