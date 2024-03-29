import { extractData } from "../util/util";

export interface ResultScoreInfo {
  score: number;
}

export const initialValue: ResultScoreInfo = {
  score: 0,
};

const ResultScore = (data: ResultScoreInfo) => {
  const score: number = extractData<number>(data, "score", 0);
  return `
      <span class="score-comment">당신의 점수는 ${score} 입니다</span>
  `;
};

export default ResultScore;
