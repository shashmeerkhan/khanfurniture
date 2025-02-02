"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getCartItems } from "@/app/actions/actions";
import { ProductType } from "@/app/types/productType";
import Swal from "sweetalert2";
import { client } from "@/sanity/lib/client";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<ProductType[]>([]);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    zipCode: "",
    phone: "",
    address: "",
    city: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchCartData = async () => {
      const items = await getCartItems();
      setCartItems(items || []);
    };
    fetchCartData();
  }, []);

  // Calculate subtotal and total using stockLevel (or quantity) from each item
  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * (item.stockLevel || 1),
    0
  );
  const calculatedDiscount = cartItems.reduce(
    (total, item) =>
      total +
      (item.price * (item.stockLevel || 1) * (item.discountPercentage || 0)) / 100,
    0
  );
  // Total after discount as a number
  const totalAfterDiscount = subTotal - calculatedDiscount;
  const total = totalAfterDiscount.toFixed(2);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {
      firstName: formValues.firstName.trim() === "",
      lastName: formValues.lastName.trim() === "",
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email),
      zipCode: !/^\d{5}$/.test(formValues.zipCode),
      phone: !/^\d{10}$/.test(formValues.phone),
      address: formValues.address.trim() === "",
      city: formValues.city.trim() === "",
    };
    setFormErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  // Handle form submission and place order
  const handlePlaceOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form before proceeding
    if (!validateForm()) {
      Swal.fire("Error", "Please correct the errors in the form.", "error");
      return;
    }

    const orderData = {
      _type: "order",
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      address: formValues.address,
      zipCode: formValues.zipCode,
      phone: formValues.phone,
      city: formValues.city,
      cartItems: cartItems.map((item) => ({
        _type: "reference",
        _ref: item._id,
      })),
      total: totalAfterDiscount, // total as a number
      discount: calculatedDiscount,
      orderDate: new Date().toISOString(),
    };

    try {
      await client.create(orderData);
      // Optionally clear cart or local storage here
      localStorage.removeItem("appliedDiscount");
      Swal.fire("Success!", "Your order has been processed.", "success");
      router.push("/checkout");
    } catch (error) {
      console.error("Error creating order", error);
      Swal.fire("Error", "There was an error processing your order.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cart Section */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h2>
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between mb-4 border-b pb-4"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={item.imageUrl || "/default-image.jpg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-lg"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-700">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          <span className="text-gray-800">
                            Original Price: Rs. {item.price.toFixed(2)}
                            {item.discountPercentage && (
                              <span className="text-green-600">
                                {" "}
                                ({item.discountPercentage}% off)
                              </span>
                            )}
                          </span>{" "}
                          <span className="text-gray-800 text-sm">
                            Discounted Price: Rs.{" "}
                            {(item.price *
                              (1 - (item.discountPercentage || 0) / 100)).toFixed(
                              2
                            )}
                          </span>{" "}
                          <span className="text-gray-800 text-xs">
                            Savings: Rs.{" "}
                            {(
                              item.price -
                              item.price * (1 - (item.discountPercentage || 0) / 100)
                            ).toFixed(2)}
                          </span>
                        </p>
                      </div>
                    </div>
                    <p className="font-bold text-gray-800">
                      Rs. {(item.price * (item.stockLevel || 1)).toFixed(2)}
                    </p>
                  </div>
                ))}
                <div className="mt-4 space-y-2">
                  <p className="text-lg font-semibold">
                    Subtotal:{" "}
                    <span className="text-green-600">
                      Rs. {subTotal.toFixed(2)}
                    </span>
                  </p>
                  <p className="text-lg font-semibold">
                    Discount:{" "}
                    <span className="text-red-600">
                      Rs. {calculatedDiscount.toFixed(2)}
                    </span>
                  </p>
                  <p className="text-xl font-bold">
                    Total: <span className="text-blue-600">Rs. {total}</span>
                  </p>
                </div>
              </>
            ) : (
              <p className="text-gray-500">Your cart is empty.</p>
            )}
          </div>

          {/* Checkout Form Section */}
          <div className="p-6 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Checkout</h2>
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              {Object.keys(formValues).map((field, index) => (
                <div key={index} className="flex flex-col">
                  <label
                    htmlFor={field}
                    className="text-sm font-medium capitalize text-gray-700"
                  >
                    {field.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    id={field}
                    value={formValues[field as keyof typeof formValues]}
                    onChange={handleInputChange}
                    className={`p-3 mt-1 rounded-lg border focus:outline-none ${
                      formErrors[field] ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder={`Enter ${field}`}
                  />
                  {formErrors[field] && (
                    <p className="text-red-500 text-xs mt-1">
                      Please enter a valid {field}.
                    </p>
                  )}
                </div>
              ))}
              <button
                type="submit"
                className="w-full py-3 font-bold text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transform transition-transform duration-300"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
