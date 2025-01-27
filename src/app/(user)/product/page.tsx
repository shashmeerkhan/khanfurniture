"use client";

import { addToCart } from "@/app/actions/actions";
import { ProductType } from "@/app/types/productType";
import { client } from "@/sanity/lib/client";
import { allProducts } from "@/sanity/lib/quries";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Products = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts: ProductType[] = await client.fetch(allProducts);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const truncate = (text: string, length: number) =>
    text.length > length ? `${text.slice(0, length)}...` : text;

  const getImageUrl = (url: string | undefined) => url || "/placeholder.jpg";

  const handleAddToCart = (event: React.MouseEvent, product: ProductType) => {
    event.preventDefault();

    addToCart(product);
    Swal.fire({
      position: "top-right",
      icon: "success",
      title: `${product.name} added to cart!`,
      showConfirmButton: false,
      timer: 1800,
    });
  };

  const btnBaseClass = "mt-4 w-full px-4 py-2 rounded-lg transition-transform duration-200";
  const activeClass = "bg-gradient-to-r from-yellow-400 to-pink-600 text-white text-sm hover:scale-105";
  const disabledClass = "bg-gray-400 text-gray-800 cursor-not-allowed";

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Explore Our Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 bg-gradient-to-r from-blue-400 to-purple-500"
          >
            <Link href={`/product/${product.slug.current}`}>
              <div className="relative w-full h-64">
                <Image
                  src={getImageUrl(product.imageUrl)}
                  alt={`Image of ${product.name}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
                {product.discountPercentage > 0 && (
                  <span className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-pink-600 text-white text-sm px-2 py-1 rounded-full">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>
            </Link>
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold text-gray-800 truncate">
                {product.name}
              </h3>
              <p className="mt-2 text-sm text-gray-600 truncate">
                {truncate(product.description, 50)}
              </p>
              <p className="text-gray-800 font-bold text-lg mt-4">
                Rs. {product.price.toFixed(2)}
              </p>
              {product.stockLevel > 0 ? (
                <p className="text-green-600 text-sm mt-1">
                  {product.stockLevel} in stock
                </p>
              ) : (
                <p className="text-red-600 text-sm mt-1">Out of stock</p>
              )}
              <button
                onClick={(event) => handleAddToCart(event, product)}
                disabled={product.stockLevel === 0}
                className={`${btnBaseClass} ${product.stockLevel > 0 ? activeClass : disabledClass}`}
              >
                {product.stockLevel > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
