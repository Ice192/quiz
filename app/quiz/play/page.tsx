'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import QuestionCard from '@/components/QuestionCard';
import { useQuiz } from '@/context/QuizContext';

export default function QuizPlayPage() {
  const { questions, currentIndex, answerQuestion, status, timeLeft } = useQuiz();

  if (status !== 'playing') return null;

  const currentQuestion = questions[currentIndex];

  if (!currentQuestion) return null;

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
        <div className="fx-fade-up flex flex-wrap items-center justify-center gap-3">
          <div className="rounded-full border border-cyan-400/20 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.3em] text-cyan-100/70">
            Question {currentIndex + 1} of {questions.length}
          </div>
          <div
            className={`rounded-full border border-cyan-400/30 bg-black/40 px-4 py-1 text-xs uppercase tracking-[0.3em] text-cyan-100/80 ${
              timeLeft <= 30 ? 'fx-pulse-urgent' : ''
            }`}
          >
            Time {formatTime(timeLeft)}
          </div>
        </div>

        <QuestionCard
          question={currentQuestion.question}
          options={currentQuestion.options}
          onAnswer={answerQuestion}
        />
      </div>
    </ProtectedRoute>
  );
}
