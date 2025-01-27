"use client";


import { ProductType } from "@/app/types/productType";
import { client } from "@/sanity/lib/client";
import { TrendingProducts } from "@/sanity/lib/quries";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";



const TrendingProduct = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts: ProductType[] = await client.fetch(TrendingProducts);
      setProducts(fetchedProducts);
    }
    fetchProducts();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-8 ">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 underline">
        Ours Trending Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-gradient-to-r from-blue-400 to-purple-500 shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
          >
            <Link href={`/product/${product.slug.current}`}>
              {/* Product Image */}
              <div className="relative w-full  h-64">
                <Image
                  src={product.imageUrl || "/placeholder.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
                {product.discountPercentage > 0 && (
                  <span className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-pink-600 text-white text-sm px-2 py-1 rounded">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>
        
            {/* Product Info */}
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-white mb-2">
                {product.name.slice(0, 20)}...
              </h3>
              
             
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingProduct
