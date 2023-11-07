import React from "react";
import Link from "next/link";

const NavBar = async () => {
  return (
    <nav className="w-full justify-center flex">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between p-4 w-full">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          <Link href="https://polgubau.com" className="text-neutral-700">
            Pol/
          </Link>
          <Link href="/" className="text-green-500">
            Notes
          </Link>
        </span>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"></ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
