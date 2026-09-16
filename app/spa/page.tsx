import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Sparkles,
  Clock,
  Waves,
  Sun,
  ShieldCheck,
  ChevronRight,
  HeartHandshake,
} from "lucide-react";

export const metadata = {
  title: "The Coral Thalassotherapy Spa | Marea Bay Resort",
  description:
    "Restore balance with marine minerals, heated seawater pools, and restorative cliffside open-air pavilions at The Coral Thalassotherapy Spa at Marea Bay Resort.",
};

const treatments = [
  {
    name: "Pacific Brine Thalasso Soak & Body Polish",
    duration: "90 Minutes",
    price: "$380",
    category: "Signature Marine Ritual",
    description:
      "Begins with an active sea salt and crushed spirulina exfoliation, followed by a warm immersion soak in heated deep-ocean seawater rich in magnesium, iodine, and trace marine minerals to stimulate lymphatic circulation.",
  },
  {
    name: "Clifftop Sunset Aromatherapy Massage",
    duration: "75 Minutes",
    price: "$320",
    category: "Restorative Massage",
    description:
      "Conducted in an open-air cedar pavilion overlooking the Pacific horizon. Long, flowing rhythmic strokes utilizing warm organic botanicals and native ylang-ylang oils to dissolve nervous tension as ocean swells roll below.",
  },
  {
    name: "Wild Seaweed Detox Body Cocoon",
    duration: "90 Minutes",
    price: "$390",
    category: "Botanical Detox",
    description:
      "Hand-harvested coastal bladderwrack and kelp applied warm to the body, sealed in natural muslin, and finished with a scalp pressure point massage and cooling aloe mist.",
  },
  {
    name: "Cellular Marine Collagen Radiance Facial",
    duration: "60 Minutes",
    price: "$290",
    category: "Facial Sanctuary",
    description:
      "Utilizing ultra-purified deep sea plankton extracts and cryo-sculpting globes to firm, lift, and replenish moisture at the cellular level.",
  },
  {
    name: "Couples Starlight Sound Bath & Dual Massage",
    duration: "120 Minutes",
    price: "$750",
    category: "Private Couples Ritual",
    description:
      "A private evening pavilion session under the coastal night sky. Features acoustic Tibetan singing bowls attuned to tidal rhythms, full-body warm stone massage, and chilled vintage champagne with artisanal chocolates.",
  },
];

import { SpaClient } from "./SpaClient";

export default function SpaPage() {
  return (
    <div className="min-h-screen bg-marea-sand-light dark:bg-marea-teal-night flex flex-col justify-between">
      <Navbar />

      <main className="pt-16 sm:pt-28 pb-12 sm:pb-24 px-2.5 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-8 space-y-1.5 sm:space-y-3">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-marea-gold font-medium">
            <Waves className="w-3.5 h-3.5" />
            <span>Holistic Marine Sanctuary</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-5xl md:text-6xl font-light text-marea-teal dark:text-white tracking-wide">
            The Coral Thalassotherapy Spa
          </h1>
          <p className="text-[11px] sm:text-sm text-neutral-600 dark:text-neutral-300 font-light max-w-lg mx-auto">
            Deep-sea mineral baths, heated seawater pools, and clifftop open-air pavilions channeling the healing power of the Pacific.
          </p>
        </div>

        {/* Hero Composition */}
        <div className="relative h-40 sm:h-[380px] md:h-[440px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md sm:shadow-2xl border border-marea-gold/30 mb-4 sm:mb-8">
          <Image
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=85"
            alt="The Coral Spa at Marea Bay Resort"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-marea-teal-dark/90 via-black/30 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-8 sm:left-8 sm:right-8 text-white max-w-2xl">
            <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] text-marea-gold font-medium block sm:mb-1">
              Sanctuary Facilities
            </span>
            <h2 className="font-serif text-sm sm:text-3xl md:text-4xl font-light leading-tight">
              Heated Seawater Pools & Open-Air Cliff Pavilions
            </h2>
          </div>
        </div>

        {/* Interactive Rituals & Treatments */}
        <SpaClient treatments={treatments} />
      </main>

      <Footer />
    </div>
  );
}
