"use server";

import prisma from "@/libs/db";
import { Todo } from "@prisma/client";
import { EditableTodoFields } from "./schemas";

export async function handleEditTodo(data: EditableTodoFields) {
  const res: Todo = await prisma.todo.update({
    where: {
      id: data.id,
    },
    data: {
      title: data.title,
      content: data.content,
    },
  });

  return res;
}
