import { ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex w-full bg-black h-20 items-center text-white justify-between mx-auto">
      <div className="font-bold mx-10 uppercase">
        <Link href="/">
          <div>
            Timeless <span className="text-red-500 underline">Haven</span>
          </div>
        </Link>
      </div>
      <div className="lg:flex mx-auto hidden">
        <ul className="flex flex-row gap-4">
          <li>
            <Link href="/bedsheets" className="hover:text-red-500">
              Bedsheets
            </Link>
          </li>
          <span>|</span>
          <li>
            <Link href="/handPrint" className="hover:text-red-500">
            Hand Print
            </Link>
          </li>
          <span>|</span>
          <li>
            <Link href="/pillow" className="hover:text-red-500">
              Pillow
            </Link>
          </li>
          <span>|</span>
          <li>
            <Link href="/blanket" className="hover:text-red-500">
              Blanket
            </Link>
          </li>
        </ul>
      </div>
      <div className="mx-10 flex flex-row gap-4">
        <Link href="/cart" className="hover:text-red-500">
          <ShoppingCart />
        </Link>
        <Link href="/profile" className="hover:text-red-500">
          <User />
        </Link>
      </div>
    </div>
  );
};

export default Header;
