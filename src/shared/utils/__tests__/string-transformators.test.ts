import { camelCaseStr } from "../string-transformators";

describe("capitalizeStr function", () => {
  it("should return camelcased string if such provided with separator", () => {
    const string = "a_b_c";
    const string2 = "aa+bo+cd";
    const string3 = "aaa(bbb(ccc";

    const CCstr = camelCaseStr(string, "_");
    const CCstr2 = camelCaseStr(string2, "+");
    const CCstr3 = camelCaseStr(string3, "(");

    expect(CCstr).toBe("aBC");
    expect(CCstr2).toBe("aaBoCd");
    expect(CCstr3).toBe("aaaBbbCcc");
  });
  it("should return lowercased string if wrong seperator provided", () => {
    const str = "AAAAAAA";
    const str2 = "AAAAA_BBBBB_CCCCC";

    const CCstr = camelCaseStr(str, "#");
    const CCstr2 = camelCaseStr(str2, "%");

    expect(CCstr).toBe(str.toLowerCase());
    expect(CCstr2).toBe(str2.toLowerCase());
  });
});
