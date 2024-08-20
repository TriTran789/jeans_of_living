"use client";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div className={`${user.role === "admin" ? "flex" : "hidden"} m-4 justify-between`}>
      <div>
        <ul className="flex border-2 gap-4 flex-col p-4 w-[12%] fixed">
          <li
            className="hover:text-red-700 cursor-pointer"
            onClick={() => router.push("/account/admin/dashboard")}
          >
            Bảng điều khiển
          </li>
          <li
            className="hover:text-red-700 cursor-pointer"
            onClick={() => router.push("/account/admin/collection")}
          >
            Bộ sưu tập
          </li>
          <li
            className="hover:text-red-700 cursor-pointer"
            onClick={() => router.push("/account/admin/product")}
          >
            Sản phẩm
          </li>
          <li
            className="hover:text-red-700 cursor-pointer"
            onClick={() => router.push("/account/admin/order")}
          >
            Đơn hàng
          </li>
          <li
            className="hover:text-red-700 cursor-pointer"
            onClick={() => router.push("/account/admin/customer")}
          >
            Khách hàng
          </li>
        </ul>
      </div>
      {children}
    </div>
  );
}
