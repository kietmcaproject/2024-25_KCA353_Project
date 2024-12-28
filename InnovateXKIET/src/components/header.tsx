"use client";

import React from "react";
import ThemeSwitch from "../app/theme-switch"; // Import the ThemeSwitch

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import useScroll from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

import Image from "next/image";
import logo from "@/public/assests/landingPage/logo.png";

const Header = () => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200 dark:text-white dark:bg-gray-900`,
        {
          "border-b border-gray-200 bg-white/75 backdrop-blur-lg": scrolled,
          "border-b border-gray-200 bg-white": selectedLayout,
        }
      )}
    >
      <div className="flex h-[47px] items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link
            href="#"
            className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 border-b border-zinc-200 dark:border-gray-700 h-12 w-full"
          >
            <Image
              src={logo}
              alt="logo"
              // width={60}
              // height={60}
              className="h-7 w-7 bg-zinc-300 dark:bg-gray-600 rounded-lg"
            />
            <span className="font-bold text-xl hidden md:flex text-gray-900 dark:text-gray-100">
              InnovateX
            </span>
          </Link>
          {/* <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            <span className="h-7 w-7 bg-zinc-300 rounded-lg" />
            <span className="font-bold text-xl flex ">Logo</span>
          </Link> */}
        </div>

        {/* Theme switch for mobile view (centered) */}
        <div className="md:hidden left-1/2 transform -translate-x-1/2">
          <ThemeSwitch />
        </div>

        {/* Right-side profile or theme switch for desktop view */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeSwitch />
          {/* <div className="h-8 w-8 rounded-full bg-zinc-300 flex items-center justify-center text-center">
            <span className="font-semibold text-sm">HQ</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
