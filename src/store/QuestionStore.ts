export interface QuestionDataSet {
  second: number;
  text: string;
}

export type SeetDataSet = {
  isCorrect: boolean;
  solveTime: number;
};

export interface UserAnswerSeet {
  currentIndex: number;
  seet: SeetDataSet[];
}

const answerSeet: UserAnswerSeet = {
  currentIndex: 0,
  seet: [],
};

const questionSeet: { data: QuestionDataSet[] } = {
  data: [],
};

export { answerSeet, questionSeet };
