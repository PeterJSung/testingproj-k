import { eventQueue } from "../store/EventStore";
import {
  QuestionDataSet,
  SeetDataSet,
  UserAnswerSeet,
} from "../store/QuestionStore";

const extractData = <T>(object: Object, key: string, defaultValue: T): T => {
  if (object && object[key] !== undefined) {
    return object[key];
  } else {
    return defaultValue;
  }
};

const generateNewSeet = (questions: QuestionDataSet[]): SeetDataSet[] => {
  return questions.map((eachData) => ({
    answer: "",
    duration: 0,
    text: eachData.text,
    second: eachData.second,
  }));
};

const writeToSeet = (
  userSeet: UserAnswerSeet,
  duration: number,
  answer: string
) => {
  if (userSeet.currentIndex >= userSeet.seet.length) {
    return;
  }
  userSeet.seet[userSeet.currentIndex].answer = answer;
  userSeet.seet[userSeet.currentIndex].duration = duration;
};

const getScore = (userSeet: UserAnswerSeet): number => {
  let ret = 0;
  userSeet.seet.forEach((data) => {
    if (data.answer === data.text) {
      ret++;
    }
  });
  return ret;
};

const goRoute = async (next: string) => {
  eventQueue.push({
    fn: async () => {
      // page 가 전환되면 전부다 이벤트 강제로 전부다 클리어해주고 다음해쉬로 전환함
      while (eventQueue.length > 0) {
        eventQueue.shift();
      }
      window.location.hash = next;
    },
    data: {},
  });
};

export { extractData, generateNewSeet, writeToSeet, getScore, goRoute };
