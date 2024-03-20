import React from "react";
import Image from "next/image";
import { FaPhone } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { FiShoppingCart } from "react-icons/fi";
import { TiThMenu } from "react-icons/ti";
import Link from "next/link";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="w-full flex justify-center">
      <div className="flex justify-around md:w-[80%] w-[90%]">
        <div className="md:flex hidden items-center text-[18px] font-Roboto-mono">
          <div className="bg-red-700 mr-4 p-2 rounded-full">
            <FaPhone className="text-[20px]" />
          </div>
          0000000000
        </div>
        <div className="flex md:hidden items-center">
          <TiThMenu className="text-[24px]" />
        </div>
        <Link href={"/"}>
          <Image
            className="h-[80px] object-contain"
            src={require("../../public/assets/logo.jpg")}
            alt="logo"
          />
        </Link>
        <div className="text-[24px] flex items-center gap-4">
          <IoSearchSharp className="cursor-pointer" />
          <VscAccount className="cursor-pointer" />
          <FiShoppingCart className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Header;
