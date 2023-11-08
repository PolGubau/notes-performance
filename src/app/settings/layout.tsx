import { NavBar } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "A simple note taking app with sharing option",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />

      <div className="flex flex-col max-w-screen-xl w-full h-full mt-20 p-4 md:p-8 xl:p-16">
        {children}
      </div>
    </>
  );
}
