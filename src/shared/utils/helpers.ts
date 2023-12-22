import { CamelCase } from "./types";

export const capitalizeStr = (str: string) =>
  str.charAt(0).toUpperCase().concat(str.slice(1).toLowerCase());

export const camelCaseStr = (str: string, seperator: string) => {
  return str
    .split(seperator)
    .map((seg, idx) => (idx === 0 ? seg.toLowerCase() : capitalizeStr(seg)))
    .join("");
};
