"use client";
import { useRouter } from "next/navigation";
import { FaCirclePlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import {
  useGetAllProductsMutation,
  useRemoveProductMutation,
} from "../../../../../../redux/features/product/productApi";

type Props = {};

const Admin = (props: Props) => {
  const router = useRouter();
  const [getAllProducts] = useGetAllProductsMutation();
  const [products, setProducts] = useState([]);
  const [removeProduct] = useRemoveProductMutation();

  const fetchProducts = async () => {
    const res = await getAllProducts({}).unwrap();
    setProducts(res.products);
  };

  const getProductDetail = async (id: string) => {
    router.push(`/account/admin/product/${id}`);
  };

  const handleRemoveProduct = async (id: string) => {
    await removeProduct(id).unwrap();
    await fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex w-[85%] border-2 flex-col gap-4 p-4">
      <div className="flex w-full justify-end mr-6 mt-2">
        <button
          onClick={() => router.push("/account/admin/product/new")}
          className="flex items-center uppercase text-white bg-[#459c98] p-2 rounded-lg"
        >
          <FaCirclePlus className="mr-2" /> Tạo
        </button>
      </div>
      <div className="w-full flex flex-col gap-4 justify-center items-center">
        {products.map((product: any, index) => (
          <div key={index} className="flex gap-2 w-full">
            <div
              className="border-2 flex gap-8 p-2 rounded-lg w-full hover:cursor-pointer"
              onClick={() => getProductDetail(product._id)}
            >
              <p>{index + 1}</p>
              {product.name}
            </div>
            <button
              className="bg-red-700 p-2 text-white rounded-lg"
              onClick={() => handleRemoveProduct(product._id)}
            >
              Xóa
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
