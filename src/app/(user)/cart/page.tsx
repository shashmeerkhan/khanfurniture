"use client";
import React, { useEffect, useState } from "react";
import { ProductType } from "../../types/productType";
import { getCartItems, removerFromCard, updateCartQuantity } from "../../actions/actions";
import Swal from "sweetalert2";
import Image from "next/image";
import Support from "@/components/Support";
import { useRouter } from "next/navigation";

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<ProductType[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCart = async () => {
      const items = await getCartItems();
      setCartItems(items || []);
    };
    fetchCart();
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
        setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
        Swal.fire("Deleted!", "Your item has been removed.", "success");
      }
    });
  };

  const handleQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    updateCartQuantity(id, quantity);
    setCartItems((prevItems) =>
      prevItems.map((item) => (item._id === id ? { ...item, stockLevel: quantity } : item))
    );
  };

  const subTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.stockLevel, 0);
  };

  const discount = () => {
    return cartItems.reduce(
      (total, item) => total + (item.price * item.stockLevel * (item.discountPercentage || 0)) / 100,
      0
    );
  };

  const totalAfterDiscount = () => {
    return subTotal() - discount();
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
        router.push("/checkout");
      }
    });
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center text-gray-800">
        Shopping Cart
      </h1>
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-center justify-between bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                  <div>
                    <h2 className="font-semibold text-lg text-gray-800">{item.name}</h2>
                    <p className="text-sm text-gray-600">
                      <span className="text-gray-800">
                        Original Price: Rs. {item.price.toFixed(2)}
                        <span className="text-green-600"> ({(item.discountPercentage)}% off)</span>
                      </span>{" "}
                      <span className="text-gray-800 text-sm">
                        Discounted Price: Rs. {(item.price * (1 - item.discountPercentage / 100)).toFixed(2)}
                      </span>{" "}
                      <span className="text-gray-800 text-xs">
                        Savings: Rs. {(item.price - item.price * (1 - item.discountPercentage / 100)).toFixed(2)}
                      </span>{" "}
                    </p>
                  </div>
                </div>
                {/* Quantity Controls */}
                <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                  <button
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded transition-colors duration-200"
                    onClick={() => handleQuantity(item._id, item.stockLevel - 1)}
                    disabled={item.stockLevel <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border rounded text-center">{item.stockLevel}</span>
                  <button
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded transition-colors duration-200"
                    onClick={() => handleQuantity(item._id, item.stockLevel + 1)}
                  >
                    +
                  </button>
                </div>
                {/* Remove Button */}
                <button
                  className="text-red-500 hover:text-red-700 mt-2 sm:mt-0 transition-colors duration-200"
                  onClick={() => handleRemove(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Cart Summary</h2>
            <div className="space-y-3">
              <p className="text-lg font-medium text-gray-700">SubTotal: Rs. {subTotal().toFixed(2)}</p>
              <p className="text-lg font-medium text-gray-700">Discount: Rs. {discount().toFixed(2)}</p>
              <p className="text-lg font-bold text-gray-900">Total: Rs. {totalAfterDiscount().toFixed(2)}</p>
            </div>
            <button
              className="mt-6 w-full text-white rounded-lg font-bold px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition-transform duration-300"
              onClick={handleProceed}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg">Your cart is empty!</p>
          <button
            onClick={() => router.push("/shop")}
            className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:scale-105 transition-transform duration-300"
          >
            Continue Shopping
          </button>
        </div>
      )}
      <Support />
    </div>
  );
};

export default CartPage;