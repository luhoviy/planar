const jestBaseConfig = require("./jest.config");

module.exports = {
  ...jestBaseConfig,
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/app/**/*.ts"],
  coverageReporters: ["lcov"]
};
