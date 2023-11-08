import { z } from "zod";
import Form from "./form";
import prisma from "@/libs/db";

export const createTodoSchema = z.object({
  id: z.string().cuid(),
  title: z.string().min(1).max(40),
  content: z.string().min(1).max(1200),
  creatorId: z.string().cuid(),
  ownerId: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  completed: z.boolean(),
  completedAt: z.date().nullable(),
  status: z.number(),
  permission: z.number(),
  endAt: z.date().nullable(),
});
export type EditableTodoFields = z.infer<typeof createTodoSchema>;

export default async function Home({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const todo = await prisma.todo.findUnique({
    where: {
      id: params.id,
    },
  });
  return (
    <main className="flex flex-col w-full h-full">
      {todo ? <Form todo={todo} /> : <div>Todo not found</div>}
    </main>
  );
}
