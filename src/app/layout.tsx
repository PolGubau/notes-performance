import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
