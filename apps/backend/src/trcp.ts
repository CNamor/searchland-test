import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

export const appRouter = t.router({
  test: t.procedure.query(() => {
    return { message: "Server running!" };
  }),

  addUser: t.procedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
      })
    )
    .mutation(({ input }) => {
      return { success: true, user: input };
    }),
});

export type AppRouter = typeof appRouter;
