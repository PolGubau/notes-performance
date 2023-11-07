"use client";

import Link from "next/link";
import React from "react";
import { NavItem } from "./types";

const NavContent = ({ links = [] }: { links?: NavItem[] }) => {
  return (
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between p-4 w-full">
      <Link href="/" className="flex items-center">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          Pol/<span className="text-green-500">Notes</span>
        </span>
      </Link>

      <div className="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-neutral-900 md:p-0 dark:text-white md:dark:text-green-500"
                aria-current="page"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavContent;
