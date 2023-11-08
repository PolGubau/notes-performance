import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/libs/db";
import { Todo } from "@prisma/client";
import { getServerSession } from "next-auth";
import React from "react";
import TodoItem from "./TodoItem";

export const parseDate = (date: Date) => {
  const d = new Date(date);
  return d.toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

export const parseDateMinimal = (date: Date) => {
  const d = new Date(date);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default async function TodoList() {
  const session = await getServerSession(authOptions);

  const notes = await prisma.todo.findMany({
    where: {
      ownerId: session?.user?.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <ul className="flex flex-col gap-4 max-w-screen-xl w-full ">
      {notes.map((todo: Todo) => (
        <li
          key={todo.id}
          className="grid gap-4 max-w-screen-xl w-full rounded-2xl bg-green-200 p-4 md:p-8 group focus:ring-2 focus:ring-green-300 focus:rign-green-500 focus:outline-none focus:ring-offset-2 focus:ring-offset-green-50 transition-all grid-cols-[3fr,1fr]"
        >
          <h2 className="text-2xl font-bold truncate">{todo.title}</h2>
          <div className="flex gap-2 items-center justify-end">
            <p className="hidden md:flex truncate">
              {" "}
              {parseDate(todo.updatedAt)}
            </p>
            <p className="md:hidden flex truncate ">
              {" "}
              {parseDateMinimal(todo.updatedAt)}
            </p>
          </div>
          <p className="truncate">{todo.content}</p>
          <TodoItem id={todo.id} />
        </li>
      ))}
    </ul>
  );
}
