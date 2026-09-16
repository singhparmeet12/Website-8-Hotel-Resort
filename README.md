# Marea Bay Resort & Sanctuary

> **Portfolio Piece #8 of 12** — An immersive, elegant luxury oceanfront resort web application built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Prisma ORM**.

Designed with a distinct luxury hospitality aesthetic: full-screen auto-advancing slideshow imagery, a persistent floating booking widget with real overlap availability querying, refined Cormorant Garamond serif typography, and a deep oceanic teal-and-warm-gold palette (`#0F3D3E`, `#C9A45C`, `#F3E9DA`, and `#0A2426` in dark mode).

---

## Key Features & Architecture

### 1. Persistent Floating Booking Widget (Centerpiece Feature)
- Positioned prominently as an anchor in the lower hero region.
- On scroll past the hero threshold, smoothly morphs into a floating, pill-shaped sticky mini-bar with glowing gold accents.
- Responsive mobile-first design: collapses into a thumb-friendly bottom bar that triggers the full multi-step reservation drawer.
- Inputs for Check-In, Check-Out, Adult & Child steppers with max occupancy validation, and instant live inventory search.

### 2. Real Date-Range Overlap Availability Engine
Unlike basic applications that rely on static availability flags or flat room counters, **Marea Bay Resort** enforces strict date-range overlap calculation at the database level:
- For any requested interval $[D_{in}, D_{out}]$, an existing reservation overlaps if and only if:
  $$\text{booking.checkIn} < D_{out} \quad\text{and}\quad \text{booking.checkOut} > D_{in} \quad\text{and}\quad \text{booking.status} = \text{'CONFIRMED'}$$
- Check-out days do not conflict with check-in days for the next guest (standard hotel room turnover).
- Available room inventory is calculated as:
  $$\text{availableRooms} = \text{roomType.totalRooms} - \text{overlappingBookingsCount}$$
- When reserving, a **Prisma interactive transaction** locks and re-evaluates the overlap count immediately prior to inserting the booking, preventing concurrent overbooking.

### 3. Alternating Suites & Villas Showcase
- Large, alternating full-width and half-width editorial panels (NOT a uniform grid).
- Shows high-resolution photography, view vantage, living area, bed configuration, starting price, and direct "Check Availability" triggers.
- "Explore Suite" opens an interactive modal with a **smooth crossfade lightbox gallery**, full specifications, and Hermès/Acqua di Parma amenities.

### 4. Interactive Resort Experiences Slider
- Horizontally scrolling showcase with drag & touch-scroll support.
- Featuring the Coral Thalassotherapy Spa, Clifftop Dining at L'Horizon, Sunset Catamaran Charters, Cantilevered Pool, and Bioluminescent Reef Diving.

### 5. Curated Gallery & Guest Accolades
- Offset masonry photography gallery with crossfade lightbox modal.
- Rotating guest reviews in Cormorant Garamond italic pull quotes with Forbes 5-Star badges.

### 6. Cartographic Nautical Arrival Map & Transports
- Custom styled nautical chart with interactive pins (Resort, Helipad, Private Marina, Lagoon Biosphere).
- Details on private seaplane flights, yacht docking, and chauffeur transfers.

### 7. Manage Reservations Portal (`/manage-booking`)
- Look up reservations by booking reference (e.g., `MBR-2026-A8K2`) and email.
- Real-time cancellation that restores inventory back to the live booking pool.

---

## Design System & Color Palette

| Token | Light Mode | Dark Mode | Usage |
| :--- | :--- | :--- | :--- |
| **Ocean Teal** | `#0F3D3E` | `#0A2426` / `#061819` | Brand primary, hero overlays, glassmorphic card base |
| **Warm Gold** | `#C9A45C` | `#E5C378` / `#F0D89F` | Premium accent, CTAs, icons, borders, active indicators |
| **Soft Sand** | `#F3E9DA` / `#FAF6F0` | `#0A2426` (surfaces) | Light backgrounds, card backgrounds, typography contrast |
| **Typography** | Cormorant Garamond | Cormorant Garamond | Headings, pull quotes, display numerals |
| **Body / UI** | Jost / Karla | Jost / Karla | Clean, legible UI controls, specs, paragraphs |

---

## Getting Started

### Prerequisites
- Node.js 18.17+ or 20+
- npm 9+ or pnpm or yarn

### Installation & Setup

```bash
# 1. Clone or navigate to the repository
cd "c:/Parmeet/12 websites/Website 8 hotel resort"

# 2. Install dependencies
npm install

# 3. Synchronize database schema (SQLite locally)
npx prisma db push

# 4. Seed room inventory and sample bookings
npm run prisma:seed

# 5. Run the automated availability & overlap test suite
npx tsx scripts/test-availability.ts

# 6. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Database Schema Overview

```prisma
model RoomType {
  id            String    @id @default(cuid())
  slug          String    @unique
  name          String
  tagline       String
  description   String
  pricePerNight Float
  maxOccupancy  Int
  bedConfig     String
  sizeSqFt      Int
  viewType      String
  amenities     String    // JSON string array
  images        String    // JSON string array
  totalRooms    Int       // Physical room inventory count
  isFeatured    Boolean   @default(false)
  sortOrder     Int       @default(0)
  bookings      Booking[]
}

model Booking {
  id              String    @id @default(cuid())
  referenceNumber String    @unique
  roomTypeId      String
  roomType        RoomType  @relation(fields: [roomTypeId], references: [id])
  checkIn         DateTime
  checkOut        DateTime
  nights          Int
  guestsCount     Int
  adults          Int
  children        Int
  guestName       String
  guestEmail      String
  guestPhone      String
  specialRequests String?
  totalPrice      Float
  status          String    @default("CONFIRMED")
}
```

---

## Vercel Zero-Config Deployment

1. Push this repository to GitHub.
2. Import project into Vercel.
3. For local SQLite development, no extra configuration is needed. For production with persistent serverless PostgreSQL, connect a **Vercel Postgres** database and set `DATABASE_URL` in Vercel Environment Variables.
4. Deploy! Next.js App Router and Prisma build automatically via `npm run build`.
