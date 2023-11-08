import Link from "next/link";
import { Suspense } from "react";
import TodoList from "@/components/TodoList";
import Loading from "@/components/Loading";

export default async function Home() {
  return (
    <main className="flex flex-col gap-6 pb-16 ">
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
      <Suspense fallback={<Loading />}>
        <TodoList />
      </Suspense>
    </main>
  );
}
