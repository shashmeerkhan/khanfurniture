import React from "react";
import Image from "next/image";
import lightlogos from "../../public/lightlogos.png"
import Link from "next/link";

const NewsletterSection: React.FC = () => {
  return (
   <>
    <div
      className="flex flex-col items-center justify-center bg-cover bg-center py-16 px-6"
      style={{
        backgroundImage: 'url("/Rectangle 102.png")',
      }}
    >
      <h2 className="text-xl sm:text-3xl text-blue-600 font-bold text-center mb-4">
        Get Latest and Update  <br /> Our Products
      </h2>
      <Link href={"/product"}>
      <button className="font-semibold bg-gradient-to-r from-blue-400 to-purple-500 text-white py-3 px-8 rounded-md hover:bg-blue-600 transition">
        Shop Now
      </button>
      </Link>
        
    </div>
    <div className="ml-15">
        <Image src={lightlogos} alt="logos"/>
    </div>
   </>
  );
};

export default NewsletterSection;
