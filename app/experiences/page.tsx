import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Compass,
  Clock,
  Sparkles,
  Ship,
  Waves,
  Sun,
  Award,
  ChevronRight,
} from "lucide-react";

export const metadata = {
  title: "Sanctuary Experiences | Marea Bay Resort",
  description:
    "Discover bespoke Pacific excursions, sunset catamaran sailing, guided bioluminescent diving, and private clifftop leisure at Marea Bay Resort.",
};

const fullExperiences = [
  {
    id: "catamaran",
    title: "Private 54-Foot Sunset Catamaran Charter",
    category: "Marine Voyage",
    duration: "4 Hours (Departing 16:30 Daily)",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85",
    description:
      "Set sail along the dramatic limestone sea cliffs of Costa Pacifica aboard our custom 54-foot luxury catamaran. Includes chilled vintage champagne, artisanal local ceviche and canapés prepared by your private onboard chef, and secluded cove anchoring for sunset swimming.",
    highlights: ["Dedicated Skipper & Private Chef", "Chilled Dom Pérignon Bar", "Snorkeling in Secret Coves", "Acoustic Sunset Playlist"],
  },
  {
    id: "bioluminescence",
    title: "Guided Bioluminescent Coral Reef Diving",
    category: "UNESCO Biosphere",
    duration: "2.5 Hours (Twilight & Night)",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1400&q=85",
    description:
      "Accompany resident marine biologists into the protected Marea Bay lagoon as night falls. Witness billions of microscopic dinoflagellates illuminate the warm water with radiant neon-blue light with every paddle stroke.",
    highlights: ["Marine Biologist Guidance", "High-Definition Underwater Cameras Provided", "Protected Coral Reserve Access", "Warm Herbal Tea Post-Dive"],
  },
  {
    id: "cabanas",
    title: "Clifftop Cantilevered Pool & Daybed Cabanas",
    category: "Leisure & Solitude",
    duration: "Full-Day Access",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1400&q=85",
    description:
      "Perched 120 feet directly above crashing Pacific breakers, our heated freshwater cantilevered pool seems to dissolve into the horizon. Reserve an organic teak cabana with dedicated attendant service.",
    highlights: ["Dedicated Cabana Butler", "Iced Citrus Mist & Cold Towels", "Hourly Artisanal Fruit & Popsicle Service", "High-Fidelity Personal Audio"],
  },
  {
    id: "turtle",
    title: "Coastal Sea Turtle Nesting Sanctuary Patrol",
    category: "Conservation",
    duration: "3 Hours (Dawn or Dusk)",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85",
    description:
      "Participate in our resort-sponsored ocean turtle preservation program. Walk the secluded 1.8km shoreline alongside conservation rangers to monitor Olive Ridley and Hawksbill hatchlings making their maiden voyage to the sea.",
    highlights: ["100% Non-Invasive Conservation", "Direct Contribution to Marine Fund", "Sunrise Light Breakfast Included", "Family & Children Welcomed"],
  },
];

import { ExperiencesClient } from "./ExperiencesClient";

export default function ExperiencesPage() {
  return (
    <div className="min-h-screen bg-marea-sand-light dark:bg-marea-teal-night flex flex-col justify-between">
      <Navbar />

      <main className="pt-16 sm:pt-28 pb-12 sm:pb-24 px-2.5 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        {/* Editorial Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-10 space-y-1.5 sm:space-y-3">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-marea-gold font-medium">
            <Compass className="w-3.5 h-3.5" />
            <span>Curated Pursuits</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-5xl md:text-6xl font-light text-marea-teal dark:text-white tracking-wide">
            Sanctuary Experiences
          </h1>
          <p className="text-[11px] sm:text-sm text-neutral-600 dark:text-neutral-300 font-light max-w-lg mx-auto">
            Sunset sailing catamaran charters, guided bioluminescent dives, and clifftop cabana leisure tailored to Costa Pacifica.
          </p>
        </div>

        {/* Interactive Client with Mobile Grid & Search */}
        <ExperiencesClient experiences={fullExperiences} />
      </main>

      <Footer />
    </div>
  );
}
