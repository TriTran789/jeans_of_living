"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RiShieldUserLine } from "react-icons/ri";
import { FaRegAddressBook } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { TiCancelOutline } from "react-icons/ti";
import { useSelector } from "react-redux";
import { useEditProfileMutation } from "../../../../../redux/features/user/userApi";

type Props = {};

function Login(prop: Props) {
  const [editProfile] = useEditProfileMutation();
  const { user } = useSelector((state: any) => state.auth);
  const [formData, setFormData] = useState({
    lastname: user.lastname as string,
    firstname: user.firstname as string,
    address: user.address as string,
    phone: user.phone as string,
  });
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      await editProfile(formData);
      router.push("/account");
    } catch (error: any) {
      setError(true);
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="lg:w-[30%] md:w-[45%] w-[80%] mt-10 shadow-subnav p-4 flex flex-col gap-3">
        <h1 className="uppercase font-Roboto-mono text-[20px] font-[600] flex items-center">
          Thông tin cá nhân
        </h1>
        <p
          className={`${
            error ? "block" : "hidden"
          } font-Roboto-mono font-[500]`}
        >
          Thông tin không hợp lệ.
        </p>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex">
            <div className="flex items-center justify-center px-2 bg-[#eee] border-2">
              <RiShieldUserLine />
            </div>
            <input
              type="text"
              placeholder="Họ"
              id="lastname"
              className="border-2 border-l-0 w-full pl-4 py-1 focus:outline-none font-Roboto-mono text-[16px]"
              defaultValue={user.lastname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex">
            <div className="flex items-center justify-center px-2 bg-[#eee] border-2">
              <RiShieldUserLine />
            </div>
            <input
              type="text"
              placeholder="Tên"
              id="firstname"
              className="border-2 border-l-0 w-full pl-4 py-1 focus:outline-none font-Roboto-mono text-[16px]"
              defaultValue={user.firstname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex">
            <div className="flex items-center justify-center px-2 bg-[#eee] border-2">
              <FaRegAddressBook />
            </div>
            <input
              placeholder="Địa chỉ (Số nhà + Tên đường + Quận/Huyện)"
              id="address"
              className="border-2 border-l-0 w-full pl-4 py-1 focus:outline-none font-Roboto-mono text-[16px]"
              defaultValue={user.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex">
            <div className="flex items-center justify-center px-2 bg-[#eee] border-2">
              <FiPhone />
            </div>
            <input
              placeholder="Số điện thoại"
              id="phone"
              className="border-2 border-l-0 w-full pl-4 py-1 focus:outline-none font-Roboto-mono text-[16px]"
              defaultValue={user.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button className="uppercase bg-[#ba2e34] text-[16px] py-1 hover:text-white">
            cập nhật
          </button>
        </form>
        <div
          className="text-red-700 font-[600] hover:cursor-pointer flex items-center"
          onClick={() => router.push("/account")}
        >
          <TiCancelOutline className="text-[24px]" /> Hủy
        </div>
      </div>
    </div>
  );
}

export default Login;
