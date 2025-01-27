"use client";

import React, { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image";
import Swal from "sweetalert2";
import { addToCart } from "@/app/actions/actions";
import { ProductType } from "@/app/types/productType";
import { useParams } from "next/navigation";

// Function to fetch product data by slug
async function getProduct(slug: string): Promise<ProductType | null> {
  return client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0]{
      _id,
      name,
      "imageUrl": image.asset->url,
      price,
      description,
      discountPercentage,
      isFeaturedProduct,
      stockLevel,
      category
    }`,
    { slug }
  );
}

// Product Page Component
const ProductPage: React.FC = () => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);

  // Using Next.js's `useParams` hook to access the dynamic route
  const params = useParams();
  const slug = params?.slug as string;

  useEffect(() => {
    if (slug) {
      getProduct(slug)
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching product:", err);
          setLoading(false);
        });
    }
  }, [slug]);

  // Add to cart handler
  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      Swal.fire({
        position: "top-right",
        icon: "success",
        title: `${product.name} added to cart`,
        showConfirmButton: false,
        timer: 1800,
      });
    }
  };

  // Loading State
  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  // No Product Found
  if (!product) {
    return (
      <div className="text-center mt-10 text-red-600">
        Product not found!
      </div>
    );
  }

  // Render Product Page
  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Product Image */}
        <div className="relative w-full h-96">
          <Image
            src={product.imageUrl || "/placeholder.jpg"}
            alt={product.name}
            height={400}
            width={400}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-lg text-gray-600">{product.description}</p>
          <p className="text-md text-gray-500">Category: {product.category}</p>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-blue-600">
              Rs. {product.price.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm font-bold">
                {product.discountPercentage}% off
              </span>
            )}
          </div>
          <p className="text-sm">
            Stock:{" "}
            <span
              className={`font-bold ${
                product.stockLevel > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.stockLevel > 0
                ? `${product.stockLevel} available`
                : "Out of stock"}
            </span>
          </p>

          <button
            onClick={handleAddToCart}
            disabled={product.stockLevel === 0}
            className={`mt-4 px-6 py-3 rounded-lg text-white text-lg font-medium ${
              product.stockLevel > 0
                ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105"
                : "bg-gray-400 cursor-not-allowed"
            } transition-transform duration-200`}
          >
            {product.stockLevel > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
