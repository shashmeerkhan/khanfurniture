import React from "react";
import pro1 from "../../public/pro1.png";
import pro2 from "../../public/pro2.png";
import Image from "next/image";
import Link from "next/link";

const PromotionalBanner: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-400 to-purple-500 text-white p-8 rounded-xl shadow-lg flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-10">
      {/* Left Side - Image 1 */}
      <div className="flex-1 flex justify-center md:justify-start">
        <Image
          src={pro1}
          alt="Lamp"
          width={500}
          height={500}
          className="rounded-lg shadow-lg object-contain w-full max-w-[450px]"
        />
      </div>

      {/* Middle - Text Content */}
      <div className="flex-1 text-center md:text-left max-w-md">
        <h4 className="text-blue-200 font-semibold text-lg uppercase mb-3 tracking-wide">
          Best Furniture For Your Castle....
        </h4>
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 text-white">
          New Furniture Collection Trends in 2020
        </h1>
        <p className="text-lg text-white opacity-90 mb-6">
          Discover the finest designs and premium quality furniture that elevates your living spaces.
          Explore our latest collection to bring your dream home to life.
        </p>
        <Link href="/product">
          <button className="bg-gradient-to-r from-yellow-400 to-pink-600 text-xl text-white py-3 px-8 rounded-full hover:bg-gradient-to-l transform hover:scale-105 transition duration-300">
            Shop Now
          </button>
        </Link>
      </div>

      {/* Right Side - Image 2 */}
      <div className="flex-1 flex justify-center md:justify-end">
        <Image
          src={pro2}
          alt="Lamp"
          width={500}
          height={500}
          className="rounded-lg shadow-lg object-contain w-full max-w-[450px]"
        />
      </div>
    </div>
  );
};

export default PromotionalBanner;
