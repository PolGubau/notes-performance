"use server";
import { z } from "zod";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "@/libs/db";
export const createTodoSchema = z.object({
  title: z.string().min(1).max(40),
  content: z.string().min(1).max(1200),
});
export type CreateTodoFields = z.infer<typeof createTodoSchema>;

export async function handleCreateTodo(data: CreateTodoFields) {
  const session = await getServerSession(authOptions);

  const userId = session.user.id;

  //   create this new todo in the database

  const res = await prisma.todo.create({
    data: {
      title: data.title,
      content: data.content,
      creatorId: userId,
      ownerId: userId,
    },
  });

  return res;
}
