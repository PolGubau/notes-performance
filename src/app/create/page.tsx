"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleCreateTodo } from "./actions";
import { useRouter } from "next/navigation";
import { CreateTodoFields, createTodoSchema } from "./schemas";
import Loading from "@/components/Loading";
import { Routes } from "@/constants/routes";
import CreateForm from "./form";

export default function Home() {
  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateTodoFields>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (data: CreateTodoFields) => {
    const newtodo = await handleCreateTodo(data);
    console.log(newtodo);
    if (newtodo.id) {
      router.push(Routes.home);
      reset();
    }
  };

  return (
    <main className="flex flex-col w-full h-full relative">
      {isSubmitting && <Loading />}
      <CreateForm />
    </main>
  );
}
