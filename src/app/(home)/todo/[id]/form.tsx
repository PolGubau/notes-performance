"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleEditTodo } from "./actions";
import { Todo } from "@prisma/client";
import { EditableTodoFields } from "./schemas";

const Form = ({ todo }: { todo: Todo }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      id: todo.id,
      title: todo.title,
      content: todo.content,
    },
  });

  const onSubmit = async (data: EditableTodoFields) => {
    const editedTodo = await handleEditTodo(data);
    if (editedTodo.id) {
      router.push(`/`);
    }
  };

  return (
    <form
      className="flex justify-center gap-6  w-full h-full  flex-col"
      onSubmit={handleSubmit((data) => {
        console.log(data);
        onSubmit(data);
      })}
    >
      <input
        type="hidden"
        {...register("id", {
          required: true,
        })}
      />

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

      <button
        className=" fixed  bottom-8 right-8 disabled:bg-green-400   rounded-full text-lg p-4 focus:outline-none  transition-all text-white
        bg-green-700 hover:bg-green-500 focus:bg-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-50
        "
        type="submit"
      >
        {isSubmitting ? (
          <svg
            aria-hidden="true"
            className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
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
    </form>
  );
};

export default Form;
