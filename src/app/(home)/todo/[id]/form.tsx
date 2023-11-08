"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { EditableTodoFields, editableTodoSchema } from "./page";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleEditTodo } from "./actions";
import { Todo } from "@prisma/client";

const Form = ({ todo }: { todo: Todo }) => {
  const router = useRouter();

  const form = useForm<EditableTodoFields>({
    resolver: zodResolver(editableTodoSchema),
    defaultValues: {
      title: todo.title,
      content: todo.content,
      completed: todo.completed,
      status: todo.status,
      permission: todo.permission,
    },
  });

  const onSubmit = async (data: EditableTodoFields) => {
    const editedTodo = await handleEditTodo(data);
    if (editedTodo.id) {
      form.reset();
      router.push(`/`);
    }
  };

  return (
    <form
      className="flex justify-center gap-6  w-full h-full  flex-col    "
      onSubmit={form.handleSubmit((data) => onSubmit(data))}
    >
      <input
        className={`text-4xl font-bold  bg-transparent text-green-900  transition-all focus:outline-none focus:border-transparent active:border-transparent   w-full h-fit resize-none `}
        id="title"
        required
        defaultValue={todo.title}
        minLength={1}
        maxLength={40}
        {...form.register("title")}
        autoComplete="new-title"
        placeholder="Buy her flowers 🌹"
      />
      <textarea
        className={`bg-transparent text-green-900  transition-all focus:outline-none focus:border-transparent active:border-transparent w-full h-full resize-none text-lg font-medium  `}
        minLength={1}
        maxLength={1200}
        defaultValue={todo.content}
        id="title"
        {...form.register("content")}
        autoComplete="off"
        required
        placeholder="Steps to reach the goal: 1. Go to the flower shop..."
      />

      <button
        className=" fixed  bottom-8 right-8 disabled:bg-green-400   rounded-full text-lg p-4 focus:outline-none  transition-all text-white
        bg-green-700 hover:bg-green-500 focus:bg-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-50
        "
        type="submit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
          />
        </svg>
      </button>
    </form>
  );
};

export default Form;
