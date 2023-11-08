"use server";

import prisma from "@/libs/db";
import { Todo } from "@prisma/client";
import { EditableTodoFields } from "./schemas";
import { revalidatePath } from "next/cache";

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

  revalidatePath(`/`);
  return res;
}
export const handleDeleteTodo = async (id: string) => {
  const deleted = prisma.todo.delete({
    where: {
      id,
    },
  });
  revalidatePath(`/`);

  return deleted;
};
