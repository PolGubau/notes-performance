"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { handleCreateTodo } from "./actions";
import { CreateTodoFields } from "./schemas";
import Loading from "@/components/Loading";

const CreateForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (data: CreateTodoFields) => {
    const editedTodo = await handleCreateTodo(data);
    if (editedTodo.id) {
      router.push(`/`);
    }
  };

  return (
    <form
      className={`flex justify-center gap-6  w-full h-full  flex-col  ${
        isSubmitting ? "opacity-50 " : ""
      } `}
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <input
        autoFocus
        className={` p-2 rounded-xl text-4xl font-bold  bg-transparent text-green-800  transition-all focus:outline-none focus:border-transparent active:border-transparent placeholder:text-green-700 placeholder:text-opacity-40  w-full h-full resize-none `}
        id="title"
        required
        minLength={1}
        maxLength={40}
        {...register("title")}
        autoComplete="new-title"
        placeholder="Buy her flowers 🌹"
      />
      <textarea
        className={`p-2 rounded-xl  bg-transparent text-green-700 placeholder:text-opacity-40 placeholder:text-green-600  transition-all focus:outline-none focus:border-transparent active:border-transparent w-full h-full resize-none text-lg font-medium  `}
        minLength={1}
        maxLength={1200}
        id="title"
        {...register("content")}
        autoComplete="off"
        required
        placeholder="Steps to reach the goal: 1. Go to the flower shop..."
      />

      <nav className="fixed bottom-6 right-0 px-6 flex justify-end items-center gap-2 w-full">
        <button
          className="  disabled:bg-green-400 flex gap-2 items-center text-xl  rounded-full  p-4 focus:outline-none  transition-all text-white
        bg-green-700 hover:bg-green-500 focus:bg-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-50
        "
          type="submit"
        >
          Create
          {isSubmitting ? (
            <Loading />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
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
  );
};

export default CreateForm;
