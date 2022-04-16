import { formatUnixTimestamp } from "./dateUtils";

describe("dateUtils", () => {
  describe("formatUnixTimestamp", () => {
    it("should return formatted date", () => {
      const timestamp = "1649795447930";
      const res = formatUnixTimestamp(timestamp);
      expect(res).toEqual("12/04/2022");
    });
  });
});
