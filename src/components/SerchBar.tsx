"use client";
import React, { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";

// Define the product type
interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  discountPercentage: number;
  isFeaturedProduct: boolean;
  stockLevel: number;
  category: string;
}

const DEBOUNCE_DELAY = 300;

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      fetchProducts(query);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [query]);

  const fetchProducts = async (searchTerm: string) => {
    setLoading(true);
    setError("");

    try {
      const searchResults = await client.fetch<Product[]>(
        `*[_type == "product" && name match $query] {
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
        { query: `${searchTerm}*` as unknown as never } // ✅ Fixed parameter name
      );

      setResults(searchResults);
    } catch (error) {
      setError("An error occurred while searching. Please try again.");
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Search Form */}
      <form onSubmit={(e) => e.preventDefault()} className="relative">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full px-4 py-2 pr-10 rounded-full bg-gray-100 text-black placeholder-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          {loading ? "⌛" : "🔍"}
        </div>
      </form>

      {/* Display Results */}
      {query && (
        <div className="absolute w-full bg-white rounded-lg shadow-lg mt-2 z-10 max-h-60 overflow-auto">
          {loading ? (
            <p className="p-4 text-gray-500">Loading...</p>
          ) : error ? (
            <p className="p-4 text-red-500">{error}</p>
          ) : results.length > 0 ? (
            <ul>
              {results.map((product) => (
                <li
                  key={product._id}
                  className="flex items-center p-4 hover:bg-gray-100 border-b last:border-none cursor-pointer"
                >
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="rounded-lg"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Price: ${product.price}
                    </p>
                    <p className="text-sm text-gray-500">
                      Category: {product.category}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-4 text-gray-500">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
