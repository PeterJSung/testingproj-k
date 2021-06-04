import { BaseClass } from "./Common";
import { answerSeet, questionSeet } from "../store/QuestionStore";
import { eventQueue } from "../store/EventStore";
import { get } from "../util/http";
import { generateNewSeet, goRoute, getScore } from "../util/util";
import QuestionHeader, {
  QuestionHeaderInfo,
  initialValue as HeadInitial,
} from "../component/QuestionHeader";
import QuestionContents, {
  QuestionContentInfo,
  initialValue as ContentInitial,
} from "../component/QuestionContents";
import "./question.css";

type KEY_UP_EVENT = KeyboardEvent & { target: HTMLInputElement };

export class QuestionPage implements BaseClass {
  headerInfo: QuestionHeaderInfo = HeadInitial;
  contentInfo: QuestionContentInfo = ContentInitial;
  timer: NodeJS.Timeout = undefined;

  headRender = async (data: QuestionHeaderInfo) => {
    const headerDiv = document.getElementById("question-header");
    headerDiv.innerHTML = QuestionHeader(data);
    return;
  };

  contentRender = async (data: QuestionContentInfo) => {
    const contentDiv = document.getElementById("question_body");
    contentDiv.innerHTML = QuestionContents(data);
    const input = document.getElementById("inputbox") as HTMLInputElement;
    input.focus();
    return;
  };

  private childUpdate() {
    eventQueue.push({
      fn: this.contentRender,
      data: this.contentInfo,
      eventUpdate: true,
    });
    eventQueue.push({
      fn: this.headRender,
      data: this.headerInfo,
      eventUpdate: true,
    });
  }

  async beforeRender() {
    questionSeet.data = await get(
      "https://my-json-server.typicode.com/kakaopay-fe/resources/words"
    );
    this.resetInfo();
  }

  async render() {
    // fetch Data
    const view = /*html*/ `
    <div id="question-header">${QuestionHeader(this.headerInfo)}</div>
    <div id="question_body">${QuestionContents(this.contentInfo)}</div>
    `;
    return view;
  }

  private resetInfo() {
    this.contentInfo.isPlay = false;
    this.contentInfo.currentStr = "";
    this.contentInfo.question = "";

    this.headerInfo.score = 0;
    this.headerInfo.second = 0;

    this.timer && clearInterval(this.timer);
    answerSeet.currentIndex = 0;
    answerSeet.seet = [];
    this.timer = undefined;
  }

  private setCurrentQuestion() {
    this.headerInfo.score = getScore(answerSeet.seet);
    this.headerInfo.second = questionSeet.data[answerSeet.currentIndex].second;
    this.contentInfo.question = questionSeet.data[answerSeet.currentIndex].text;
    this.contentInfo.currentStr = "";
  }

  private nextQuestion() {
    answerSeet.currentIndex++;
    if (answerSeet.currentIndex >= answerSeet.seet.length) {
      // go Route
      this.timer && clearInterval(this.timer);
      goRoute("#/result");
      return;
    }
    this.setCurrentQuestion();
  }

  async attachEvent() {
    const button = document.getElementById("playbtn");
    const input = document.getElementById("inputbox") as HTMLInputElement;

    input.disabled = !this.contentInfo.isPlay;
    button.addEventListener("click", () => {
      if (this.contentInfo.isPlay) {
        this.resetInfo();
      } else {
        this.contentInfo.isPlay = true;
        answerSeet.seet = generateNewSeet(questionSeet.data.length);
        this.headerInfo.score = answerSeet.seet.length;
        this.setCurrentQuestion();
        this.timer = setInterval(() => {
          const givenTime = questionSeet.data[answerSeet.currentIndex].second;
          const currentAnswer = answerSeet.seet[answerSeet.currentIndex];
          currentAnswer.solveTime++;
          if (currentAnswer.solveTime === givenTime) {
            currentAnswer.isCorrect = false;
            this.nextQuestion();
            this.childUpdate();
          } else {
            this.headerInfo.second = givenTime - currentAnswer.solveTime;
            eventQueue.push({ fn: this.headRender, data: this.headerInfo });
          }
        }, 1000);
      }
      this.childUpdate();
    });
    input.addEventListener("keyup", (event: KEY_UP_EVENT) => {
      if (event.key === "Enter") {
        const isAnswer =
          this.contentInfo.currentStr ===
          questionSeet.data[answerSeet.currentIndex].text;
        if (isAnswer) {
          this.nextQuestion();
        } else {
          this.contentInfo.currentStr = "";
        }
        this.childUpdate();
      } else {
        this.contentInfo.currentStr = event.target.value;
      }
    });
  }
}

export default QuestionPage;
