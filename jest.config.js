module.exports = {
  preset: "jest-preset-angular",
  roots: ["<rootDir>/src/"],
  testMatch: ["**/+(*.)+(spec).+(ts)"],
  setupFilesAfterEnv: ["<rootDir>/src/test.ts"],
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.(html|svg)$"
    }
  }
};
