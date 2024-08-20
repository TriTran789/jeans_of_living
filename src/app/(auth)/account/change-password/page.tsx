"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TiCancelOutline } from "react-icons/ti";
import { useSelector } from "react-redux";
import {
  useEditProfileMutation,
  useUpdatePasswordMutation,
} from "../../../../../redux/features/user/userApi";
import { TbLock } from "react-icons/tb";
import { useLogOutMutation } from "../../../../../redux/features/auth/authApi";

type Props = {};

function Login(prop: Props) {
  const [updatePassword] = useUpdatePasswordMutation();
  const [logout] = useLogOutMutation();
  const [error, setError] = useState(false);
  const [validate, setValidate] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      if (confirmedPassword === newPassword) {
        await updatePassword({ oldPassword, newPassword }).unwrap();
        await logout({}).unwrap();
        router.push("/");
      }
    } catch (err: any) {
      setError(true);
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="lg:w-[30%] md:w-[45%] w-[80%] mt-10 shadow-subnav p-4 flex flex-col gap-3">
        <h1 className="uppercase font-Roboto-mono text-[20px] font-[600] flex items-center">
          Thay đổi mật khẩu
        </h1>
        <p className={`${error ? 'block' : 'hidden'}`}>Mật khẩu cũ không đúng.</p>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex">
            <div className="flex items-center justify-center px-2 bg-[#eee] border-2">
              <TbLock />
            </div>
            <input
              type="password"
              placeholder="Mật khẩu cũ"
              id="oldPassword"
              className="border-2 border-l-0 w-full pl-4 py-1 focus:outline-none font-Roboto-mono text-[16px]"
              onChange={(e: any) => setOldPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex">
            <div className="flex items-center justify-center px-2 bg-[#eee] border-2">
              <TbLock />
            </div>
            <input
              type="password"
              placeholder="Mật khẩu mới"
              id="newPassword"
              className="border-2 border-l-0 w-full pl-4 py-1 focus:outline-none font-Roboto-mono text-[16px]"
              onChange={(e: any) => setNewPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <div>
            <div className="flex">
              <div className="flex items-center justify-center px-2 bg-[#eee] border-2">
                <TbLock />
              </div>
              <input
                placeholder="Xác nhận mật khẩu mới"
                type="password"
                className="border-2 border-l-0 w-full pl-4 py-1 focus:outline-none font-Roboto-mono text-[16px]"
                onChange={(e: any) => setConfirmedPassword(e.target.value)}
                required
              />
            </div>
            <p className={`text-red-700 ${validate ? "block" : "hidden"}`}>
              Mật khẩu xác nhận không khớp
            </p>
          </div>

          <button className="uppercase bg-[#ba2e34] text-[16px] py-1 hover:text-white">
            Thay đổi
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
