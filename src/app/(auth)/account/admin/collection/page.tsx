"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  useCreateCollectionMutation,
  useGetAllCollectionsMutation,
  useRemoveCollectionMutation,
} from "../../../../../../redux/features/collection/collectionApi";

type Props = {};

const Admin = (props: Props) => {
  const router = useRouter();
  const [nameCollect, setNameCollect] = useState('');
  const [createCollection] = useCreateCollectionMutation();
  const [getAllCollections] = useGetAllCollectionsMutation();
  const [collections, setCollections] = useState([]);
  const [removeCollection] = useRemoveCollectionMutation();

  const handleCreateCollection = async (e: any) => {
    e.preventDefault();
    await createCollection({ name: nameCollect }).unwrap();
    setNameCollect('')
    await fetchCollections();
  };

  const fetchCollections = async () => {
    const res = await getAllCollections({}).unwrap();
    setCollections(res.collections);
  };

  const handleRemoveCollection = async (id: string) => {
    await removeCollection(id).unwrap();
    await fetchCollections();
  }

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <div className="w-[85%] min-h-[800px] border-2 p-8 flex flex-col gap-4">
      <form
        className="flex gap-2 justify-center"
        onSubmit={handleCreateCollection}
      >
        <input
          type="text"
          placeholder="Nhập tên bộ sưu tập"
          className="border-2 p-2 rounded-lg w-[480px]"
          onChange={(e: any) => setNameCollect(e.target.value)}
          value={nameCollect}
        />
        <button className="bg-[#459c98] p-2 text-white rounded-lg">
          Xác Nhận
        </button>
      </form>
      <div className="flex flex-col gap-2 w-full">
        {collections.map((collection: any, index) => (
          <div key={index} className="flex gap-2 w-full">
            <div className="border-2 flex gap-8 p-2 rounded-lg w-full">
              <p>{index + 1}</p>
              {collection.name}
            </div>
            <button className="bg-red-700 p-2 text-white rounded-lg" onClick={() => handleRemoveCollection(collection._id)}>Xóa</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
