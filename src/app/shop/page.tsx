"use client";
import { brandList, colorList, sizeList } from "@/constants";
import React, { useEffect, useState } from "react";
import { useGetAllProductsMutation } from "../../../redux/features/product/productApi";
import { useRouter } from "next/navigation";

type Props = {};

const Shop = (props: Props) => {
  const [products, setProducts] = useState([]);
  const [getAllProducts] = useGetAllProductsMutation();
  const router = useRouter();

  const fetchProducts = async () => {
    const res = await getAllProducts({}).unwrap();
    setProducts(res.products);
  };

  const getProductDetail = async (id: string) => {
    router.push(`/shop/${id}`);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full py-16 px-16 flex gap-16 max-md:flex-col">
      <div className="bg-red w-[30%] bg-slate-100 p-8 max-md:w-full">
        <div>
          <h1 className="font-[700] text-[18px] font-Roboto-mono">
            Thương Hiệu
          </h1>
          {brandList.map((item, index) => (
            <div key={index} className="flex px-4">
              <input type="checkbox" />
              <p className="ml-2 text-[16px]">{item}</p>
            </div>
          ))}

          <h1 className="font-[700] text-[18px] font-Roboto-mono mt-2">
            Màu Sắc
          </h1>
          {colorList.map((item, index) => (
            <div key={index} className="flex px-4">
              <input type="checkbox" />
              <p className="ml-2 text-[16px]">{item}</p>
            </div>
          ))}

          <h1 className="font-[700] text-[18px] font-Roboto-mono mt-2">
            Kích Thước
          </h1>
          {sizeList.map((item, index) => (
            <div key={index} className="flex px-4">
              <input type="checkbox" />
              <p className="ml-2 text-[16px]">{item}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-red w-full flex p-8 flex-wrap gap-x-16 gap-y-8">
        {products.map((product, index) => (
          <div
            key={index}
            className="flex flex-col w-[240px] rounded-lg shadow-2xl hover:drop-shadow-2xl hover:cursor-pointer"
            onClick={() => getProductDetail(product._id)}
          >
            <img src={product.media[0].url} alt="" />
            <div className="border-2 px-4 py-2 border-t-0">
              <p>{product?.name}</p>
              <p>{product?.brand}</p>
            </div>
            <div className="border-2 border-t-0 flex justify-between px-4 py-2">
              <p>{product?.price}</p>
              <p className="text-red-600">{`${
                product?.discountedPrice ? product?.discountedPrice : ""
              }`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
