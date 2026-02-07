'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Question, UserAnswer } from '@/types/quiz';
import { fetchQuestions } from '@/lib/api';

type QuizStatus = 'idle' | 'playing' | 'finished';

type QuizContextType = {
  questions: Question[];
  currentIndex: number;
  answers: UserAnswer[];
  status: QuizStatus;
  timeLeft: number;
  startQuiz: () => Promise<void>;
  answerQuestion: (answer: string) => void;
  finishQuiz: () => void;
};

const QuizContext = createContext<QuizContextType | null>(null);

const QUIZ_DURATION = 60 * 60; // 60 minutes in seconds
const STORAGE_KEY = 'quizState';

type PersistedQuizState = {
  questions: Question[];
  currentIndex: number;
  answers: UserAnswer[];
  status: QuizStatus;
  timeLeft: number;
  updatedAt: number;
};

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [status, setStatus] = useState<QuizStatus>('idle');
  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION);
  const [isRestored, setIsRestored] = useState(false);

  /* =======================
     START QUIZ
  ======================= */
  const startQuiz = async () => {
    const data = await fetchQuestions();

    setQuestions(data);
    setCurrentIndex(0);
    setAnswers([]);
    setTimeLeft(QUIZ_DURATION);
    setStatus('playing');

    router.push('/quiz/play');
  };

  /* =======================
     ANSWER QUESTION
  ======================= */
  const answerQuestion = (selected: string) => {
    const current = questions[currentIndex];
    if (!current) return;

    setAnswers((prev) => [
      ...prev,
      {
        question: current.question,
        selected,
        correct: current.correctAnswer,
      },
    ]);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      finishQuiz();
    }
  };

  /* =======================
     FINISH QUIZ (STATE ONLY)
  ======================= */
  const finishQuiz = () => {
    setStatus('finished');
  };

  /* =======================
     RESTORE FROM localStorage
  ======================= */
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      setIsRestored(true);
      return;
    }

    try {
      const parsed = JSON.parse(raw) as PersistedQuizState;

      if (parsed.status !== 'playing' || parsed.questions.length === 0) {
        localStorage.removeItem(STORAGE_KEY);
        setIsRestored(true);
        return;
      }

      const elapsedSeconds = Math.floor(
        (Date.now() - parsed.updatedAt) / 1000
      );
      const nextTimeLeft = Math.max(0, parsed.timeLeft - elapsedSeconds);

      setQuestions(parsed.questions);
      setCurrentIndex(parsed.currentIndex);
      setAnswers(parsed.answers);
      setTimeLeft(nextTimeLeft);
      setStatus(nextTimeLeft > 0 ? 'playing' : 'finished');

      if (nextTimeLeft > 0) {
        router.replace('/quiz/play');
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsRestored(true);
    }
  }, [router]);

  /* =======================
     TIMER EFFECT
  ======================= */
  useEffect(() => {
    if (status !== 'playing') return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [status]);

  /* =======================
     AUTO FINISH WHEN TIME UP
  ======================= */
  useEffect(() => {
    if (status === 'playing' && timeLeft === 0) {
      finishQuiz();
    }
  }, [timeLeft, status]);

  /* =======================
     PERSIST QUIZ STATE
  ======================= */
  useEffect(() => {
    if (!isRestored) return;
    if (status !== 'playing') return;

    const payload: PersistedQuizState = {
      questions,
      currentIndex,
      answers,
      status,
      timeLeft,
      updatedAt: Date.now(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [
    questions,
    currentIndex,
    answers,
    status,
    timeLeft,
    isRestored,
  ]);

  /* =======================
     CLEAR STORAGE WHEN FINISHED
  ======================= */
  useEffect(() => {
    if (!isRestored) return;
    if (status === 'finished') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [status, isRestored]);

  /* =======================
     NAVIGATION SIDE EFFECT
  ======================= */
  useEffect(() => {
    if (status === 'finished') {
      router.push('/quiz/result');
    }
  }, [status, router]);

  return (
    <QuizContext.Provider
      value={{
        questions,
        currentIndex,
        answers,
        status,
        timeLeft,
        startQuiz,
        answerQuestion,
        finishQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}


export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) {
    throw new Error('useQuiz must be used inside QuizProvider');
  }
  return ctx;
}
