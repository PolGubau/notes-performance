import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create a note ",
  description: "A simple note taking app with sharing option",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col p-8 md:p-12 max-w-screen-xl w-full h-full">
      <Link
        href="/"
        className="mb-4 bg-transparent hover:bg-green-300 w-fit px-4 py-2 rounded-full   transition-all focus:ring-2 focus:ring-green-300 focus:rign-green-500 focus:outline-none focus:ring-offset-2 focus:ring-offset-green-50 flex gap-1 items-center text-green-800"
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
            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
          />
        </svg>
        Return
      </Link>
      {children}
    </div>
  );
}
