export type Question = {
  question: string;
  correctAnswer: string;
  options: string[];
};

export type UserAnswer = {
  question: string;
  selected: string;
  correct: string;
};
