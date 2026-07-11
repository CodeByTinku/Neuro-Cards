import { useState, useEffect } from 'react'
import HomePage from './components/HomePage'
import CreatePage from './components/CreatePage'
import StudyPage from './components/StudyPage'
import Toast from './components/Toast'

export default function App() {
  const [view, setView] = useState('home') // 'home' | 'create' | 'study'
  const [decks, setDecks] = useState(() => {
    try { return JSON.parse(localStorage.getItem('neurocards-decks')) || [] }
    catch { return [] }
  })
  const [activeDeck, setActiveDeck] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    localStorage.setItem('neurocards-decks', JSON.stringify(decks))
  }, [decks])

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const saveDeck = (deck) => {
    const newDeck = { ...deck, id: Date.now(), createdAt: new Date().toISOString() }
    setDecks(prev => [newDeck, ...prev])
    setActiveDeck(newDeck)
    setView('study')
    showToast('✨ Deck created successfully!')
  }

  const deleteDeck = (id) => {
    setDecks(prev => prev.filter(d => d.id !== id))
    showToast('🗑️ Deck deleted')
  }

  const studyDeck = (deck) => {
    setActiveDeck(deck)
    setView('study')
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => setView('home')}>
          <span>🧠</span> NeuroCards
        </div>
        <div className="nav-links">
          <button className="btn btn-glass" onClick={() => setView('home')}>Home</button>
          <button className="btn btn-primary" onClick={() => setView('create')}>+ New Deck</button>
        </div>
      </nav>

      {view === 'home' && (
        <HomePage
          decks={decks}
          onStudy={studyDeck}
          onDelete={deleteDeck}
          onCreate={() => setView('create')}
        />
      )}
      {view === 'create' && (
        <CreatePage
          onSave={saveDeck}
          onBack={() => setView('home')}
          showToast={showToast}
        />
      )}
      {view === 'study' && activeDeck && (
        <StudyPage
          deck={activeDeck}
          onBack={() => setView('home')}
        />
      )}

      {toast && <Toast message={toast} />}
    </>
  )
}
