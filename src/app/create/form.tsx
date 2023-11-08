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
        className={` p-2 rounded-xl text-4xl font-bold  bg-transparent text-green-900  transition-all focus:outline-none focus:border-transparent active:border-transparent   w-full h-full resize-none `}
        id="title"
        required
        minLength={1}
        maxLength={40}
        {...register("title")}
        autoComplete="new-title"
        placeholder="Buy her flowers 🌹"
      />
      <textarea
        className={`p-2 rounded-xl  bg-transparent text-green-900  transition-all focus:outline-none focus:border-transparent active:border-transparent w-full h-full resize-none text-lg font-medium  `}
        minLength={1}
        maxLength={1200}
        id="title"
        {...register("content")}
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
          <Loading />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        )}
      </button>
    </form>
  );
};

export default CreateForm;
