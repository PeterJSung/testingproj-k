import { extractData } from "../util/util";

export interface ResultTimeInfo {
  time: number;
}

export const initialValue: ResultTimeInfo = {
  time: 0,
};

const ResultTime = (data: ResultTimeInfo) => {
  const time: number = extractData<number>(data, "time", 0);
  return `
      <span class="time-comment">단어당 평균 답변시간은 ${time} 초입니다.</span>
  `;
};

export default ResultTime;
