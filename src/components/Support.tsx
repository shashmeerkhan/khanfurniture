import React from "react";
import Image from "next/image";
import truckIcon from "../../public/trackicon/free-delivery 1.png";
import coinIcon from "../../public/trackicon/cashback 1.png";
import badgeIcon from "../../public/trackicon/Group.png";
import clockIcon from "../../public/trackicon/premium-quality 1.png";
import { StaticImageData } from "next/image";

// Define card data interface
interface Card {
  id: number;
  icon: StaticImageData;
  title: string;
  description: string;
}

// Sample card data
const cards: Card[] = [
  {
    id: 1,
    icon: truckIcon,
    title: "Free Delivery",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.",
  },
  {
    id: 2,
    icon: coinIcon,
    title: "Affordable Prices",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.",
  },
  {
    id: 3,
    icon: badgeIcon,
    title: "Quality Guarantee",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.",
  },
  {
    id: 4,
    icon: clockIcon,
    title: "24/7 Support",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.",
  },
];

const SupportCardList: React.FC = () => {
  return (
    <div className="px-6 py-12">
      <div className="text-center text-3xl font-bold mb-8">Why Choose Us?</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white shadow-md p-6 rounded-lg text-center border border-transparent hover:border-blue-500 hover:shadow-lg transition duration-300"
          >
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <Image src={card.icon} alt={card.title} width={60} height={60} />
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              {card.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportCardList;