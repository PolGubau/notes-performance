"use server";

import { EditableTodoFields } from "./page";
import prisma from "@/libs/db";
import { Todo } from "@prisma/client";

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
