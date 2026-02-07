'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter a username to continue.');
      return;
    }
    setError('');
    login(username);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="fx-fade-up w-full max-w-sm rounded-2xl border border-cyan-400/20 bg-white/5 p-6 shadow-[0_0_45px_rgba(34,211,238,0.15)] backdrop-blur"
      >
        <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-cyan-200/70">
          <span>Access</span>
          <span>Quiz</span>
        </div>
        <h1 className="mb-2 text-2xl font-semibold">Login</h1>
        <p className="mb-6 text-sm text-cyan-100/60">
          Enter your Name to Start Quiz.
        </p>

        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 w-full rounded-lg border border-cyan-400/20 bg-black/40 px-3 py-2 text-white placeholder:text-cyan-100/40 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/30"
        />
        {error && (
          <p className="mb-4 text-sm text-rose-300">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="fx-glow-hover w-full cursor-pointer rounded-lg bg-cyan-300 py-2 font-semibold text-black shadow-[0_0_20px_rgba(103,232,249,0.45)] transition hover:bg-cyan-200"
        >
          Start Quiz
        </button>
      </form>
    </div>
  );
}
