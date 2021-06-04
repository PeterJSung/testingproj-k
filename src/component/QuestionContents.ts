import { extractData } from "../util/util";

export interface QuestionContentInfo {
  question: string;
  isPlay: boolean;
  currentStr: string;
}

export const initialValue: QuestionContentInfo = {
  currentStr: "",
  isPlay: false,
  question: "",
};

const QuestionContents = (data: QuestionContentInfo) => {
  const question = extractData<string>(data, "question", "");
  const currentStr = extractData<string>(data, "currentStr", "");
  const isPlay = extractData<boolean>(data, "isPlay", false);
  return `
      <span class="question-string">${question}</span>
      <input id="inputbox" type="text" value="${currentStr}" />
      <button id="playbtn" class="action-button">
          ${isPlay ? "초기화" : "시작"}
      </button>
    `;
};

export default QuestionContents;
