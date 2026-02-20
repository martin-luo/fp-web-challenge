import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: "./",
});

// Jest config for client-side component tests
const customJestConfig: Config = {
  displayName: "health-onboarding-form/client",
  // Load environment variables before any tests run
  setupFiles: ["<rootDir>/jest-env-setup.ts"],
  // Setup after environment is prepared
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  testMatch: [
    "**/__tests__/**/*.client.(ts|tsx|js)",
    "**/*.client.(test|spec).(ts|tsx|js)",
    "!**/__tests__/**/*.server.(ts|tsx|js)",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(next-intl|use-intl|yet-another-react-lightbox)/)",
  ],
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
