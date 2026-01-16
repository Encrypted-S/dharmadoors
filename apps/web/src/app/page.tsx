import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-zinc-900 dark:to-black">
      <main className="container mx-auto px-4 py-16 md:py-24">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-4">
            DharmaDoors
          </h1>
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-2">
            Opening doors to the dharma
          </p>
          <p className="text-lg text-zinc-500 dark:text-zinc-500">
            Digital tools for the Buddhist community
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {/* SanghaMap - Active */}
          <Link
            href="/sanghamap"
            className="group relative bg-white dark:bg-zinc-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-amber-200 dark:border-amber-900"
          >
            <div className="absolute top-4 right-4 px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-xs rounded-full font-medium">
              Live
            </div>
            <div className="text-4xl mb-4">🗺️</div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              SanghaMap
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Find Buddhist temples, monasteries, and meditation centers worldwide.
              Filter by tradition, offerings, and location.
            </p>
          </Link>

          {/* DharmaHub - Coming Soon */}
          <div className="relative bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl p-8 opacity-60">
            <div className="absolute top-4 right-4 px-2 py-1 bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 text-xs rounded-full font-medium">
              Coming Soon
            </div>
            <div className="text-4xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-zinc-700 dark:text-zinc-300 mb-2">
              DharmaHub
            </h2>
            <p className="text-zinc-500 dark:text-zinc-500">
              Aggregated Buddhist content - texts, audio, video, and courses from
              across traditions.
            </p>
          </div>

          {/* DharmaAccess - Coming Soon */}
          <div className="relative bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl p-8 opacity-60">
            <div className="absolute top-4 right-4 px-2 py-1 bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 text-xs rounded-full font-medium">
              Coming Soon
            </div>
            <div className="text-4xl mb-4">♿</div>
            <h2 className="text-2xl font-bold text-zinc-700 dark:text-zinc-300 mb-2">
              DharmaAccess
            </h2>
            <p className="text-zinc-500 dark:text-zinc-500">
              Accessible dharma for all - text-to-speech, transcripts, and tools
              for deaf and blind practitioners.
            </p>
          </div>
        </div>

        {/* Philosophy */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-4">
            Built with Dana
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            DharmaDoors is free for everyone and always will be. Following the
            Buddhist tradition of generosity, these tools are offered freely and
            sustained by donations.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/Encrypted-S/dharmadoors"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View on GitHub
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-zinc-500 dark:text-zinc-500">
          <p className="mb-2">
            &quot;Thousands of candles can be lighted from a single candle, and the
            life of the candle will not be shortened.&quot;
          </p>
          <p>🙏 May all beings be happy.</p>
        </footer>
      </main>
    </div>
  );
}
