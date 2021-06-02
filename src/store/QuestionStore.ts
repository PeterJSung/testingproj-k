export interface QuestionDataSet {
  second: number;
  text: string;
}

export type SeetDataSet = QuestionDataSet & {
  answer: string;
  duration: number;
};

export interface UserAnswerSeet {
  currentIndex: number;
  seet: SeetDataSet[];
}

const answerSeet: UserAnswerSeet = {
  currentIndex: 0,
  seet: [],
};

export { answerSeet };
