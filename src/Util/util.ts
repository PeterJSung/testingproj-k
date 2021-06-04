import { eventQueue } from "../store/EventStore";
import { SeetDataSet } from "../store/QuestionStore";

const extractData = <T>(object: Object, key: string, defaultValue: T): T => {
  if (object && object[key] !== undefined) {
    return object[key];
  } else {
    return defaultValue;
  }
};

const generateNewSeet = (count: number): SeetDataSet[] => {
  const ret: SeetDataSet[] = [];
  for (let i = 0; i < count; i++) {
    ret.push({ isCorrect: true, solveTime: 0 });
  }
  return ret;
};

const getResultInfo = (userSeet: SeetDataSet[]): [number, number] => {
  let correctCount: number = 0;
  let avgTime: number = 0;
  userSeet.forEach((data) => {
    if (data.isCorrect) {
      correctCount++;
      avgTime += data.solveTime;
    }
  });
  return [
    correctCount,
    correctCount > 0 ? Math.floor(avgTime / correctCount) : 0,
  ];
};

const getScore = (userSeet: SeetDataSet[]): number => {
  let inCorrectCount: number = 0;
  userSeet.forEach((data) => {
    if (!data.isCorrect) {
      inCorrectCount++;
    }
  });
  return userSeet.length - inCorrectCount;
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

export { extractData, generateNewSeet, getScore, getResultInfo, goRoute };
