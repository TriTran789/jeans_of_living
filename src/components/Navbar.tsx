"use client";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { useState } from "react";

type Props = {};

const navItems = [
  { title: "home", address: "/" },
  {
    title: "shop",
    address: "/products",
    subnav: [
      { title: "dai", address: "/products/dai" },
      { title: "ngan", address: "/products/ngan" },
    ],
  },
  { title: "about", address: "/about" },
  { title: "jol facebook", address: "/facebook" },
  { title: "jol instagram", address: "/instagram" },
];

const Navbar = (props: Props) => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <div className="w-full max-md:hidden shadow-nav sticky top-0 z-10 bg-white">
      <ul className="flex justify-center gap-7 h-[50px]">
        {navItems.map((item, index) => {
          if (item.subnav) {
            return (
              <div
                className="flex items-center relative"
                onMouseEnter={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
                key={index}
              >
                <li
                  className={`uppercase items-center hover:text-red-700 font-Roboto-mono font-[500] flex`}
                >
                  <Link href={item.address}>{item.title}</Link>
                  <IoIosArrowDown />
                </li>
                <ul
                  className={`absolute top-[50px] z-10 flex flex-col bg-white shadow-subnav ${
                    dropdown ? "block" : "hidden"
                  }`}
                >
                  {item.subnav.map((subItem, index) => (
                    <li
                      key={index}
                      className="uppercase hover:text-red-700 font-Roboto-mono font-[500] min-w-[140px] h-[36px] flex items-center pl-3"
                    >
                      <Link href={subItem.address}>{subItem.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          } else {
            return (
              <li
                key={index}
                className={`uppercase items-center hover:text-red-700 font-Roboto-mono font-[500] flex`}
              >
                <Link href={item.address}>{item.title}</Link>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default Navbar;
