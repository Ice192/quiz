import { Question } from '@/types/quiz';
import { decodeHTML, shuffleArray } from './utils';

const API_URL = 'https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple';

export async function fetchQuestions(): Promise<Question[]> {
  const res = await fetch(API_URL);
  const data = await res.json();

  return data.results.map((item: any) => {
    const options = shuffleArray([
      ...item.incorrect_answers,
      item.correct_answer,
    ]).map(decodeHTML);

    return {
      question: decodeHTML(item.question),
      correctAnswer: decodeHTML(item.correct_answer),
      options,
    };
  });
}
