"use client";
import React from "react";
import { useSelector } from "react-redux";
import { HiOutlineLogout } from "react-icons/hi";
import { useLogOutMutation } from "../../../../redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { RiAdminLine } from "react-icons/ri";

type Props = {};

const Page = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const [logout] = useLogOutMutation();
  const router = useRouter();

  const logOutHandler = async (e: any) => {
    const res = await logout({}).unwrap();
    router.push("/");
  };

  return (
    <div className="w-full flex justify-center my-7">
      <div className="lg:w-[80%] md:w-[85%] w-[90%] p-3 flex flex-col">
        <div className="flex items-center justify-between">
          <h1 className="text-[24px] font-Roboto-mono font-[500]">
            Tài khoản của bạn
          </h1>
          <div
            className="flex items-center text-[16px] font-[500] text-red-700 hover:cursor-pointer"
            onClick={logOutHandler}
          >
            <HiOutlineLogout className="mr-1" />
            Thoát
          </div>
        </div>
        <div className="flex md:flex-row flex-col justify-between gap-4 items-start">
          <div className="flex-1 border p-2 max-sm:w-full max-sm:order-2">
            <p>Bạn chưa mua sản phẩm</p>
          </div>
          <ul className="font-[500] text-[16px] p-2 border max-sm:w-full max-sm:order-1">
            <li
              className={`${
                user.role === "admin" ? "block" : "hidden"
              } flex items-center text-red-700 cursor-pointer`}
              onClick={() => router.push("/account/admin/dashboard")}
            >
              <RiAdminLine />
              <span className="ml-1">Admin Dashboard</span>
            </li>
            <li>
              <span className="w-[76px] inline-block">Họ tên</span>:{" "}
              {user.lastname + " " + user.firstname}
            </li>
            <li>
              <span className="w-[76px] inline-block">Email</span>: {user.email}
            </li>
            <li className="flex items-start space-x-1">
              <span className="w-[76px] inline-block">Địa chỉ</span>:{" "}
              <p className="inline-block max-w-[270px]">{user.address}</p>
            </li>
            <li>
              <span className="w-[76px] inline-block">Quốc gia</span>:{" "}
              {user.nation}
            </li>
            <li>
              <span className="w-[76px] inline-block">Điện thoại</span>:{" "}
              {user.phone}
            </li>
            <div className="flex justify-between text-red-700 items-center hover:cursor-pointer">
              <div
                className="flex items-center"
                onClick={() => router.push("/account/change-password")}
              >
                <RiLockPasswordLine />
                <p className="px-1">Đổi mật khẩu</p>
              </div>
              <div
                className="flex items-center"
                onClick={() => router.push("/account/edit")}
              >
                <FaEdit />
                <p className="px-1">Sửa</p>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
