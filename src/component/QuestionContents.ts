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
        <div class="question-contents">
            <div id="question">${question}</div>
            <input id="inputbox" type="text" value="${currentStr}" />
            <button id="actionbtn">
                ${isPlay ? "초기화" : "시작"}
            </button>
        </div>
    `;
};

export default QuestionContents;
