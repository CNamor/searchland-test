import { initTRPC } from "@trpc/server";
import { z } from "zod";

import { userService } from "./services/userService";

const t = initTRPC.create();
const publicProcedure = t.procedure;

export const appRouter = t.router({
  hello: publicProcedure.query(() => {
    return {
      message: "hello world",
    };
  }),
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      return userService.createUser(input);
    }),
  getUsers: publicProcedure
    .input(
      z.object({
        page: z.number().optional().default(1),
        pageSize: z.number().optional().default(10),
      })
    )
    .query(async ({ input }) => {
      return userService.getUsers(1, 10);
    }),
  getUserById: publicProcedure.input(z.number()).query(async ({ input }) => {
    return userService.getUserById(input);
  }),
  updateUser: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1).optional(),
        email: z.string().email().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return userService.updateUser(input.id, input);
    }),
  deleteUser: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      console.log("Received input:", input);
      const { id } = input;
      return await userService.deleteUser(id);
    }),
});

export type AppRouter = typeof appRouter;
