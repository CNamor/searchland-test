import { z } from "zod";
import { eq, sql } from "drizzle-orm";

import { db } from "../db";
import { users } from "../schema";
import { User } from "../types/User.type";

const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

const updateUserSchema = z.object({
  id: z.number(),
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
});

export const userService = {
  createUser: async (userData: z.infer<typeof userSchema>) => {
    const { name, email } = userData;
    const result: User[] = await db
      .insert(users)
      .values({
        name,
        email,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    return result;
  },
  getUsers: async (page: number, pageSize: number) => {
    const offset = (page - 1) * pageSize;

    const results = await db
      .select()
      .from(users)
      .limit(pageSize)
      .offset(offset)
      .execute();

    const totalCountResult = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(users)
      .execute();

    const totalCount = totalCountResult[0].count;

    return {
      results,
      totalCount,
    };
  },
  getUserById: async (id: number) => {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .execute();
    return result.length > 0 ? result[0] : undefined;
  },
  updateUser: async (
    id: number,
    userData: z.infer<typeof updateUserSchema>
  ) => {
    const { name, email } = userData;
    const updateFields: Partial<{
      name: string;
      email: string;
      updatedAt: Date;
    }> = {
      updatedAt: new Date(),
    };
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    const result = await db
      .update(users)
      .set(updateFields)
      .where(eq(users.id, id))
      .returning();
    return result;
  },
  deleteUser: async (id: number) => {
    const result = await db.delete(users).where(eq(users.id, id)).returning();
    return result;
  },
};
