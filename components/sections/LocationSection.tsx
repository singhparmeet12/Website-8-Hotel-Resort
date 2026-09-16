"use client";

import React, { useState } from "react";
import {
  Compass,
  Plane,
  Ship,
  Car,
  MapPin,
  ExternalLink,
  Anchor,
  Sparkles,
} from "lucide-react";

interface Landmark {
  id: string;
  name: string;
  category: string;
  distance: string;
  description: string;
  coords: { x: number; y: number }; // percentage coordinates on custom map
}

const landmarks: Landmark[] = [
  {
    id: "resort",
    name: "Marea Bay Resort & Helipad",
    category: "Main Sanctuary",
    distance: "0 km",
    description: "Private villas, clifftop dining pavilion, and primary arrival lounge with concierge dock.",
    coords: { x: 50, y: 52 },
  },
  {
    id: "marina",
    name: "Marea Private Yacht Marina",
    category: "Arrivals",
    distance: "600 m",
    description: "Deepwater moorings accommodating vessels up to 180ft with full tender service.",
    coords: { x: 34, y: 68 },
  },
  {
    id: "lagoon",
    name: "Bioluminescent Lagoon & Coral Reef",
    category: "Marine Preserve",
    distance: "1.2 km",
    description: "Protected UNESCO biosphere home to sea turtles, manta rays, and pristine brain corals.",
    coords: { x: 74, y: 44 },
  },
  {
    id: "clifftop",
    name: "Punta Marea Sunset Vista",
    category: "Scenic Lookouts",
    distance: "800 m",
    description: "Elevated limestone promontory offering 360-degree Pacific ocean vistas and stargazing decks.",
    coords: { x: 42, y: 28 },
  },
];

export function LocationSection() {
  const [activePin, setActivePin] = useState<Landmark>(landmarks[0]);

  return (
    <section
      id="location"
      className="py-12 md:py-36 px-3 sm:px-6 md:px-12 bg-marea-sand-light dark:bg-marea-teal-dark transition-colors duration-500 relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-16 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-marea-gold font-medium">
            <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Destination & Arrival</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-5xl md:text-6xl font-light text-marea-teal dark:text-white tracking-wide">
            Getting to Marea Bay
          </h2>
          <p className="text-xs sm:text-base text-neutral-600 dark:text-neutral-300 font-light max-w-lg mx-auto">
            A secluded peninsula accessible by private seaplane, private yacht, or luxury chauffeur transfer.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Custom Teal & Gold Interactive Cartographic Map */}
          <div className="lg:col-span-7 relative">
            <div className="relative w-full h-[320px] sm:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden border border-marea-gold/40 shadow-xl bg-[#082022] p-3 sm:p-6 flex flex-col justify-between">
              {/* Cartographic Coastal Lines SVG */}
              <svg
                className="absolute inset-0 w-full h-full opacity-35"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="grid-carto"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="#C9A45C"
                      strokeWidth="0.5"
                      strokeOpacity="0.25"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-carto)" />
                <path
                  d="M 30,120 Q 180,60 300,160 T 580,240 T 780,380"
                  fill="none"
                  stroke="#C9A45C"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  strokeOpacity="0.4"
                />
                <circle cx="50%" cy="52%" r="130" fill="none" stroke="#C9A45C" strokeWidth="0.5" strokeDasharray="2 6" strokeOpacity="0.3" />
                <circle cx="50%" cy="52%" r="200" fill="none" stroke="#C9A45C" strokeWidth="0.5" strokeOpacity="0.15" />
              </svg>

              {/* Map Top Bar */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-marea-gold/30 text-[10px] text-marea-gold">
                  <Anchor className="w-3.5 h-3.5" />
                  <span>Interactive Nautical Survey</span>
                </div>
                <span className="text-[10px] text-neutral-400 font-mono hidden sm:inline">
                  9° 32&apos; N, 84° 17&apos; W
                </span>
              </div>

              {/* Interactive Landmark Coordinates Over Map */}
              <div className="relative z-10 w-full h-full my-auto flex items-center justify-center">
                {landmarks.map((mark) => {
                  const isSelected = activePin.id === mark.id;
                  return (
                    <button
                      key={mark.id}
                      onClick={() => setActivePin(mark)}
                      style={{
                        left: `${mark.coords.x}%`,
                        top: `${mark.coords.y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      className={`absolute group flex flex-col items-center cursor-pointer transition-all duration-300 ${
                        isSelected ? "scale-110 z-30" : "hover:scale-105 z-20"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                          isSelected
                            ? "bg-marea-gold text-marea-teal-dark shadow-gold-glow ring-4 ring-marea-gold/30"
                            : "glass-teal-luxury text-marea-gold border border-marea-gold/50 group-hover:border-marea-gold"
                        }`}
                      >
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <span className="mt-0.5 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] bg-black/75 backdrop-blur-sm text-white border border-marea-gold/30 font-medium whitespace-nowrap shadow-md">
                        {mark.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Pin Details Floating Badge */}
              <div className="relative z-10 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl glass-teal-luxury border border-marea-gold/40 text-white max-w-sm">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-marea-gold font-medium">
                    {activePin.category} • {activePin.distance}
                  </span>
                </div>
                <h4 className="font-serif text-sm sm:text-lg font-light text-white">
                  {activePin.name}
                </h4>
                <p className="text-[10px] sm:text-xs text-white/80 font-light mt-0.5 line-clamp-2">
                  {activePin.description}
                </p>
              </div>
            </div>
          </div>

          {/* Transport Arrival Information - Compact on mobile */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div className="space-y-1 sm:space-y-2">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-marea-gold font-medium block">
                Arrival Concierge
              </span>
              <h3 className="font-serif text-xl sm:text-3xl font-light text-marea-teal dark:text-white">
                Effortless Private Transfers
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-light leading-relaxed">
                Dedicated seaplane fleet, marine yacht transfers, or private chauffeur options.
              </p>
            </div>

            <div className="space-y-2 sm:space-y-3">
              {/* Seaplane */}
              <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-marea-teal/40 border border-marea-gold/25 hover:border-marea-gold transition-all duration-300 flex items-start gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-marea-gold/15 text-marea-gold flex items-center justify-center shrink-0">
                  <Plane className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-xs sm:text-base font-medium text-marea-teal dark:text-white">
                    Private Seaplane Flights
                  </h4>
                  <p className="text-[10px] sm:text-xs text-neutral-600 dark:text-neutral-400 font-light mt-0.5">
                    Direct 40-minute scenic flight from SJO touching down on Marea Bay lagoon.
                  </p>
                </div>
              </div>

              {/* Yacht Transfer */}
              <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-marea-teal/40 border border-marea-gold/25 hover:border-marea-gold transition-all duration-300 flex items-start gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-marea-gold/15 text-marea-gold flex items-center justify-center shrink-0">
                  <Ship className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-xs sm:text-base font-medium text-marea-teal dark:text-white">
                    Private Yacht Docking & Tenders
                  </h4>
                  <p className="text-[10px] sm:text-xs text-neutral-600 dark:text-neutral-400 font-light mt-0.5">
                    Full marina facilities with 24-hour tender service and customs clearance.
                  </p>
                </div>
              </div>

              {/* Chauffeur */}
              <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-marea-teal/40 border border-marea-gold/25 hover:border-marea-gold transition-all duration-300 flex items-start gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-marea-gold/15 text-marea-gold flex items-center justify-center shrink-0">
                  <Car className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-xs sm:text-base font-medium text-marea-teal dark:text-white">
                    Chauffeur SUV Coastal Route
                  </h4>
                  <p className="text-[10px] sm:text-xs text-neutral-600 dark:text-neutral-400 font-light mt-0.5">
                    Mercedes-Maybach luxury SUVs with Wi-Fi and refreshments through the rain forest.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
