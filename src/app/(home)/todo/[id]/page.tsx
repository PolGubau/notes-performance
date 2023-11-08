import prisma from "@/libs/db";
import EditForm from "./form";

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
      {todo ? <EditForm todo={todo} /> : <div>Todo not found</div>}
    </main>
  );
}
