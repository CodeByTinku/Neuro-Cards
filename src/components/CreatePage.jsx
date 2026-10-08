import { useState } from 'react'
import Groq from 'groq-sdk'

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY

export default function CreatePage({ onSave, onBack, showToast }) {
  const [mode, setMode] = useState('topic') // 'topic' | 'text'
  const [topic, setTopic] = useState('')
  const [pastedText, setPastedText] = useState('')
  const [cardCount, setCardCount] = useState(8)
  const [loading, setLoading] = useState(false)

  const counts = [5, 8, 10, 15, 20]

  const generate = async () => {
    const input = mode === 'topic' ? topic.trim() : pastedText.trim()
    if (!input) { showToast('⚠️ Please enter a topic or paste text!'); return }
    if (!GROQ_API_KEY) { showToast('⚠️ Add VITE_GROQ_API_KEY in .env file'); return }

    setLoading(true)
    try {
      const client = new Groq({ apiKey: GROQ_API_KEY, dangerouslyAllowBrowser: true })
      const prompt = mode === 'topic'
        ? `Generate exactly ${cardCount} flashcards about "${input}". Return ONLY a JSON array like:
[{"question":"...","answer":"...","distractors":["wrong option 1","wrong option 2","wrong option 3"]}]
Rules:
- question: clear and concise
- answer: short (1 sentence max)
- distractors: 3 plausible but WRONG answers, similar length to the correct answer
No extra text, no markdown, just the JSON array.`
        : `Create exactly ${cardCount} flashcards from this text:
"${input.slice(0, 3000)}"
Return ONLY a JSON array like:
[{"question":"...","answer":"...","distractors":["wrong option 1","wrong option 2","wrong option 3"]}]
Rules:
- answer: short (1 sentence max)
- distractors: 3 plausible but WRONG answers based on the text
No extra text, no markdown, just the JSON array.`

      const res = await client.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      })

      const raw = res.choices[0].message.content.trim()
      const jsonStart = raw.indexOf('[')
      const jsonEnd = raw.lastIndexOf(']') + 1
      const cards = JSON.parse(raw.slice(jsonStart, jsonEnd))

      if (!Array.isArray(cards) || cards.length === 0) throw new Error('Invalid response')

      onSave({
        title: mode === 'topic' ? input : input.slice(0, 40) + '...',
        cards,
      })
    } catch (err) {
      console.error('NeuroCards Error:', err)
      if (err?.message?.includes('401') || err?.status === 401) {
        showToast('❌ Invalid API Key! Check your .env file.')
      } else if (err?.message?.includes('429') || err?.status === 429) {
        showToast('⏳ Rate limit hit! Wait a moment and retry.')
      } else if (err?.message?.includes('model')) {
        showToast('❌ Model error! Try again. ')
        console.log(`${err}`)
      } else {
        showToast(`❌ Error: ${err?.message?.slice(0, 60) || 'Unknown error'}`)
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="page">
        <div className="loading-screen">
          <div className="spinner" />
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            🧠 Generating your questions...
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>This may take a few seconds</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page fade-up">
      <div className="glass-card create-form">
        <h2>Create New Deck ✨</h2>
        <p>Choose a topic or paste your study material — AI will do the rest.</p>

        <div className="tabs">
          <button className={`tab ${mode === 'topic' ? 'active' : ''}`} onClick={() => setMode('topic')}>📌 By Topic</button>
          <button className={`tab ${mode === 'text' ? 'active' : ''}`} onClick={() => setMode('text')}>📄 Paste Text</button>
        </div>

        {mode === 'topic' ? (
          <div className="form-group">
            <label className="form-label">Topic Name</label>
            <input
              className="input-field"
              placeholder="e.g. React Hooks, World War 2, Photosynthesis..."
              value={topic}
              onChange={e => setTopic(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && generate()}
            />
          </div>
        ) : (
          <div className="form-group">
            <label className="form-label">Paste your text / notes</label>
            <textarea
              className="input-field"
              placeholder="Paste your study material here..."
              value={pastedText}
              onChange={e => setPastedText(e.target.value)}
              style={{ minHeight: 160 }}
            />
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Number of Questions</label>
          <div className="card-count-selector">
            {counts.map(n => (
              <button
                key={n}
                className={`count-btn ${cardCount === n ? 'active' : ''}`}
                onClick={() => setCardCount(n)}
              >{n}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <button className="btn btn-glass" onClick={onBack}>← Back</button>
          <button className="btn btn-primary" onClick={generate} style={{ flex: 1 }}>
            ✨ Generate {cardCount} Questions
          </button>
        </div>
      </div>
    </div>
  )
}
