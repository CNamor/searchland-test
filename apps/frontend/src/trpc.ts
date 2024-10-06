import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../backend/src/trcp";

export const trpc = createTRPCReact<AppRouter>();
