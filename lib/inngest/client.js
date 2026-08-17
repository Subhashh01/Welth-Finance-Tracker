import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "finance-platform", // Unique app ID
  name: "Finance Platform",
  isDev: process.env.NODE_ENV === "development" || !process.env.INNGEST_SIGNING_KEY,
  retryFunction: async (attempt) => ({
    delay: Math.pow(2, attempt) * 1000, // Exponential backoff
    maxAttempts: 2,
  }),
});