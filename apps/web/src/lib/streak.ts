const STORAGE_KEY = "dharmadoors-streak";
// How many days of per-day minutes to keep. Plenty for "today" + a little history.
const MINUTES_RETENTION_DAYS = 90;

interface StreakData {
  currentStreak: number;
  lastPracticeDate: string; // YYYY-MM-DD in local time
  longestStreak: number;
  totalSessions: number;
  minutesByDate: Record<string, number>; // YYYY-MM-DD (local) -> minutes sat that day
}

// Local-day boundary (not UTC) so a late-night sit counts toward the right day.
function localDate(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function today(): string {
  return localDate(0);
}

function yesterday(): string {
  return localDate(-1);
}

// Drop minutes entries older than the retention window so storage can't grow forever.
function pruneMinutes(map: Record<string, number>): Record<string, number> {
  const cutoff = localDate(-MINUTES_RETENTION_DAYS);
  const out: Record<string, number> = {};
  for (const [date, mins] of Object.entries(map)) {
    if (date >= cutoff) out[date] = mins; // YYYY-MM-DD sorts lexicographically
  }
  return out;
}

function loadStreak(): StreakData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Tolerate data saved by the older shape (no minutesByDate).
      return {
        currentStreak: parsed.currentStreak ?? 0,
        lastPracticeDate: parsed.lastPracticeDate ?? "",
        longestStreak: parsed.longestStreak ?? 0,
        totalSessions: parsed.totalSessions ?? 0,
        minutesByDate: parsed.minutesByDate ?? {},
      };
    }
  } catch { /* private browsing or SSR */ }
  return {
    currentStreak: 0,
    lastPracticeDate: "",
    longestStreak: 0,
    totalSessions: 0,
    minutesByDate: {},
  };
}

function saveStreak(data: StreakData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch { /* private browsing */ }
}

/**
 * Get the current streak data.
 * If the last practice was before yesterday, the streak has been broken.
 */
export function getStreak(): StreakData {
  const data = loadStreak();

  // Streak is still alive if last practice was today or yesterday
  if (data.lastPracticeDate !== today() && data.lastPracticeDate !== yesterday()) {
    data.currentStreak = 0;
  }

  return data;
}

/**
 * Minutes sat so far today (local time). 0 if nothing yet.
 */
export function getTodayMinutes(): number {
  return loadStreak().minutesByDate[today()] ?? 0;
}

/**
 * Record a completed practice session for today.
 * @param minutes minutes sat in this session (added to today's running total)
 * Increments streak if this is the first session of the day.
 * Returns the updated streak data.
 */
export function recordSession(minutes: number): StreakData {
  const data = loadStreak();
  const t = today();

  data.totalSessions += 1;
  data.minutesByDate[t] = (data.minutesByDate[t] ?? 0) + Math.max(0, Math.round(minutes));
  data.minutesByDate = pruneMinutes(data.minutesByDate);

  if (data.lastPracticeDate === t) {
    // Already practiced today, just add minutes + session count
    saveStreak(data);
    return data;
  }

  if (data.lastPracticeDate === yesterday()) {
    // Continuing the streak
    data.currentStreak += 1;
  } else {
    // Starting fresh
    data.currentStreak = 1;
  }

  data.lastPracticeDate = t;
  data.longestStreak = Math.max(data.longestStreak, data.currentStreak);
  saveStreak(data);
  return data;
}
