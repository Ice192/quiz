'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useQuiz } from '@/context/QuizContext';
import { useAuth } from '@/context/AuthContext';

export default function ResultPage() {
  const { questions, answers } = useQuiz();
  const { user, logout } = useAuth();

  const totalQuestions = questions.length;
  const answered = answers.length;
  const correct = answers.filter(
    (a) => a.selected === a.correct
  ).length;
  const wrong = answered - correct;
  const score =
    totalQuestions > 0
      ? Math.round((correct / totalQuestions) * 100)
      : 0;

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="fx-fade-up w-full max-w-md rounded-2xl border border-cyan-400/20 bg-white/5 p-6 text-center shadow-[0_0_45px_rgba(34,211,238,0.15)] backdrop-blur">
          <div className="mb-2 text-xs uppercase tracking-[0.3em] text-cyan-200/70">
            Summary
          </div>
          <h1 className="mb-2 text-2xl font-semibold">Quiz Result</h1>

          {user && (
            <p className="mb-4 text-sm text-neutral-400">
              Well done, {user} 
            </p>
          )}

          <div className="mb-6 grid gap-3 text-left text-white/85">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-cyan-400/10 bg-black/30 p-3 transition hover:border-cyan-300/40 hover:bg-cyan-300/5">
                <div className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">
                  Total
                </div>
                <div className="mt-1 text-2xl font-semibold text-white">
                  {totalQuestions}
                </div>
              </div>
              <div className="rounded-xl border border-cyan-400/10 bg-black/30 p-3 transition hover:border-cyan-300/40 hover:bg-cyan-300/5">
                <div className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">
                  Answered
                </div>
                <div className="mt-1 text-2xl font-semibold text-white">
                  {answered}
                </div>
              </div>
              <div className="rounded-xl border border-cyan-400/10 bg-black/30 p-3 transition hover:border-cyan-300/40 hover:bg-cyan-300/5">
                <div className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">
                  Correct
                </div>
                <div className="mt-1 text-2xl font-semibold text-white">
                  {correct}
                </div>
              </div>
              <div className="rounded-xl border border-cyan-400/10 bg-black/30 p-3 transition hover:border-cyan-300/40 hover:bg-cyan-300/5">
                <div className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">
                  Wrong
                </div>
                <div className="mt-1 text-2xl font-semibold text-white">
                  {wrong}
                </div>
              </div>
            </div>

            <div className="fx-glow-hover rounded-xl border border-cyan-400/20 bg-cyan-300/10 p-4 text-center">
              <div className="text-xs uppercase tracking-[0.3em] text-cyan-100/70">
                Score
              </div>
              <div className="mt-2 text-4xl font-semibold text-cyan-100">
                {score}%
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            className="fx-glow-hover w-full cursor-pointer rounded-lg bg-cyan-300 py-2 font-semibold text-black shadow-[0_0_20px_rgba(103,232,249,0.45)] transition hover:bg-cyan-200"
          >
            Logout
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
