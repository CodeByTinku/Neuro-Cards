const EMOJIS = ['📚','🔬','🧮','🌍','💻','🎭','⚗️','🎵','🏛️','🧬','🚀','📖']

function getStreakLabel(n) {
  if (n >= 30) return '🔥🔥🔥 Legendary!'
  if (n >= 14) return '🔥🔥 On Fire!'
  if (n >= 7)  return '🔥 Hot Streak!'
  if (n >= 3)  return '⚡ Building Up!'
  if (n === 1) return '🌱 Just Started!'
  return null
}

export default function HomePage({ decks, stats, onStudy, onDelete, onCreate }) {
  const streak = stats?.streak?.current || 0
  const totalQ  = stats?.overall?.totalQuestions || 0
  const totalC  = stats?.overall?.totalCorrect || 0
  const accuracy = totalQ > 0 ? Math.round((totalC / totalQ) * 100) : 0
  const streakLabel = getStreakLabel(streak)

  return (
    <div className="page fade-up">
      <div className="hero">
      
        <h1>Learn Anything with<br /><span>AI-Powered Questions</span></h1>
        <p>Generate smart questions on any topic in seconds. Study smarter, not harder.</p>
        <button className="btn btn-primary" style={{ fontSize: '1rem', padding: '14px 32px' }} onClick={onCreate}>
          ✨ Create New Deck
        </button>
        <h1 style={{fontSize: '46px', color: 'red', font: 'bold'}}>Sorry the api key was expired!</h1>

      </div>

      {/* ── Stats Banner ── */}
      {(streak > 0 || totalQ > 0) && (
        <div className="stats-banner glass-card">
          <div className="stat-item">
            <div className="stat-value stat-fire">{streak}</div>
            <div className="stat-label">
              Day Streak
              {streakLabel && <span className="streak-badge">{streakLabel}</span>}
            </div>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <div className="stat-value">{totalQ}</div>
            <div className="stat-label">Questions Answered</div>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <div className="stat-value stat-acc">{accuracy}%</div>
            <div className="stat-label">Overall Accuracy</div>
          </div>
        </div>
      )}

      {decks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">❓</div>
          <h3>No decks yet</h3>
          <p>Create your first AI-generated question deck!</p>
          <button className="btn btn-primary" onClick={onCreate}>Get Started</button>
        </div>
      ) : (
        <>
          <div className="section-header">
            <div className="section-title">Your Decks</div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{decks.length} deck{decks.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="decks-grid">
            {decks.map((deck, i) => {
              const ds = stats?.decks?.[deck.id]
              return (
                <div key={deck.id} className="glass-card deck-card" onClick={() => onStudy(deck)}>
                  <div className="deck-icon">{EMOJIS[i % EMOJIS.length]}</div>
                  <div className="deck-title">{deck.title}</div>
                  <div className="deck-count">{deck.cards.length} questions</div>

                  {/* Per-deck stats */}
                  {ds ? (
                    <div className="deck-stats-row">
                      <span className="deck-stat best-score">
                        🏆 {ds.bestScore}%
                      </span>
                      <span className="deck-stat attempts">
                        🔄 {ds.attempts}x
                      </span>
                    </div>
                  ) : (
                    <div className="deck-stats-row">
                      <span className="deck-stat new-tag">✨ New</span>
                    </div>
                  )}

                  <button
                    className="deck-delete"
                    onClick={e => { e.stopPropagation(); onDelete(deck.id) }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

