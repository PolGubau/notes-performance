"use client";

import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <main className="flex flex-col  p-8 md:p-24 max-w-screen-xl w-full">
      <section className="flex flex-col gap-8 items-center justify-between  max-w-screen-xl w-full">
        <h1>Settings</h1>
        <ul>
          <li>
            <button
              className="bg-green-300 px-4 py-2 rounded-full hover:brightness-75 transition-all focus:ring-2 focus:ring-green-300 focus:rign-green-500 focus:outline-none focus:ring-offset-2 focus:ring-offset-green-50 flex gap-2 items-center"
              onClick={() => signOut()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
                  clipRule="evenodd"
                />
              </svg>
              Logout
            </button>
          </li>
        </ul>
      </section>
    </main>
  );
}
