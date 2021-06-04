import * as _ from "lodash";

import {
  extractData,
  generateNewSeet,
  getResultInfo,
  getScore,
} from "../../src/util/util";

import MOCK_SHEET from "../mockseet.json";

describe("test util", () => {
  it("extractData", () => {
    const keyRes = extractData<string>({ key: "res" }, "key", "");
    const defaultRes = extractData<string>({ key: "res" }, "", "default");
    const numberRes = extractData<number>({ numberKey: 100 }, "numberKey", 0);
    expect(keyRes).toBe("res");
    expect(defaultRes).toBe("default");
    expect(numberRes).toBe(100);
  });

  it("generateNewSeet", () => {
    expect(generateNewSeet(12)).toStrictEqual(MOCK_SHEET);
  });

  it("getResultInfo", () => {
    const dummySeet = _.cloneDeep(MOCK_SHEET);
    dummySeet[0].isCorrect = true;
    dummySeet[0].solveTime = 2;

    dummySeet[1].isCorrect = true;
    dummySeet[1].solveTime = 4;
    for (let i = 2; i < dummySeet.length; i++) {
      dummySeet[i].isCorrect = false;
    }

    //2문제 맞고 평균시간 3초나와야함 2번문제부터 다틀린거임

    expect(getResultInfo(dummySeet)).toEqual([2, 3]);
  });

  it("getScore", () => {
    const dummySeet = _.cloneDeep(MOCK_SHEET);
    dummySeet[1].isCorrect = false;
    dummySeet[2].isCorrect = false;

    //3문제 맞아야함
    expect(getScore(dummySeet)).toEqual(MOCK_SHEET.length - 2);
  });
});
