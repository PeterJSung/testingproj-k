import { BaseClass } from "./Common";
import { answerSeet } from "../store/QuestionStore";
import { getResultInfo, goRoute } from "../Util/util";
import ResultScore from "../component/ResultScore";
import ResultTime from "../component/ResultTime";

export class ResultPage implements BaseClass {
  async beforeRender() {}

  async render() {
    console.log(answerSeet);
    const [correctCount, avgTime] = getResultInfo(answerSeet);
    const view = /*html*/ `
    <div>Mission Complete</div>
    <div id="score-amount-body">${ResultScore({ score: correctCount })}</div>
    <div id="score-time-body">${ResultTime({ time: avgTime })}</div>
    <button id="retrybtn">다시시작</button>
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
