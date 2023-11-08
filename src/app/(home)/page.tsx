import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "@/libs/db";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const notes = await prisma.todo.findMany({
    where: {
      ownerId: session?.user?.id,
    },
  });
  console.log(notes);

  return (
    <main className="flex flex-col gap-6">
      <Link
        href="/create"
        className="mb-4 bg-green-300 w-fit px-4 py-2 rounded-full hover:brightness-75 transition-all focus:ring-2 focus:ring-green-300 focus:rign-green-500 focus:outline-none focus:ring-offset-2 focus:ring-offset-green-50 flex gap-1 items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Create a new note
      </Link>
      <ul className="flex flex-col gap-4   max-w-screen-xl w-full divide-y">
        {notes.map((todo: any) => (
          <Link
            href={`/todo/${todo.id}`}
            key={todo.id}
            className="flex flex-col gap-4 max-w-screen-xl w-full rounded-2xl bg-green-200 p-4 md:p-8 group hover:brightness-90 focus:ring-2 focus:ring-green-300 focus:rign-green-500 focus:outline-none focus:ring-offset-2 focus:ring-offset-green-50 transition-all"
          >
            <header className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{todo.title}</h2>
            </header>
            <p className="truncate">{todo.content}</p>
          </Link>
        ))}
      </ul>
    </main>
  );
}
