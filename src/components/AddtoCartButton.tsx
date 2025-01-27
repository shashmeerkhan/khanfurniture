import React from "react";

type AddToCartButtonProps = {
  onClick: () => void;
  isAvailable: boolean;
};

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ onClick, isAvailable }) => {
  return (
    <button
      onClick={onClick}
      disabled={!isAvailable}
      className={`mt-4 w-full px-4 py-2 rounded-lg transition-transform duration-200 ${
        isAvailable
          ? "bg-gradient-to-r from-yellow-400 to-pink-600 text-white text-sm hover:scale-105"
          : "bg-gray-400 text-gray-800 cursor-not-allowed"
      }`}
    >
      {isAvailable ? "Add to Cart" : "Out of Stock"}
  );
    </button>
  );
};

export default AddToCartButton;