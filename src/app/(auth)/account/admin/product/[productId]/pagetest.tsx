"use client";
import { useEffect } from "react";
import { useGetProductDetailMutation } from "../../../../../../../redux/features/product/productApi";
import useStateRef from "react-usestateref";

const ProductDetail = ({ params }: { params: { productId: string } }) => {
  const [getProductDetail] = useGetProductDetailMutation();
  const [productDetail, setProductDetail, productDetailRef] = useStateRef({
    name: "",
    description: "",
    price: "",
    discountedPrice: "",
    media: [],
    tag: [],
    size: [],
    color: [],
  });

  const handleChange = (e: any) => {
    setProductDetail({ ...productDetail, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(productDetailRef.current)
  }

  const fetchProductDetail = async () => {
    const res = await getProductDetail(params.productId).unwrap();
    setProductDetail(res.productDetail as any);
  };

  useEffect(() => {
    fetchProductDetail();
  }, []);

  return (
    <form
      className="w-[85%] border-2 flex flex-col p-8 gap-2"
      onSubmit={handleSubmit}
    >
      <label>Tên sản phẩm</label>
      <input
        type="text"
        required
        className="border-2"
        id="name"
        defaultValue={productDetail.name}
        onChange={handleChange}
      />
      <label>Mô tả</label>
      <textarea
        name=""
        id=""
        cols={10}
        rows={10}
        className="border-2"
        defaultValue={productDetail.description}
        // onChange={(e: any) =>
        //   setProductData({ ...productData, description: e.target.value })
        // }
      />
      <label>Hình ảnh</label>
      {/* <div className="w-full min-h-[40px] bg-slate-100 flex flex-wrap gap-4 p-4">
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
      </div> */}
      <input
        type="file"
        // ref={fileInputRef}
        multiple
        className="hidden"
        // onChange={handleChangeImage}
      />
      <button
        // onClick={() => fileInputRef.current?.click()}
        type="button"
        className="flex items-center gap-1 bg-red-700 justify-start w-[100px] p-2 rounded-lg hover:text-white"
      >
        {/* <FaCirclePlus /> */}
        Hình ảnh
      </button>
      <div className="flex flex-row">
        <div className="flex flex-col flex-1">
          <label>Giá gốc</label>
          <input
            type="number"
            className="border-2 w-[50%]"
            id="price"
            defaultValue={productDetail.price}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col flex-1">
          <label>Giá đã giảm</label>
          <input
            type="number"
            className="border-2 w-[50%]"
            id="discountedPrice"
            defaultValue={productDetail.discountedPrice}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col flex-1">
          <label>Kích thước</label>
          <input
            type="text"
            className="border-2 w-[50%]"
            id="size"
            defaultValue={productDetail.size}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col flex-1">
          <label>Màu</label>
          <input
            type="text"
            className="border-2 w-[50%]"
            id="color"
            defaultValue={productDetail.color}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col flex-1">
          <label>Loại</label>
          <input
            type="text"
            className="border-2 w-[50%]"
            id="tag"
            defaultValue={productDetail.tag}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col flex-1">
          <label>Bộ sưu tập</label>
          <input
            type="text"
            className="border-2 w-[50%]"
            id="collection"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="">
        <button className="flex items-center uppercase hover:text-white bg-red-700 p-2 rounded-lg">
          Thêm sản phẩm
        </button>
      </div>
    </form>
  );
};

export default ProductDetail;
