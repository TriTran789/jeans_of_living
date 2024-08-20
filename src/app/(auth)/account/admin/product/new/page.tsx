"use client";
import { brandList, colorList, sizeList } from "@/constants";
import { useEffect, useRef, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import Image from "next/image";
import { IoCloseCircle } from "react-icons/io5";
import { useGetAllCollectionsMutation } from "../../../../../../../redux/features/collection/collectionApi";
import useStateRef from "react-usestateref";
import { convertBase64 } from "@/utils/convertBase64";
import { useCreateProductMutation } from "../../../../../../../redux/features/product/productApi";
import { useRouter } from "next/navigation";

const NewProduct = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [brand, setBrand] = useState("Chọn");
  const [listBrand, setListBrand] = useState(false);
  const [collection, setCollection] = useState("Chọn");
  const [listCollection, setListCollection] = useState(false);
  const [images, setImages] = useState([]);
  const [getAllCollections] = useGetAllCollectionsMutation();
  const [createProduct] = useCreateProductMutation();
  const [collections, setCollections] = useState([]);
  const initProductData: any = {};
  const [productData, setProductData, productDataRef] =
    useStateRef(initProductData);
  const initColors: any[] = [];
  const [colors, setColors, colorsRef] = useStateRef(initColors);
  const router = useRouter();

  const selectBrand = (brand: string) => {
    setBrand(brand);
    setListBrand((pre) => !pre);
  };

  const selectCollection = (collectName: string) => {
    setCollection(collectName);
    setListCollection((pre) => !pre);
  };

  const handleRemoveImage = (index: any) => {
    const halfBefore = images.slice(0, index);
    const halfAfter = images.slice(index + 1, images.length);
    const newArray = halfBefore.concat(halfAfter);
    setImages(newArray);
  };

  const handleChangeImage = (e: any) => {
    setImages((exist) => [...exist, ...(e.target.files as never)]);
  };

  const fetchCollections = async () => {
    const res = await getAllCollections({}).unwrap();
    setCollections(res.collections);
  };

  const handleChange = (e: any) => {
    setProductData({ ...productData, [e.target.id]: e.target.value });
  };

  const handleQuantity = (e: any, color: string, size: number) => {
    var colorExist: boolean = false;
    var sizeExist: boolean = false;
    if (colors.length === 0) {
      setColors([
        { color, sizes: [{ size, quantity: Number(e.target.value) }] },
      ]);
      console.log(colorsRef.current);
      return;
    }
    colorsRef.current.map((itemColor: any, indexColor: number) => {
      if (itemColor.color === color) {
        colorExist = true;
        itemColor.sizes.map((itemSize: any, indexSize: number) => {
          if (itemSize.size === size) {
            sizeExist = true;
            itemSize.quantity = Number(e.target.value);
          }
        });
        if (!sizeExist) {
          itemColor.sizes.push({ size, quantity: Number(e.target.value) });
        }
      }
    });
    if (!colorExist) {
      setColors([
        ...colorsRef.current,
        { color, sizes: [{ size, quantity: Number(e.target.value) }] },
      ]);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const media: string[] = [];
    for (var i = 0; i < images.length; i++) {
      const base64 = (await convertBase64(images[i])) as string;
      media.push(base64);
    }
    setProductData({
      ...productData,
      brand,
      collect: collection,
      media,
      colors: colorsRef.current,
    });
    const res = await createProduct(productDataRef.current).unwrap();
    if (res.success === true) router.push("/account/admin/product");
  };

  useEffect(() => {
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
              {brand}
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
              {collection}
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
        onChange={handleChange}
      />
      <label>Hình ảnh</label>
      <div className="w-full min-h-[40px] bg-slate-100 flex flex-wrap gap-4 p-4">
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
            className="border-2 w-[400px]"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label>Giá đã giảm</label>
          <input
            type="number"
            id="discountedPrice"
            onChange={handleChange}
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
                    onChange={(e: any) => handleQuantity(e, color, size)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="mt-2">
        <button className="bg-red-700 p-2 rounded-lg text-white hover:bg-red-500">
          Thêm Sản Phẩm
        </button>
      </div>
    </form>
  );
};

export default NewProduct;
