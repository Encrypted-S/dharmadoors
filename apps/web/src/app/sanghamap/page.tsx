import Link from "next/link";

export default function SanghaMapPage() {
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

      {/* Main Content - Map Placeholder */}
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
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400"
                />
              </div>

              {/* Tradition Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Tradition
                </label>
                <select className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white">
                  <option value="">All Traditions</option>
                  <option value="theravada">Theravada</option>
                  <option value="mahayana">Mahayana</option>
                  <option value="vajrayana">Vajrayana/Tibetan</option>
                  <option value="zen">Zen/Chan</option>
                  <option value="pure_land">Pure Land</option>
                  <option value="secular">Secular</option>
                </select>
              </div>

              {/* Near Me Button */}
              <button className="w-full px-4 py-2 bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                📍 Near Me
              </button>
            </div>
          </aside>

          {/* Map Area */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm overflow-hidden">
              {/* Map Placeholder */}
              <div className="h-[600px] bg-gradient-to-br from-amber-100 to-amber-50 dark:from-zinc-700 dark:to-zinc-800 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">🗺️</div>
                  <h3 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200 mb-2">
                    Map Coming Soon
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 max-w-md">
                    Interactive Leaflet map will appear here, showing Buddhist
                    centers across Australia and New Zealand to start.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    <span className="px-3 py-1 bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-full text-sm">
                      🧘 Theravada
                    </span>
                    <span className="px-3 py-1 bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-sm">
                      🏔️ Tibetan
                    </span>
                    <span className="px-3 py-1 bg-green-200 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                      🎋 Zen
                    </span>
                    <span className="px-3 py-1 bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                      🪷 Pure Land
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
              Showing 0 centers • Add yours to help others find their sangha!
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
