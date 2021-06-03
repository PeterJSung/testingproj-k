import {
  extractData,
  generateNewSeet,
  getResultInfo,
  getScore,
  goRoute,
  writeToSeet,
} from "../../src/util/util";

import API_JSON from "../apires.json";
import MOCK_SHEET from "../mockseet.json";

import {
  QuestionDataSet,
  SeetDataSet,
  UserAnswerSeet,
} from "../../src/store/QuestionStore";

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
    expect(generateNewSeet(API_JSON)).toStrictEqual(MOCK_SHEET);
  });
});
