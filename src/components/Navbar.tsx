"use client";
import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { clickNavbar } from "../../redux/features/navbar/navbarSlice";

type Props = {};

const navItems = [
  { title: "home", address: "/" },
  { title: "shop", address: "/shop" },
  { title: "about", address: "/about" },
  { title: "jol facebook", address: "/facebook" },
  { title: "jol instagram", address: "/instagram" },
];

const Navbar = (props: Props) => {
  const navbarState = useSelector((state: any) => state.navbar);
  const dispatch = useDispatch();

  return (
    <>
      <div className="w-full max-md:hidden shadow-nav sticky top-0 z-10 bg-white">
        <ul className="flex justify-center gap-7 h-[50px]">
          {navItems.map((item, index) => {
            return (
              <li
                key={index}
                className={`uppercase items-center hover:text-red-700 font-Roboto-mono font-[500] flex`}
              >
                <Link href={item.address}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div
        className={`h-full fixed z-10 top-0 bottom-0 bg-[rgba(0,0,0,0.3)]  w-full ${
          navbarState.value ? "block" : "hidden"
        }`}
        onClick={() => dispatch(clickNavbar(false))}
      >
        <ul
          className="h-full w-[50%] bg-white flex flex-col gap-5 px-4 py-8"
          onClick={(e: any) => e.stopPropagation()}
        >
          {navItems.map((item, index) => (
            <li key={index} className="uppercase font-[500]" onClick={() => dispatch(clickNavbar(false))}>
              <Link href={item.address}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
