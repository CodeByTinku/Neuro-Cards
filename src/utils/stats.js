const STATS_KEY = 'neurocards-stats'

const getToday = () => new Date().toISOString().slice(0, 10) // 'YYYY-MM-DD'

const getYesterday = () => {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().slice(0, 10)
}

export const loadStats = () => {
  try {
    return JSON.parse(localStorage.getItem(STATS_KEY)) || defaultStats()
  } catch {
    return defaultStats()
  }
}

const defaultStats = () => ({
  streak: { current: 0, lastStudyDate: null },
  overall: { totalQuestions: 0, totalCorrect: 0 },
  decks: {},
})

/**
 * Session complete hone par call karo
 * @param {string|number} deckId
 * @param {number} correct
 * @param {number} total
 */
export const saveStudySession = (deckId, correct, total) => {
  const stats = loadStats()
  const today = getToday()
  const yesterday = getYesterday()

  // ── Streak logic ──
  const last = stats.streak.lastStudyDate
  if (last === today) {
    // Already studied today — streak unchanged
  } else if (last === yesterday) {
    // Studied yesterday → extend streak
    stats.streak.current += 1
    stats.streak.lastStudyDate = today
  } else {
    // Missed a day (or first time) → reset to 1
    stats.streak.current = 1
    stats.streak.lastStudyDate = today
  }

  // ── Overall totals ──
  stats.overall.totalQuestions += total
  stats.overall.totalCorrect += correct

  // ── Per-deck stats ──
  const score = Math.round((correct / total) * 100)
  const existing = stats.decks[deckId] || { bestScore: 0, attempts: 0, lastStudied: null }
  stats.decks[deckId] = {
    bestScore: Math.max(existing.bestScore, score),
    attempts: existing.attempts + 1,
    lastStudied: new Date().toISOString(),
  }

  localStorage.setItem(STATS_KEY, JSON.stringify(stats))
  return stats
}
