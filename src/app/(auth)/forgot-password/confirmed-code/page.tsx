"use client";
import React from "react";
import { useState } from "react";
import { TbLock } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useConfirmMutation } from "../../../../../redux/features/auth/authApi";

type Props = {};

function Login(prop: Props) {
  const { token } = useSelector((state: any) => state.auth);
  const [confirm] = useConfirmMutation();
  const [error, setError] = useState(false);
  const router = useRouter();
  const [code, setCode] = useState('');

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const res = await confirm({ confirmed_token: token, confirmed_code: code }).unwrap();
      router.push("/forgot-password/set-new-password");
    } catch (error: any) {
      setError(true);
    }
  };

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   const res = await axios
  //     .post(`${process.env.NEXT_PUBLIC_SERVER_URI}/login`, formData, {
  //       withCredentials: true,
  //     })
  //     .then((res) => res.data)
  //     .catch((res) => res.response.data);
  //   console.log(res);
  //   if (res.success) {
  //     router.push("/account");
  //   } else {
  //     setError(true);
  //   }
  // };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="lg:w-[25%] md:w-[40%] w-[80%] mt-10 shadow-subnav p-4 flex flex-col gap-3">
        <h1 className="uppercase font-Roboto-mono text-[20px] font-[600] flex items-center">
          nhập mã xác nhận
        </h1>
        <p className={`${error ? "hidden" : "block"} font-[500]`}>
          Vui lòng kiểm tra email để nhận mã.
        </p>
        <p className={`${error ? "block" : "hidden"} text-red-700 font-[500]`}>
          Mã xác nhận không đúng.
        </p>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex">
            <div className="flex items-center justify-center px-2 bg-[#eee] border-2">
              <TbLock />
            </div>
            <input
              type="string"
              placeholder="Mã xác nhận"
              id="code"
              className="border-2 border-l-0 w-full pl-4 py-1 focus:outline-none font-Roboto-mono text-[16px]"
              onChange={(e: any) => setCode(e.target.value)}
              required
            />
          </div>

          <button className="uppercase bg-[#ba2e34] text-[16px] py-1 hover:text-white">
            Xác nhận
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
