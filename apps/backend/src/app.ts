import express, { Application } from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./trcp";

const app: Application = express();

app.use(express.json());

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    // createContext: () => null,
  })
);

export default app;
