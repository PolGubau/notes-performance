"use server";
import { z } from "zod";

import prisma from "@/libs/db";
import { Todo } from "@prisma/client";
export const editableTodoSchema = z.object({
  id: z.string().cuid(),
  title: z.string().min(1).max(40),
  content: z.string().min(1).max(1200),
  creatorId: z.string().cuid(),
  ownerId: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  completed: z.boolean(),
  completedAt: z.date().nullable(),
  status: z.number(),
  permission: z.number(),
  endAt: z.date().nullable(),
});
export type EditableTodoFields = z.infer<typeof editableTodoSchema>;
export async function handleEditTodo(data: EditableTodoFields) {
  //   create this new todo in the database

  const res: Todo = await prisma.todo.update({
    where: {
      id: data.id,
    },
    data: {
      title: data.title,
      content: data.content,
      completed: data.completed,
      updatedAt: new Date(),
      status: data.status,
      permission: data.permission,
    },
  });

  return res;
}
