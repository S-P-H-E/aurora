"use client";
import { useEffect, useRef, useState } from "react";
import { parseAsString, useQueryState } from "nuqs";
import { LuSearch, LuX } from "react-icons/lu";
import { api } from "@/lib/orpc";
import { z } from "zod";
import { ProductsResponseSchema } from "@/lib/products";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import Image from "next/image";

type Product = z.infer<typeof ProductsResponseSchema>[number];

export default function Search() {
  const [query, setQuery] = useQueryState("q", parseAsString.withDefault(""));
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) setQuery(null);
  };

  useEffect(() => {
    if (query) setOpen(true);
  }, [query]);

  // Initial fetch when dialog opens
  useEffect(() => {
    if (open && !hasSearched) {
      api.products({ first: 6, query: query.trim() || undefined }).then((data) => {
        setProducts(data);
        setHasSearched(true);
      });
    }
  }, [open]);

  // Debounced search - waits 50ms after user stops typing
  useEffect(() => {
    if (!hasSearched) return; // Skip debounce on initial load

    // Clear any existing timeout
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const trimmedQuery = query.trim();
      api.products({ first: 6, query: trimmedQuery || undefined }).then((data) => {
        setProducts(data);
      });
    }, 50);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="cursor-pointer transition-all hover:scale-110">
          <LuSearch />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl w-screen max-h-[85vh] overflow-y-auto p-8">
        <DialogHeader className="sr-only">
          <DialogTitle>Search products</DialogTitle>
          <DialogDescription>Find items available in the store.</DialogDescription>
        </DialogHeader>

        {/* Close button */}
        <DialogClose className="absolute right-6 top-6 rounded-full p-2 hover:bg-gray-100 transition-colors">
          <LuX className="w-5 h-5" />
        </DialogClose>

        {/* Search input */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Search Products</h2>
          <div className="px-5 py-3 rounded-xl border border-[#E7E7E7] flex items-center gap-3">
            <LuSearch className="text-[#9A9A9A] w-5 h-5" />
            <input placeholder="Search for any product..." value={query} onChange={(e) => setQuery(e.target.value)} className="placeholder:text-[#9A9A9A] outline-none w-full text-lg" />
          </div>
        </div>

        {/* Results */}
        {hasSearched && !products?.length ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-[#9A9A9A] text-lg">No products found.</p>
          </div>
        ) : products?.length ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                {/* Product Image */}
                <div className="aspect-4/5 relative rounded-xl overflow-hidden bg-gray-100 mb-4">
                  {product.assets[0]?.url ? (
                    <Image src={product.assets[0].url} alt={product.assets[0].altText || product.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <LuSearch className="w-12 h-12" />
                    </div>
                  )}
                </div>
                {/* Product Info */}
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold text-lg uppercase line-clamp-1">{product.title}</h3>
                  <p className="text-sm text-[#9A9A9A] line-clamp-1">{product.description}</p>
                  <p className="text-xl font-bold mt-2">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
