"use client"
import { useEffect, useState } from "react";
import { api } from "@/lib/orpc";
import { useCartStore } from "@/lib/zustand/useCartStore";
import Image from 'next/image';
import { z } from "zod";
import { ProductsResponseSchema } from "@/lib/products";

type Product = z.infer<typeof ProductsResponseSchema>[number];

export default function Shop() {
  const { items, addItem } = useCartStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.products().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className='min-h-dvh p-6'>
        <ShopSkeleton />
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className='min-h-dvh p-6'>
        <p>No products found.</p>
      </div>
    );
  }

  return (
    <div className='min-h-dvh p-6'>
      <div className='flex flex-wrap gap-6 items-start justify-center'>
        {products.map(d => (
          <div key={d.id} className='w-xs h-105 border border-black shadow-2xl cursor-pointer transition-all duration-500 hover:scale-105 p-4 rounded-2xl flex flex-col gap-2'>
            <Image src={d.assets[0]?.url} className='rounded-xl w-full h-65 object-cover' alt={d.assets[0]?.altText || d.title} width={400} height={0} />
            <h1 className='font-semibold text-3xl'>{d.title}</h1>
            <p>{d.description}</p>
            <p className='font-semibold'>{d.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShopSkeleton() {
  return (
    <div className='flex flex-wrap gap-6 items-start justify-center'>
      {[...Array(6)].map((_, i) => (
        <div key={i} className='w-xs h-105 border border-black/10 p-4 rounded-2xl flex flex-col gap-2 animate-pulse'>
          <div className='rounded-xl w-full h-65 bg-gray-200' />
          <div className='h-8 bg-gray-200 rounded w-3/4' />
          <div className='h-4 bg-gray-200 rounded w-full' />
          <div className='h-4 bg-gray-200 rounded w-1/4' />
        </div>
      ))}
    </div>
  );
}