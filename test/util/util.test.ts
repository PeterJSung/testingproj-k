import * as _ from 'lodash'

import {
  extractData,
  generateNewSeet,
  getResultInfo,
  getScore,
} from "../../src/util/util";

import API_JSON from "../apires.json";
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
    expect(generateNewSeet(API_JSON)).toStrictEqual(MOCK_SHEET);
  });

  it("getResultInfo", () => {
    const dummySeet = _.cloneDeep(MOCK_SHEET)
    dummySeet[0].answer = dummySeet[0].text
    dummySeet[0].duration = dummySeet[0].second - 1

    dummySeet[1].answer = dummySeet[1].text
    dummySeet[1].duration = dummySeet[1].second - 1

    //2문제 맞고 평균시간 1초나와야함

    expect(getResultInfo(dummySeet)).toEqual([2,1]);
  });

  it("getScore", () => {
    const dummySeet = _.cloneDeep(MOCK_SHEET)
    dummySeet[0].answer = dummySeet[0].text
    dummySeet[1].answer = dummySeet[1].text
    dummySeet[2].answer = dummySeet[2].text

    //3문제 맞아야함

    expect(getScore(dummySeet)).toEqual(3);
  });
});
