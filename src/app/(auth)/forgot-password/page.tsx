"use client";
import React from "react";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForgotPasswordMutation } from "../../../../redux/features/auth/authApi";

type Props = {};

function Login(prop: Props) {
  const [forgotPassword] = useForgotPasswordMutation();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const res = await forgotPassword(formData).unwrap();
      router.push("/forgot-password/confirmed-code");
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
          Quên mật khẩu
        </h1>
        <p
          className={`${
            error ? "block" : "hidden"
          } font-Roboto-mono font-[500]`}
        >
          Tài khoản không tồn tại.
        </p>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex">
            <div className="flex items-center justify-center px-2 bg-[#eee] border-2">
              <FaRegUser />
            </div>
            <input
              type="email"
              placeholder="Email"
              id="email"
              className="border-2 border-l-0 w-full pl-4 py-1 focus:outline-none font-Roboto-mono text-[16px]"
              onChange={handleChange}
              required
            />
          </div>

          <button className="uppercase bg-[#ba2e34] text-[16px] py-1 hover:text-white">
            tiếp tục
          </button>
        </form>
        <Link
          href={"/login"}
          className="text-red-700 font-[500] hover:cursor-pointer"
        >
          Đăng nhập
        </Link>
      </div>
    </div>
  );
}

export default Login;
