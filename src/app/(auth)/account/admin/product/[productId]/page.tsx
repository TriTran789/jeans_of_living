"use client";
import React, { useEffect, useRef, useState } from "react";
import { brandList, colorList, sizeList } from "@/constants";
import {
  useEditProductDetailMutation,
  useGetProductDetailMutation,
} from "../../../../../../../redux/features/product/productApi";
import { useGetAllCollectionsMutation } from "../../../../../../../redux/features/collection/collectionApi";
import { IoCloseCircle } from "react-icons/io5";
import { FaCirclePlus } from "react-icons/fa6";
import Image from "next/image";
import { convertBase64 } from "@/utils/convertBase64";
import { useRouter } from "next/navigation";
import useStateRef from "react-usestateref";

type Props = {};

const ProductDetail = ({ params }: { params: { productId: string } }) => {
  const initProductDetail: any = {};
  const [productDetail, setProductDetail] = useState(initProductDetail);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState([]);
  const initOldImages: any = [];
  const [oldImages, setOldImages] = useState(initOldImages);
  const [listBrand, setListBrand] = useState(false);
  const [brand, setBrand] = useState("");
  const [collection, setCollection] = useState("");
  const [listCollection, setListCollection] = useState(false);
  const [collections, setCollections] = useState([]);
  const [colors, setColors, colorsRef] = useStateRef<any[]>([]);
  const [getAllCollections] = useGetAllCollectionsMutation();
  const [getProductDetail] = useGetProductDetailMutation();
  const [removedImages, setRemovedImages] = useState<any[]>([]);
  const [editProductDetail] = useEditProductDetailMutation();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newImages: string[] = [];
    for (var i = 0; i < images.length; i++) {
      const base64 = (await convertBase64(images[i])) as string;
      newImages.push(base64);
    }
    // console.log({
    //   productDetail: { ...productDetail, colors: colorsRef.current },
    //   oldImages,
    //   newImages,
    //   removedImages,
    // });
    const res = await editProductDetail({
      productDetail: { ...productDetail, colors: colorsRef.current },
      oldImages,
      newImages,
      removedImages,
    }).unwrap();
    if (res.success === true) {
      router.push("/account/admin/product");
    }
  };

  const fetchProductDetail = async () => {
    const res = await getProductDetail(params.productId).unwrap();
    setProductDetail(res.productDetail);
    setOldImages(res.productDetail.media);
    setColors(res.productDetail.colors);
  };

  const fetchCollections = async () => {
    const res = await getAllCollections({}).unwrap();
    setCollections(res.collections);
  };

  const getQuantity = (color: string, size: number): number => {
    var quantity: number = 0;
    colors.map((itemColor: any, indexColor: number) => {
      if (itemColor.color === color) {
        itemColor.sizes.map((itemSize: any, indexSize: number) => {
          if (itemSize.size === size) {
            quantity = itemSize.quantity as number;
          }
        });
      }
    });
    return quantity;
  };

  const handleQuantity = (e: any, color: string, size: number) => {
    var colorExist: boolean = false;
    var sizeExist: boolean = false;
    if (colors.length === 0) {
      setColors([
        { color, sizes: [{ size, quantity: Number(e.target.value) }] },
      ]);
      return;
    }
    colors.map((itemColor: any, indexColor: number) => {
      if (itemColor.color === color) {
        colorExist = true;
        itemColor.sizes.map((itemSize: any, indexSize: number) => {
          if (itemSize.size === size) {
            sizeExist = true;
            var tempSize = { ...itemSize, quantity: Number(e.target.value) };
            var oldSizes = itemColor.sizes;
            const halfBefore = oldSizes.slice(0, indexSize);
            const halfAfter = oldSizes.slice(indexSize + 1, oldSizes.length);
            const newSizes = halfBefore.concat(halfAfter);
            newSizes.push(tempSize);
            const tempColor = { ...itemColor, sizes: newSizes };
            const halfBeforeColors = colors.slice(0, indexColor);
            const halfAfterColors = colors.slice(indexColor + 1, colors.length);
            const newColors = halfBeforeColors.concat(halfAfterColors);
            newColors.push(tempColor);
            setColors(newColors);
          }
        });
        if (!sizeExist) {
          const newSizes = [
            ...itemColor.sizes,
            { size, quantity: Number(e.target.value) },
          ];
          const tempColor = { ...itemColor, sizes: newSizes };
          const halfBeforeColors = colors.slice(0, indexColor);
          const halfAfterColors = colors.slice(indexColor + 1, colors.length);
          const newColors = halfBeforeColors.concat(halfAfterColors);
          newColors.push(tempColor);
          setColors(newColors);
        }
      }
    });
    if (!colorExist) {
      setColors([
        ...colors,
        { color, sizes: [{ size, quantity: Number(e.target.value) }] },
      ]);
    }
  };

  const handleRemoveImage = (index: any) => {
    const halfBefore = images.slice(0, index);
    const halfAfter = images.slice(index + 1, images.length);
    const newArray = halfBefore.concat(halfAfter);
    setImages(newArray);
  };

  const handleRemoveOldImage = (index: any) => {
    const halfBefore = oldImages.slice(0, index);
    const halfAfter = oldImages.slice(index + 1, oldImages.length);
    const newArray = halfBefore.concat(halfAfter);
    setOldImages(newArray);
    setRemovedImages([...removedImages, oldImages[index]]);
  };

  const handleChangeImage = (e: any) => {
    setImages((exist) => [...exist, ...(e.target.files as never)]);
  };

  const handleChange = (e: any) => {
    setProductDetail({ ...productDetail, [e.target.id]: e.target.value });
  };

  const selectBrand = (brand: string) => {
    setProductDetail({ ...productDetail, brand });
    setBrand(brand);
    setListBrand((pre) => !pre);
  };

  const selectCollection = (collectName: string) => {
    setProductDetail({ ...productDetail, collect: collectName });
    setCollection(collectName);
    setListCollection((pre) => !pre);
  };

  useEffect(() => {
    fetchProductDetail();
    fetchCollections();
  }, []);

  return (
    <form
      className="border-2 w-[85%] flex flex-col p-8 gap-2"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-row">
        <div className="w-[50%] flex flex-col gap-2 pr-8">
          <label>Tên sản phẩm</label>
          <input
            type="text"
            required
            id="name"
            className="border-2 w-full"
            defaultValue={productDetail.name}
            onChange={handleChange}
          />
        </div>
        <div className="w-[25%] flex flex-col gap-2">
          <label className="">Thương hiệu</label>
          <div className="flex relative">
            <div
              className="border-black border-2 rounded-lg p-2 hover:cursor-pointer"
              onClick={() => setListBrand(true)}
            >
              {brand === "" ? productDetail.brand : brand}
            </div>
            <ul
              className={`border-2 border-black rounded-lg absolute top-0 bg-white ${
                listBrand ? "block" : "hidden"
              }`}
            >
              {brandList.map((brand, index) => (
                <li
                  key={index}
                  className="hover:bg-slate-300 p-2 rounded-lg"
                  onClick={() => selectBrand(brand)}
                >
                  {brand}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-[25%] flex flex-col gap-2">
          <label>Bộ sưu tập</label>
          <div className="flex relative">
            <div
              className="border-black border-2 rounded-lg p-2 hover:cursor-pointer"
              onClick={() => setListCollection(true)}
            >
              {collection === "" ? productDetail.collect : collection}
            </div>
            <ul
              className={`border-2 border-black rounded-lg absolute top-0 bg-white ${
                listCollection ? "block" : "hidden"
              }`}
            >
              {collections.map((collect: any, index) => (
                <li
                  key={index}
                  className="hover:bg-slate-300 p-2 rounded-lg"
                  onClick={() => selectCollection(collect.name)}
                >
                  {collect.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <label>Mô tả</label>
      <textarea
        name=""
        id="description"
        cols={10}
        rows={10}
        required
        className="border-2"
        defaultValue={productDetail.description}
        onChange={handleChange}
      />
      <label>Hình ảnh</label>
      <div className="w-full min-h-[40px] bg-slate-100 flex flex-wrap gap-4 p-4">
        {oldImages.map((image: any, index: number) => {
          return (
            <div key={index} className="relative">
              <IoCloseCircle
                className="absolute right-2 top-2 text-[18px] hover:text-red-700 cursor-pointer hover:scale-150"
                onClick={() => handleRemoveOldImage(index)}
              />
              <img src={image.url} width={400} />
            </div>
          );
        })}
        {images.map((item, index) => (
          <div key={index} className="relative">
            <IoCloseCircle
              className="absolute right-2 top-2 text-[18px] hover:text-red-700 cursor-pointer hover:scale-150"
              onClick={() => handleRemoveImage(index)}
            />
            <Image
              style={{
                width: "400px",
                height: "auto",
              }}
              width={0}
              height={0}
              alt=""
              src={URL.createObjectURL(item)}
            />
          </div>
        ))}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        multiple
        className="hidden"
        onChange={handleChangeImage}
      />
      <button
        type="button"
        className="flex items-center gap-1 bg-red-700 justify-start w-[100px] p-2 rounded-lg text-white hover:bg-red-500"
        onClick={() => fileInputRef.current?.click()}
      >
        <FaCirclePlus />
        Hình ảnh
      </button>
      <div className="flex gap-8">
        <div className="flex flex-col flex-1">
          <label>Giá</label>
          <input
            type="number"
            required
            id="price"
            onChange={handleChange}
            defaultValue={productDetail.price}
            className="border-2 w-[400px]"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label>Giá đã giảm</label>
          <input
            type="number"
            id="discountedPrice"
            onChange={handleChange}
            defaultValue={productDetail.discountedPrice}
            className="border-2 w-[400px]"
          />
        </div>
      </div>
      <label>Tồn kho</label>
      {colorList.map((color, index) => (
        <div key={index} className="w-full">
          <h3 className="font-bold">{color}</h3>
          <div className="flex">
            {sizeList.map((size, index) => (
              <div key={index}>
                <p>size {size}</p>
                <div>
                  <p>Số lượng</p>
                  <input
                    type="number"
                    className="border-2 w-[80%]"
                    value={getQuantity(color, size)}
                    onChange={(e: any) => handleQuantity(e, color, size)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="mt-2">
        <button className="bg-red-700 p-2 rounded-lg text-white uppercase hover:bg-red-500">
          cập nhật
        </button>
      </div>
    </form>
  );
};

export default ProductDetail;
