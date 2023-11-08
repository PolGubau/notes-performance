import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/libs/db";
import { Todo } from "@prisma/client";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

export const parseDate = (date: Date) => {
  const d = new Date(date);
  // to english format with long month
  return d.toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
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
        <Link
          href={`/todo/${todo.id}`}
          key={todo.id}
          className="flex flex-col gap-4 max-w-screen-xl w-full rounded-2xl bg-green-200 p-4 md:p-8 group hover:brightness-90 focus:ring-2 focus:ring-green-300 focus:rign-green-500 focus:outline-none focus:ring-offset-2 focus:ring-offset-green-50 transition-all"
        >
          <header className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{todo.title}</h2>
            <p> {parseDate(todo.updatedAt)}</p>
          </header>
          <p className="truncate">{todo.content}</p>
        </Link>
      ))}
    </ul>
  );
}
