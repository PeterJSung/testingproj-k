import { BaseClass } from "./Common";
import { answerSeet } from "../store/QuestionStore";
import { getScore } from "../Util/util";
import ResultScore from "../component/ResultScore";

export class ResultPage implements BaseClass {
  async beforeRender() {}

  async render() {
    const score = getScore(answerSeet);
    const view = /*html*/ `
    <div>Mission Complete</div>
    <div id="question_body">${ResultScore({ score })}</div>
    <button id="retrybtn">다시시작</button>
    `;
    return view;
  }

  async attachEvent() {}
}

export default ResultPage;
