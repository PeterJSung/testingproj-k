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
    <div class="question-header">
      <div>남은시간</div><div id="timer-value">${second}</div>
    </div>
    <div>
      <div>점수:</div><div id="score-value">${score}</div>
    </div>
  `;
};

export default QuestionHeader;
