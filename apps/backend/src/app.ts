import express, { Application } from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";

import { appRouter } from "./trcp";

const app: Application = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
  })
);

export default app;
