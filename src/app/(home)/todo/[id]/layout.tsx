import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editing a note ",
  description: "A simple note taking app with sharing option",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col max-w-screen-xl w-full h-full">
      {children}
    </div>
  );
}
