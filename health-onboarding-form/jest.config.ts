import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: "./",
});

// Add any custom config to be passed to Jest
// NOTE: This config is a fallback for tests that don't follow .client or .server naming
// For new tests, prefer using jest.client.config.ts or jest.server.config.ts
const customJestConfig: Config = {
  // Load environment variables before any tests run
  setupFiles: ["<rootDir>/jest-env-setup.ts"],
  // Setup after environment is prepared
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  testMatch: [
    "**/__tests__/**/*.(ts|tsx|js)",
    "**/*.(test|spec).(ts|tsx|js)",
    "!**/*.client.(test|spec).(ts|tsx|js)",
    "!**/*.server.(test|spec).(ts|tsx|js)",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  collectCoverageFrom: [
    "app/**/*.{js,jsx,ts,tsx}",
    "_actions/**/*.{js,jsx,ts,tsx}",
    "_components/**/*.{js,jsx,ts,tsx}",
    "_contexts/**/*.{js,jsx,ts,tsx}",
    "_types/**/*.{js,jsx,ts,tsx}",
    "types/**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/*.stories.{js,jsx,ts,tsx}",
    "!**/index.ts",
    "!**/test-utils/*",
    "!**/__tests__/*",
    "!**/*.{test,spec}.{js,jsx,ts,tsx}",
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig);
