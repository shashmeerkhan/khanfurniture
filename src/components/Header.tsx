"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SerchBar"; // Import your SearchBar component
import logo from "../../public/WhatsApp_Image_2025-01-26_at_06.05.59_a09059da-removebg-preview.png";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white w-full shadow-lg z-10 sticky top-0">
        {/* Main Navigation */}
        <div className="flex justify-between items-center py-4 px-6 md:px-12">
          {/* Logo */}
          <div className="text-3xl font-bold flex items-center space-x-2">
            <Image src={logo} alt="Logo" width={45} height={50} />
            <span className="text-xl">Khan Furniture</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 text-lg font-semibold">
            <Link href="/" className="hover:scale-110 duration-300">Home</Link>
            <Link href="/product" className="hover:scale-110 duration-300">Product</Link>
            <Link href="/cart" className="hover:scale-110 duration-300">Cart</Link>
            <Link href="/contact" className="hover:scale-110 duration-300">Contact</Link>
          </nav>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:block">
            <SearchBar />
          </div>

          {/* Login / Register Buttons */}
          <div className="hidden md:flex space-x-4">
            <button className="bg-gradient-to-r from-yellow-400 to-pink-600 text-white text-lg px-6 py-2 rounded-xl hover:scale-110 transition-all duration-300">Login</button>
            <button className="bg-gradient-to-r from-yellow-400 to-pink-600 text-white text-lg px-6 py-2 rounded-xl hover:scale-110 transition-all duration-300">Register</button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-3xl"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white text-black py-4 px-6 shadow-md">
          <Link href="/" className="block py-2 text-lg font-semibold hover:text-purple-600">Home</Link>
          <Link href="/product" className="block py-2 text-lg font-semibold hover:text-purple-600">Product</Link>
          <Link href="/cart" className="block py-2 text-lg font-semibold hover:text-purple-600">Cart</Link>
          <Link href="/contact" className="block py-2 text-lg font-semibold hover:text-purple-600">Contact</Link>
        </div>
      )}
    </>
  );
};

export default Header;
