"use client";
import React, { useEffect, useState } from "react";
import { ProductType } from "../../types/productType";
import { getCartItems, removerFromCard, updateCartQuantity } from "../../actions/actions";
import Swal from "sweetalert2";
import Image from "next/image";
import Support from "@/components/Support"

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<ProductType[]>([]);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removerFromCard(id);
        setCartItems(getCartItems());
        Swal.fire("Deleted!", "Your item has been removed.", "success");
      }
    });
  };

  const handleQuantity = (id: string, quantity: number) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id ? { ...item, stockLevel: quantity } : item
    );
    setCartItems(updatedCart);
    updateCartQuantity(id, quantity);
  };

  const calculatedTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.stockLevel,
      0
    );
  };

  const handleProceed = () => {
    Swal.fire({
      title: "Proceed to checkout?",
      text: "Please review your cart before proceeding.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Success!", "Your order has been processed.", "success");
      }
    });
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
        Shopping Cart
      </h1>

      {cartItems.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white shadow-md p-4 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={70}
                    height={70}
                    className="rounded-lg"
                  />
                  <div>
                    <h2 className="font-semibold text-lg">{item.name}</h2>
                    <p className="text-sm text-gray-600">
                      Rs. {item.price.toFixed(2)} x {item.stockLevel} ={" "}
                      <span className="font-bold">
                        Rs. {(item.price * item.stockLevel).toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="px-2 py-1 text-lg bg-gray-200 hover:bg-gray-300 rounded"
                    onClick={() => handleQuantity(item._id, item.stockLevel - 1)}
                    disabled={item.stockLevel <= 1}
                  >
                    -
                  </button>
                  <span className="px-3 py-1 border rounded">
                    {item.stockLevel}
                  </span>
                  <button
                    className="px-2 py-1 text-lg bg-gray-200 hover:bg-gray-300 rounded"
                    onClick={() => handleQuantity(item._id, item.stockLevel + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleRemove(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Total and Checkout */}
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
            <p className="text-lg font-medium">
              Total: Rs. {calculatedTotal().toFixed(2)}
            </p>
            <button
              className="mt-4 w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
              onClick={handleProceed}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg">Your cart is empty!</p>
          <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Continue Shopping
          </button>
        </div>
      )}
      <Support />
    </div>
  );
};


export default CartPage;
