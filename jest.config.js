import path from "path";

/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  testRegex: path.resolve("./.*.test.c?(t|j)s$"),
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {},
  collectCoverageFrom: [path.resolve("(ui|app|utils)/**/*.{ts,tsx}")],
  coverageReporters: ["clover", "json-summary", "lcov", "text-summary"],
};
