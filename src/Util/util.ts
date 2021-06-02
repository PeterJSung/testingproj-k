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

export { extractData, generateNewSeet, writeToSeet, getScore };
