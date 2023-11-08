import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Pol/Notes",
    template: "%s - Pol/Notes",
  },
  description: "A simple note taking app with sharing option",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-green-100 flex items-center flex-col w-full h-screen `}
      >
        <NavBar />
        <div className="mt-20  h-full p-4 md:p-8 xl:p-16 w-full flex justify-center">
          {children}
        </div>
      </body>
    </html>
  );
}
