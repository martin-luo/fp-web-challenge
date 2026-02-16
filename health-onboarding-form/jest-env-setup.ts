// Load environment variables from .env.test file for Jest tests
import dotenv from "dotenv";

// Set NODE_ENV to 'test' if not already set
if (!process.env.NODE_ENV) {
  Object.defineProperty(process.env, "NODE_ENV", {
    value: "test",
    writable: false,
    configurable: true,
    enumerable: true,
  });
}

// Path is relative to the project root where Jest is executed from
dotenv.config({ path: ".env.test" });

// Set default environment variables for tests if they're not in .env.test
if (!process.env.API_URL) {
  process.env.API_URL = "http://localhost:3001/api";
}