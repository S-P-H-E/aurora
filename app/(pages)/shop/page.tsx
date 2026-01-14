"use client"
import { api } from "@/lib/orpc";
import { useCartStore } from "@/lib/zustand/useCartStore";
// import { Metadata } from "next";
import Image from 'next/image';

// export const metadata: Metadata = {
//   title: 'Shop',
// };

export default function Shop() {
  // const data = await api.products();
  const { bears, addABear } = useCartStore();

  return (
    <div className='flex gap-6 h-dvh items-center justify-center'>
      <button onClick={() => addABear()}>
        Add a Bear
      </button>
      <h1>{bears}</h1>
      {/*{data && data.length > 0 ? (
        data.map(d => (
          <div key={d.id} className='w-xs h-105 border border-black shadow-2xl cursor-pointer transition-all duration-500 hover:scale-105 p-4 rounded-2xl flex flex-col gap-2'>
            <Image src={d.assets[0].url} className='rounded-xl w-full h-65 object-cover' alt="Image" width={400} height={0} />
            <h1 className='font-semibold text-3xl'>{d.title}</h1>
            <p>{d.description}</p>
            <p className='font-semibold'>{d.price}</p>
          </div>
        ))
      ) : (
        <p>Data not found.</p>
      )}*/}
    </div>
  );
}