# Quiz App (Next.js + TypeScript)

A simple, futuristic quiz app built as a frontend challenge and portfolio project. It uses OpenTDB for questions, React Context for state, and a global countdown timer with resume support.

## Features
- Fake authentication (frontend only)
- Quiz flow with one question per screen
- Auto-advance after answering
- Global countdown timer (60 minutes)
- Auto-submit when time runs out
- Quiz resume via `localStorage`
- Result summary with score breakdown
- Futuristic UI + subtle animations

## Tech Stack
- Next.js (App Router)
- TypeScript
- React Context API
- Tailwind CSS
- OpenTDB API
- localStorage

## How It Works (Simple)

### 1) Auth
`AuthContext` stores the username in `localStorage` and protects quiz routes.

### 2) Quiz State
`QuizContext` is the single source of truth:
- `questions`, `currentIndex`, `answers`
- `status`: `idle | playing | finished`
- `timeLeft`

### 3) Timer
The timer runs only when status is `playing`.  
When it reaches `0`, the quiz finishes automatically.

### 4) Resume
While playing, state is saved to `localStorage`.  
On reload, the app restores only if the previous status was `playing`.  
Time resumes correctly using a stored timestamp (`updatedAt`).

### 5) Result
The result page shows:
total questions, answered, correct, wrong, and score percent.

## Project Structure (Quick Map)
- `app/` — routes and pages (App Router)
- `components/` — UI components (e.g. `QuestionCard`)
- `context/` — `AuthContext` and `QuizContext`
- `lib/` — API helpers (OpenTDB fetch)
- `types/` — TypeScript types

## Run Locally
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

## Notes
- This is a frontend-only app (no real auth).
- Refreshing the quiz page resumes the active quiz.
- When the quiz ends, saved state is cleared.

---
If you want to expand it: add difficulty/category selection, a question review page, or a real backend auth flow.
