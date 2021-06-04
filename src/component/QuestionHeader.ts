import { extractData } from "../util/util";

export interface QuestionHeaderInfo {
  second: number;
  score: number;
}

export const initialValue: QuestionHeaderInfo = {
  score: 0,
  second: 0,
};

const QuestionHeader = (data: QuestionHeaderInfo) => {
  const second = extractData<number>(data, "second", 0);
  const score: number = extractData<number>(data, "score", 0);
  return `
      <div>
        <span>남은시간: </span><span id="timer-value">${second}</span>
      </div>
      <div>
        <span>점수: </span><span id="score-value">${score}</span>
      </div>
  `;
};

export default QuestionHeader;
