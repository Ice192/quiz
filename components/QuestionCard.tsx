'use client';

type Props = {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
};

export default function QuestionCard({
  question,
  options,
  onAnswer,
}: Props) {
  return (
    <div className="fx-fade-up w-full max-w-xl rounded-2xl border border-cyan-400/20 bg-white/5 p-6 shadow-[0_0_50px_rgba(34,211,238,0.18)] backdrop-blur">
      <div className="mb-4 text-xs uppercase tracking-[0.35em] text-cyan-200/70">
        Signal
      </div>
      <h2 className="mb-6 text-lg font-semibold text-white/90">
        {question}
      </h2>

      <div className="grid gap-3">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onAnswer(option)}
            className="fx-glow-hover cursor-pointer rounded-lg border border-cyan-400/10 bg-black/40 px-4 py-2 text-left text-white/90 transition hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-white"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
