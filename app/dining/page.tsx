import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Utensils,
  Wine,
  Sparkles,
  Clock,
  Award,
  ChevronRight,
  Flame,
} from "lucide-react";

export const metadata = {
  title: "Private Dining & Gastronomy | Marea Bay Resort",
  description:
    "Explore Michelin-caliber oceanfront dining at L'Horizon, barefoot beach cuisine at Salt & Timber, and rare vintage cellar tastings at Marea Bay Resort.",
};

const venues = [
  {
    name: "L'Horizon Clifftop Restaurant",
    tagline: "Signature ocean-to-table tasting journeys suspended over the Pacific",
    hours: "Dinner: 18:00 – 22:30 Daily",
    dressCode: "Resort Elegant",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85",
    description:
      "Perched on the highest limestone promontory of the resort, L'Horizon delivers an unhurried seven-course culinary odyssey. Curated in collaboration with Michelin-decorated guest chefs, every course celebrates local sea harvests, indigenous herbs, and sustainable Pacific aquaculture.",
    sampleDishes: [
      "Pacific Bluefin Tuna with Hibiscus Gelee & Imperial Oscietra Caviar",
      "Wood-Fired Spiny Lobster with Fermented Coconut Beurre Blanc",
      "Roasted Sea Bass in Banana Leaf with Charred Heart of Palm",
      "Organic Guanaja Dark Chocolate Sphere with Smoked Sea Salt",
    ],
  },
  {
    name: "Salt & Timber Beach Bar & Grill",
    tagline: "Barefoot coastal dining steps from the turquoise tide",
    hours: "Lunch & Sunset: 11:30 – 19:30 Daily",
    dressCode: "Barefoot Casual",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1400&q=85",
    description:
      "Relax with your toes in powder sand under the shade of mature almond trees. Fresh daily catches grilled over open mangrove charcoal, accompanied by chilled natural wines, freshly squeezed passion fruit mezcalita cocktails, and crudo platters.",
    sampleDishes: [
      "Daily Line-Caught Mahi Mahi with Charred Mango Chimichurri",
      "Fire-Roasted Sweet Corn with Local Smoked Cotija & Lime",
      "Pacific Oyster Duo with Champagne Vinegar Mignonette",
      "Chilled Tropical Fruit Ceviche with Yuzu Sorbet",
    ],
  },
  {
    name: "The Subterranean Wine Vault",
    tagline: "2,400 Curated Grand Crus and Grower Champagnes",
    hours: "Private Tastings: 17:00 – 19:00 (Reservations Required)",
    dressCode: "Smart Casual",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1400&q=85",
    description:
      "Carved into the natural bedrock beneath the resort, our climate-controlled vault houses rare vintages from Burgundy, Bordeaux, Napa Valley, and emergent South American biodynamic estates. Led by our Head Sommelier.",
    sampleDishes: [
      "Vertical Tasting of Premier Cru Chablis paired with Artisanal Cheeses",
      "Old-World Champagne Flight with Oscietra Caviar Blinis",
      "Rare Vintage Port & Single-Estate Cacao Pairings",
    ],
  },
];

import { DiningClient } from "./DiningClient";

export default function DiningPage() {
  return (
    <div className="min-h-screen bg-marea-sand-light dark:bg-marea-teal-night flex flex-col justify-between">
      <Navbar />

      <main className="pt-16 sm:pt-28 pb-12 sm:pb-24 px-2.5 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-10 space-y-1.5 sm:space-y-3">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-marea-gold font-medium">
            <Utensils className="w-3.5 h-3.5" />
            <span>Culinary Philosophy</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-5xl md:text-6xl font-light text-marea-teal dark:text-white tracking-wide">
            Oceanfront Gastronomy
          </h1>
          <p className="text-[11px] sm:text-sm text-neutral-600 dark:text-neutral-300 font-light max-w-lg mx-auto">
            Hyper-local sea harvests, Michelin guest residencies, and candlelit shoreline feasts beneath coastal constellations.
          </p>
        </div>

        {/* Venues Interactive Grid & Search */}
        <DiningClient venues={venues} />
      </main>

      <Footer />
    </div>
  );
}
