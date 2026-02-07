'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useQuiz } from '@/context/QuizContext';

export default function QuizPage() {
  const { startQuiz } = useQuiz();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );
    const isCoarse = window.matchMedia('(pointer: coarse)');
    if (reduceMotion.matches || isCoarse.matches) return;

    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <ProtectedRoute>
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
        >
          <div
            className="absolute inset-0 transition-transform duration-100 ease-out"
            style={{
              transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
            }}
          >
            <div className="absolute inset-0 fx-float bg-[radial-gradient(600px_300px_at_15%_20%,rgba(34,211,238,0.22),transparent_60%),radial-gradient(500px_260px_at_80%_10%,rgba(103,232,249,0.16),transparent_60%),radial-gradient(700px_360px_at_50%_90%,rgba(14,116,144,0.18),transparent_60%)]" />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </div>
        <button
          onClick={startQuiz}
          className="fx-fade-up fx-glow-hover cursor-pointer rounded-xl border border-cyan-300/40 bg-cyan-300/90 px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-black shadow-[0_0_28px_rgba(34,211,238,0.45)] transition hover:bg-cyan-200"
        >
          Start Quiz
        </button>
      </div>
    </ProtectedRoute>
  );
}
