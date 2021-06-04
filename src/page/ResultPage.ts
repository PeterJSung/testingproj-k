import { BaseClass } from "./Common";
import { answerSeet } from "../store/QuestionStore";
import { getResultInfo, goRoute } from "../util/util";
import ResultScore from "../component/ResultScore";
import ResultTime from "../component/ResultTime";

import "./result.css";

export class ResultPage implements BaseClass {
  async beforeRender() {}

  async render() {
    console.log(answerSeet);
    const [correctCount, avgTime] = getResultInfo(answerSeet.seet);
    const view = /*html*/ `
    <span class="complete-comment">Mission Complete</span>
    ${ResultScore({ score: correctCount })}
    ${ResultTime({ time: avgTime })}
    <button id="retrybtn" class="action-button">다시시작</button>
    `;
    return view;
  }

  async attachEvent() {
    const button = document.getElementById("retrybtn");
    button.addEventListener("click", () => {
      goRoute("#/");
    });
  }
}

export default ResultPage;
