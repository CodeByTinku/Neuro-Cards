import { useState, useEffect } from 'react'

// Shuffle array helper
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)

// Build 4 options for a card (1 correct + 3 distractors)
// Falls back to other cards' answers if distractors not present
const buildOptions = (card, allCards) => {
  let wrongs = []
  if (card.distractors && card.distractors.length >= 3) {
    wrongs = card.distractors.slice(0, 3)
  } else {
    // Fallback: pick from other cards' answers
    const others = allCards
      .filter(c => c !== card && c.answer !== card.answer)
      .map(c => c.answer)
    wrongs = shuffle(others).slice(0, 3)
  }
  return shuffle([card.answer, ...wrongs])
}

export default function StudyPage({ deck, onBack }) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [selected, setSelected] = useState(null)   // which option user clicked
  const [options, setOptions] = useState([])
  const [known, setKnown] = useState([])
  const [unknown, setUnknown] = useState([])
  const [done, setDone] = useState(false)

  const card = deck.cards[index]
  const total = deck.cards.length
  const progress = (index / total) * 100
  const hasMCQ = total >= 2 // need at least 2 cards for MCQ

  // Rebuild options whenever index changes
  useEffect(() => {
    if (hasMCQ) setOptions(buildOptions(card, deck.cards))
    setSelected(null)
    setFlipped(false)
  }, [index])

  const handleOptionClick = (opt) => {
    if (selected !== null) return // already answered
    setSelected(opt)
    setFlipped(true) // reveal state
  }

  const handleNext = () => {
    const isCorrect = selected === card.answer
    if (isCorrect) setKnown(prev => [...prev, index])
    else setUnknown(prev => [...prev, index])

    setSelected(null)
    setFlipped(false)
    if (index + 1 >= total) setDone(true)
    else setIndex(i => i + 1)
  }

  const restart = () => {
    setIndex(0)
    setFlipped(false)
    setSelected(null)
    setKnown([])
    setUnknown([])
    setDone(false)
  }

  const score = Math.round((known.length / total) * 100)

  const getEmoji = () => {
    if (score === 100) return '🏆'
    if (score >= 80) return '🎉'
    if (score >= 60) return '💪'
    if (score >= 40) return '📖'
    return '🔄'
  }

  const getMessage = () => {
    if (score === 100) return 'Perfect Score! Outstanding!'
    if (score >= 80) return 'Excellent work! Almost there!'
    if (score >= 60) return 'Good job! Keep practicing!'
    if (score >= 40) return "Keep going, you're improving!"
    return "Don't give up! Review and retry."
  }

  if (done) {
    return (
      <div className="page fade-up">
        <div className="result-screen">
          <div className="result-emoji">{getEmoji()}</div>
          <div className="result-label">Your Score</div>
          <div className="result-score">{score}%</div>
          <p style={{ color: 'var(--text-secondary)', marginTop: 8, fontSize: '1.1rem' }}>{getMessage()}</p>
          <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>
            ✅ {known.length} correct &nbsp;·&nbsp; ❌ {unknown.length} wrong
          </p>
          <div className="result-actions">
            <button className="btn btn-glass" onClick={onBack}>← Home</button>
            <button className="btn btn-primary" onClick={restart}>🔄 Try Again</button>
          </div>
        </div>
      </div>
    )
  }

  const getOptionClass = (opt) => {
    if (selected === null) return 'mcq-option'
    if (opt === card.answer) return 'mcq-option correct'
    if (opt === selected && selected !== card.answer) return 'mcq-option wrong'
    return 'mcq-option dimmed'
  }

  return (
    <div className="page fade-up">
      {/* Header */}
      <div className="study-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button className="btn btn-glass" onClick={onBack} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>← Back</button>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif' }}>{deck.title}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Question {index + 1} of {total}</div>
          </div>
          <div style={{ display: 'flex', gap: 12, fontSize: '0.85rem', fontWeight: 700 }}>
            <span style={{ color: 'var(--green)' }}>✅ {known.length}</span>
            <span style={{ color: 'var(--red)' }}>❌ {unknown.length}</span>
          </div>
        </div>
        <div className="progress-bar-wrap" style={{ marginTop: 16 }}>
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question Card */}
      <div className="question-card glass-card">
        <div className="card-label" style={{ marginBottom: 16 }}>❓ Question</div>
        <div className="card-text">{card.question}</div>
      </div>

      {/* MCQ Options or Flip mode fallback */}
      {hasMCQ ? (
        <>
          <div className="mcq-grid">
            {options.map((opt, i) => (
              <button
                key={i}
                className={getOptionClass(opt)}
                onClick={() => handleOptionClick(opt)}
              >
                <span className="option-label">{['A', 'B', 'C', 'D'][i]}</span>
                <span className="option-text">{opt}</span>
                {selected !== null && opt === card.answer && <span className="option-icon">✅</span>}
                {selected === opt && selected !== card.answer && <span className="option-icon">❌</span>}
              </button>
            ))}
          </div>

          {selected !== null && (
            <div className="next-section fade-up">
              <div className={`answer-feedback ${selected === card.answer ? 'feedback-correct' : 'feedback-wrong'}`}>
                {selected === card.answer ? '🎉 Correct!' : `❌ Wrong! Correct: "${card.answer}"`}
              </div>
              <button className="btn btn-primary" onClick={handleNext} style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}>
                {index + 1 < total ? 'Next Question →' : '🏆 See Results'}
              </button>
            </div>
          )}
        </>
      ) : (
        /* Fallback flip mode for single card decks */
        <>
          <div className="card-scene" onClick={() => setFlipped(f => !f)} style={{ marginTop: 20 }}>
            <div className={`card-3d ${flipped ? 'flipped' : ''}`}>
              <div className="card-face card-front">
                <div className="card-label">Click to reveal</div>
              </div>
              <div className="card-face card-back">
                <div className="card-label">💡 Answer</div>
                <div className="card-text">{card.answer}</div>
              </div>
            </div>
          </div>
          {flipped && (
            <div className="study-actions fade-up">
              <button className="btn btn-red" onClick={() => { setUnknown(p => [...p, index]); setFlipped(false); if (index + 1 >= total) setDone(true); else setIndex(i => i + 1) }}>❌ Wrong</button>
              <button className="btn btn-green" onClick={() => { setKnown(p => [...p, index]); setFlipped(false); if (index + 1 >= total) setDone(true); else setIndex(i => i + 1) }}>✅ Correct</button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
