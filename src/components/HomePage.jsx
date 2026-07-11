const EMOJIS = ['📚','🔬','🧮','🌍','💻','🎭','⚗️','🎵','🏛️','🧬','🚀','📖']

export default function HomePage({ decks, onStudy, onDelete, onCreate }) {
  return (
    <div className="page fade-up">
      <div className="hero">
        <h1>Learn Anything with<br /><span>AI-Powered Questions</span></h1>
        <p>Generate smart questions on any topic in seconds. Study smarter, not harder.</p>
        <button className="btn btn-primary" style={{ fontSize: '1rem', padding: '14px 32px' }} onClick={onCreate}>
          ✨ Create New Deck
        </button>
      </div>

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
            {decks.map((deck, i) => (
              <div key={deck.id} className="glass-card deck-card" onClick={() => onStudy(deck)}>
                <div className="deck-icon">{EMOJIS[i % EMOJIS.length]}</div>
                <div className="deck-title">{deck.title}</div>
                <div className="deck-count">{deck.cards.length} questions</div>
                <button
                  className="deck-delete"
                  onClick={e => { e.stopPropagation(); onDelete(deck.id) }}
                >
                  🗑️ Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
