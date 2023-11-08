"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { Todo } from "@prisma/client";
import { handleDeleteTodo, handleEditTodo } from "./actions";
import { Routes } from "@/constants/routes";
import Loading from "@/components/Loading";

const EditForm = ({ todo }: { todo: Todo }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      title: todo.title,
      content: todo.content,
    },
  });

  const onSubmit = async (data: { title: string; content: string }) => {
    const editedTodo = await handleEditTodo({ ...data, id: todo.id });

    if (editedTodo) {
      router.push(Routes.home);
    }
  };

  const onDelete = async (id: string) => {
    const deletedTodo = await handleDeleteTodo(id);
    if (deletedTodo) {
      router.push(Routes.home);
    }
  };

  return (
    <section className="relative w-full h-full">
      <form
        className="flex justify-center gap-6  w-full h-full  flex-col"
        onSubmit={handleSubmit((data) => {
          console.log(data);
          onSubmit(data);
        })}
      >
        <input
          className={`text-4xl font-bold  bg-transparent text-green-900  transition-all focus:outline-none focus:border-transparent active:border-transparent   w-full h-fit resize-none `}
          id="title"
          required
          defaultValue={todo.title}
          minLength={1}
          maxLength={40}
          {...register("title", {
            required: true,
            minLength: 1,
            maxLength: 60,
          })}
          autoComplete="new-title"
          placeholder="Buy her flowers 🌹"
        />
        <textarea
          className={`bg-transparent text-green-900  transition-all focus:outline-none focus:border-transparent active:border-transparent w-full h-full resize-none text-lg font-medium  `}
          minLength={1}
          maxLength={1200}
          defaultValue={todo.content}
          id="title"
          {...register("content", {
            required: true,
            minLength: 1,
            maxLength: 1200,
          })}
          autoComplete="off"
          required
          placeholder="Steps to reach the goal: 1. Go to the flower shop..."
        />
        <nav className="fixed bottom-6 right-0 px-6 flex justify-between items-center gap-2 w-full">
          <button
            className="  disabled:bg-red-400   rounded-full text-lg p-4 focus:outline-none  transition-all text-white
        bg-red-700 hover:bg-red-500 focus:bg-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-50
        "
            type="button"
            onClick={() => onDelete(todo.id)}
          >
            {isSubmitting ? (
              <Loading />
            ) : (
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
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            )}
          </button>
          <button
            className="  disabled:bg-green-400   rounded-full text-lg p-4 focus:outline-none  transition-all text-white
        bg-green-700 hover:bg-green-500 focus:bg-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-50
        "
            type="submit"
          >
            {isSubmitting ? (
              <Loading />
            ) : (
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
            )}
          </button>
        </nav>
      </form>
    </section>
  );
};

export default EditForm;
