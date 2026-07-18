# 🧠 NeuroCards — AI-Powered Flashcard Quiz App

> Generate smart question decks on any topic in seconds. Study smarter, not harder.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-AI-F55036?style=for-the-badge&logo=groq&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## ✨ Features

- 🤖 **AI Question Generation** — Enter any topic or paste your notes, and the AI instantly generates MCQ flashcards
- 📌 **Two Input Modes** — Generate by **Topic** or **Paste Text** (supports up to 3000 characters)
- 🎯 **MCQ Study Mode** — 4-option multiple choice questions with instant right/wrong feedback
- 🔄 **Flip Card Fallback** — Single-card decks use a classic flip-card experience
- 📊 **Score & Progress Tracking** — Live progress bar, ✅ correct / ❌ wrong counters, and a final score screen
- 🔥 **Study Streak** — Daily streak tracking that resets if you miss a day, with motivational badges
- 🏆 **Per-Deck Best Score** — Each deck card shows your highest score and number of attempts
- 📈 **Overall Accuracy** — A stats banner shows total questions answered and your global accuracy
- 💾 **Persistent Data** — All decks and stats are saved in `localStorage` — no login required
- 🗑️ **Deck Management** — Create, study, and delete decks from the Home dashboard
- 🌙 **Dark Glassmorphism UI** — Sleek dark theme with glass-card effects and smooth animations

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite 8** | Build tool & dev server |
| **Groq SDK** | AI API client (`llama-3.3-70b-versatile`) |
| **Vanilla CSS** | Custom styling with CSS variables |
| **localStorage** | Client-side data persistence (decks + stats) |

---
## 
🚀 Demo You can try **Neuro-Cards** live here: [![Deploy with Vercel](https://vercel.com/button)](https://neuro-cards-git-main-codebytinkus-projects.vercel.app/)

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- A free [Groq API Key](https://console.groq.com/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/neurocards.git
cd neurocards

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
```

### Environment Setup

Create a `.env` file in the root directory and add your Groq API key:

```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

> ⚠️ **Never commit your `.env` file!** It is already listed in `.gitignore`.

### Run the App

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📖 How to Use

1. **Home Page** — View your study streak, overall accuracy, and all saved decks (with best scores)
2. **Create Page**:
   - Choose **"By Topic"** → type a topic (e.g., *React Hooks, World War 2, Photosynthesis*)
   - Or choose **"Paste Text"** → paste your study notes
   - Select the number of questions: `5`, `8`, `10`, `15`, or `20`
   - Click **"✨ Generate Questions"** — the AI will create your deck in seconds
3. **Study Page**:
   - Answer each MCQ question by clicking one of the 4 options
   - See instant feedback after each answer
   - Track your progress with the live progress bar
4. **Results Screen** — View your final score, see how many you got right/wrong, and retry if needed
5. **Stats & Streak** — After completing a session, your streak, best score, and accuracy automatically update

---

## 📁 Project Structure

```
neurocards/
├── public/
├── src/
│   ├── components/
│   │   ├── HomePage.jsx      # Deck dashboard, stats banner & hero section
│   │   ├── CreatePage.jsx    # AI deck generation form
│   │   ├── StudyPage.jsx     # MCQ quiz & flip-card study mode
│   │   └── Toast.jsx         # Notification toast component
│   ├── utils/
│   │   └── stats.js          # Study stats & streak logic (localStorage)
│   ├── App.jsx               # Root component & state management
│   ├── App.css               # Component-level styles
│   ├── index.css             # Global design system & CSS variables
│   └── main.jsx              # React entry point
├── .env                      # API keys (not committed)
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

## 🔑 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run oxlint for code linting |

---

## 🤖 AI Model

NeuroCards uses **Groq's** `llama-3.3-70b-versatile` model to generate flashcards. The AI generates:
- A clear **question**
- A concise **correct answer** (max 1 sentence)
- **3 distractor options** (plausible but wrong answers)

---

## 📅 Changelog

### v1.1.0
- 🔥 Added **daily study streak** tracking with motivational badges (e.g., ⚡ Building Up!, 🔥 Hot Streak!)
- 🏆 Per-deck **best score** and **attempt count** now shown on each deck card
- 📈 Global **stats banner** on Home page showing streak, total questions answered & overall accuracy
- 💾 All stats persisted in `localStorage` under `neurocards-stats`

### v1.0.0
- 🚀 Initial release with AI deck generation, MCQ mode, flip-card fallback & score tracking

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Author

Built with ❤️ by **Tinku**


---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite 8** | Build tool & dev server |
| **Groq SDK** | AI API client (`llama-3.3-70b-versatile`) |
| **Vanilla CSS** | Custom styling with CSS variables |
| **localStorage** | Client-side data persistence |

---
## 
🚀 Demo You can try **Neuro-Cards** live here: [![Deploy with Vercel](https://vercel.com/button)](https://neuro-cards-git-main-codebytinkus-projects.vercel.app/)

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- A free [Groq API Key](https://console.groq.com/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/neurocards.git
cd neurocards

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
```

### Environment Setup

Create a `.env` file in the root directory and add your Groq API key:

```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

> ⚠️ **Never commit your `.env` file!** It is already listed in `.gitignore`.

### Run the App

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📖 How to Use

1. **Home Page** — View all your saved decks or click **"Create New Deck"**
2. **Create Page**:
   - Choose **"By Topic"** → type a topic (e.g., *React Hooks, World War 2, Photosynthesis*)
   - Or choose **"Paste Text"** → paste your study notes
   - Select the number of questions: `5`, `8`, `10`, `15`, or `20`
   - Click **"✨ Generate Questions"** — the AI will create your deck in seconds
3. **Study Page**:
   - Answer each MCQ question by clicking one of the 4 options
   - See instant feedback after each answer
   - Track your progress with the live progress bar
4. **Results Screen** — View your final score, see how many you got right/wrong, and retry if needed

---

## 📁 Project Structure

```
neurocards/
├── public/
├── src/
│   ├── components/
│   │   ├── HomePage.jsx      # Deck dashboard & hero section
│   │   ├── CreatePage.jsx    # AI deck generation form
│   │   ├── StudyPage.jsx     # MCQ quiz & flip-card study mode
│   │   └── Toast.jsx         # Notification toast component
│   ├── App.jsx               # Root component & state management
│   ├── App.css               # Component-level styles
│   ├── index.css             # Global design system & CSS variables
│   └── main.jsx              # React entry point
├── .env                      # API keys (not committed)
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

## 🔑 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run oxlint for code linting |

---

## 🤖 AI Model

NeuroCards uses **Groq's** `llama-3.3-70b-versatile` model to generate flashcards. The AI generates:
- A clear **question**
- A concise **correct answer** (max 1 sentence)
- **3 distractor options** (plausible but wrong answers)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Author

Built with ❤️ by **Tinku**

