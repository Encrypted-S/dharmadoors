"use client";

import Link from "next/link";
import { useState } from "react";
import { SanghaMapDynamic } from "@/components/map";
import { ChevronRight, MapPin, Plus, Search } from "lucide-react";

// Sample centers for initial demo - AU/NZ focus
const SAMPLE_CENTERS = [
  {
    id: "1",
    name: "Bodhinyana Monastery",
    latitude: -34.4108,
    longitude: 116.0683,
    tradition: "theravada",
    city: "Serpentine",
    country: "Australia",
    website: "https://bswa.org/location/bodhinyana-monastery/",
  },
  {
    id: "2",
    name: "Nan Tien Temple",
    latitude: -34.4769,
    longitude: 150.8577,
    tradition: "mahayana",
    city: "Wollongong",
    country: "Australia",
    website: "https://www.nantien.org.au/",
  },
  {
    id: "3",
    name: "Sydney Zen Centre",
    latitude: -33.8888,
    longitude: 151.1783,
    tradition: "zen",
    city: "Annandale",
    country: "Australia",
    website: "https://szc.org.au/",
  },
  {
    id: "4",
    name: "Tara Institute",
    latitude: -37.8544,
    longitude: 145.0073,
    tradition: "vajrayana",
    city: "Brighton East",
    country: "Australia",
    website: "https://tarainstitute.org.au/",
  },
  {
    id: "5",
    name: "Auckland Buddhist Centre",
    latitude: -36.8619,
    longitude: 174.7668,
    tradition: "multi_tradition",
    city: "Auckland",
    country: "New Zealand",
    website: "https://aucklandbuddhistcentre.org/",
  },
  {
    id: "6",
    name: "Bodhinyanarama Monastery",
    latitude: -41.1969,
    longitude: 175.0075,
    tradition: "theravada",
    city: "Stokes Valley",
    country: "New Zealand",
    website: "https://bodhinyanarama.net.nz/",
  },
];

export default function SanghaMapPage() {
  const [selectedTradition, setSelectedTradition] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter centers based on selection
  const filteredCenters = SAMPLE_CENTERS.filter((center) => {
    const matchesTradition = !selectedTradition || center.tradition === selectedTradition;
    const matchesSearch = !searchQuery ||
      center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.city?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTradition && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="bg-[var(--card-bg)]/95 backdrop-blur-sm border-b border-[var(--card-border)] sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm">
              <Link
                href="/"
                className="text-[var(--color-warm-gray)] hover:text-[var(--foreground)] transition-colors"
              >
                DharmaDoors
              </Link>
              <ChevronRight className="w-4 h-4 text-[var(--color-mist)]" />
              <span className="text-[var(--foreground)] font-medium">SanghaMap</span>
            </nav>

            <Link
              href="/sanghamap/submit"
              className="inline-flex items-center gap-2 px-4 py-2
                bg-[var(--color-saffron)] hover:bg-[var(--color-saffron-dark)]
                text-white rounded-lg font-medium text-sm
                shadow-sm hover:shadow-md
                hover:scale-[0.98] active:scale-[0.96]
                transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              Add a Center
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-[var(--card-bg)] rounded-xl p-6 shadow-sm border border-[var(--card-border)]">
              <h2 className="font-semibold text-[var(--foreground)] mb-6 tracking-wide">
                Filters
              </h2>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[var(--color-warm-gray)] mb-2 tracking-wide">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-dharma-tan)]" />
                  <input
                    type="text"
                    placeholder="Name or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5
                      border border-[var(--card-border)] rounded-lg
                      bg-[var(--background)] text-[var(--foreground)]
                      placeholder-[var(--color-dharma-tan)]
                      focus:border-[var(--color-saffron)]/60 focus:ring-2 focus:ring-[var(--color-saffron)]/10
                      transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Tradition Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[var(--color-warm-gray)] mb-2 tracking-wide">
                  Tradition
                </label>
                <select
                  value={selectedTradition}
                  onChange={(e) => setSelectedTradition(e.target.value)}
                  className="w-full px-4 py-2.5
                    border border-[var(--card-border)] rounded-lg
                    bg-[var(--background)] text-[var(--foreground)]
                    focus:border-[var(--color-saffron)]/60 focus:ring-2 focus:ring-[var(--color-saffron)]/10
                    transition-colors duration-200"
                >
                  <option value="">All Traditions</option>
                  <option value="theravada">Theravada</option>
                  <option value="mahayana">Mahayana</option>
                  <option value="vajrayana">Vajrayana/Tibetan</option>
                  <option value="zen">Zen/Chan</option>
                  <option value="pure_land">Pure Land</option>
                  <option value="secular">Secular</option>
                  <option value="multi_tradition">Multi-tradition</option>
                </select>
              </div>

              {/* Near Me Button */}
              <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5
                bg-[var(--color-mist)] dark:bg-[var(--card-border)]
                hover:bg-[var(--color-dharma-tan-light)]/50
                text-[var(--foreground)] rounded-lg font-medium text-sm
                transition-all duration-200"
              >
                <MapPin className="w-4 h-4" />
                Near Me
              </button>

              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t border-[var(--card-border)]">
                <h3 className="text-xs font-medium text-[var(--color-dharma-tan)] mb-4 uppercase tracking-wider">
                  Coverage
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--color-warm-gray)]">Australia</span>
                    <span className="font-medium text-[var(--foreground)]">4 centers</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-warm-gray)]">New Zealand</span>
                    <span className="font-medium text-[var(--foreground)]">2 centers</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Map Area */}
          <div className="lg:col-span-3">
            <div className="bg-[var(--card-bg)] rounded-xl shadow-md overflow-hidden border border-[var(--card-border)]">
              <div className="h-[600px]">
                <SanghaMapDynamic
                  centers={filteredCenters}
                  onCenterClick={(center) => console.log("Clicked:", center)}
                />
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 flex items-center gap-2 text-sm text-[var(--color-warm-gray)]">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[var(--color-saffron)]" />
                {filteredCenters.length} center{filteredCenters.length !== 1 ? 's' : ''} found
              </span>
              <span className="text-[var(--color-mist)]">•</span>
              <span>Add yours to help others find their sangha</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
