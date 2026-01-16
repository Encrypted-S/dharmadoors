"use client";

import Link from "next/link";
import { useState } from "react";
import { SanghaMapDynamic } from "@/components/map";

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
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Header */}
      <header className="bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              ← DharmaDoors
            </Link>
            <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
              🗺️ SanghaMap
            </h1>
          </div>
          <Link
            href="/sanghamap/submit"
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-colors"
          >
            + Add a Center
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-sm">
              <h2 className="font-semibold text-zinc-900 dark:text-white mb-4">
                Filters
              </h2>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Search by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400"
                />
              </div>

              {/* Tradition Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Tradition
                </label>
                <select
                  value={selectedTradition}
                  onChange={(e) => setSelectedTradition(e.target.value)}
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white"
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
              <button className="w-full px-4 py-2 bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                📍 Near Me
              </button>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-700">
                <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-3">
                  Coverage
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Australia</span>
                    <span className="font-medium text-zinc-900 dark:text-white">4 centers</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">New Zealand</span>
                    <span className="font-medium text-zinc-900 dark:text-white">2 centers</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Map Area */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm overflow-hidden">
              <div className="h-[600px]">
                <SanghaMapDynamic
                  centers={filteredCenters}
                  onCenterClick={(center) => console.log("Clicked:", center)}
                />
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
              Showing {filteredCenters.length} center{filteredCenters.length !== 1 ? 's' : ''} • Add yours to help others find their sangha!
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
