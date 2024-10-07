import { initTRPC } from "@trpc/server";
import { z } from "zod";

import { userService } from "./services/userService";

const t = initTRPC.create();
const publicProcedure = t.procedure;

export const appRouter = t.router({
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        return await userService.createUser(input);
      } catch (error: unknown) {
        if (error instanceof z.ZodError) {
          throw new Error(
            "Invalid user data: " +
              error.errors.map((e) => e.message).join(", ")
          );
        }
        if (error instanceof Error) {
          throw new Error("Failed to create user: " + error.message);
        }
        throw new Error("Failed to create user: Unknown error");
      }
    }),

  getUsers: publicProcedure
    .input(
      z.object({
        page: z.number().optional().default(1),
        pageSize: z.number().optional().default(10),
      })
    )
    .query(async ({ input }) => {
      try {
        return await userService.getUsers(input.page, input.pageSize);
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error("Failed to fetch users: " + error.message);
        }
        throw new Error("Failed to fetch users: Unknown error");
      }
    }),

  getUserById: publicProcedure.input(z.number()).query(async ({ input }) => {
    try {
      const user = await userService.getUserById(input);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error("Failed to fetch user: " + error.message);
      }
      throw new Error("Failed to fetch user: Unknown error");
    }
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
      try {
        return await userService.updateUser(input.id, input);
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error("Failed to update user: " + error.message);
        }
        throw new Error("Failed to update user: Unknown error");
      }
    }),

  deleteUser: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        console.log("Received input:", input);
        const { id } = input;
        return await userService.deleteUser(id);
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error("Failed to delete user: " + error.message);
        }
        throw new Error("Failed to delete user: Unknown error");
      }
    }),
});

export type AppRouter = typeof appRouter;
