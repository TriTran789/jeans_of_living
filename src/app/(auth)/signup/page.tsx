"use client";
import { RiShieldUserLine } from "react-icons/ri";
import { LuMail } from "react-icons/lu";
import { TbLock } from "react-icons/tb";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useRegisterMutation } from "../../../../redux/features/auth/authApi";

type Props = {};

const Page = (props: Props) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [register, { isSuccess }] = useRegisterMutation();

  const router = useRouter();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const res = await register(formData).unwrap();
      res.success && router.push("login");
    } catch (error: any) {
      setError(true)
    }
    
  };

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   const res = await axios
  //     .post(`${process.env.NEXT_PUBLIC_SERVER_URI}/registration`, formData)
  //     .then((res) => res.data)
  //     .catch((error) => error.response.data);
  //   if (res.success) {
  //     router.push("/login");
  //   } else {
  //     setError(true);
  //   }
  // };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="lg:w-[25%] md:w-[40%] w-[80%] mt-10 shadow-subnav p-4 flex flex-col gap-3">
        <h1 className="uppercase font-Roboto-mono text-[20px] font-[600] flex items-center">
          Đăng ký
        </h1>
        <p className={`${error ? "block" : "hidden"}`}>
          Email đã tồn tại. Nếu bạn quên mật khẩu, bạn có thể{" "}
          <Link className="font-[500] text-red-700" href={"/recover"}>
            thiết lập lại mật khẩu tại đây.
          </Link>
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
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex">
            <div className="flex items-center justify-center px-2 bg-[#eee] border-2">
              <LuMail />
            </div>
            <input
              type="email"
              placeholder="Mail"
              id="email"
              className="border-2 border-l-0 w-full pl-4 py-1 focus:outline-none font-Roboto-mono text-[16px]"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex">
            <div className="flex items-center justify-center px-2 bg-[#eee] border-2">
              <TbLock />
            </div>
            <input
              type="password"
              placeholder="Mật khẩu"
              id="password"
              className="border-2 border-l-0 w-full pl-4 py-1 focus:outline-none font-Roboto-mono text-[16px]"
              onChange={handleChange}
              minLength={6}
              required
            />
          </div>

          <button className="uppercase bg-[#ba2e34] text-[16px] py-1 hover:text-white">
            đăng ký
          </button>
        </form>
        <p>Bạn đã có tài khoản? <Link href={'/login'} className="text-red-700 font-[500]"> Đăng nhập</Link></p>
      </div>
    </div>
  );
};

export default Page;
