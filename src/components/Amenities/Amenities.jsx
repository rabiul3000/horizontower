import React from "react";
import { FaTree, FaDumbbell, FaLaptopHouse, FaCarSide, FaSwimmer, FaWifi } from "react-icons/fa";

const amenitiesList = [
  {
    icon: <FaTree size={30} className="text-teal-600" />,
    title: "Rooftop Garden",
    description: "Relax and enjoy the fresh air with panoramic city views.",
  },
  {
    icon: <FaDumbbell size={30} className="text-teal-600" />,
    title: "Gym",
    description: "Fully equipped gym for all fitness levels.",
  },
  {
    icon: <FaLaptopHouse size={30} className="text-teal-600" />,
    title: "Co-working Lounge",
    description: "Work from home or collaborate in our modern workspace.",
  },
  {
    icon: <FaCarSide size={30} className="text-teal-600" />,
    title: "Underground Parking",
    description: "Secure parking for residents with 24/7 monitoring.",
  },
  {
    icon: <FaSwimmer size={30} className="text-teal-600" />,
    title: "Swimming Pool",
    description: "Enjoy a refreshing dip in our rooftop pool.",
  },
  {
    icon: <FaWifi size={30} className="text-teal-600" />,
    title: "High-speed WiFi",
    description: "Stay connected with high-speed internet throughout the building.",
  },
];

const Amenities = () => {
  return (
    <section className="bg-teal-800 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Building Amenities</h2>
        <p className="text-gray-200 max-w-2xl mx-auto">
          Horizon Tower offers premium amenities designed for comfort, convenience, and a modern lifestyle.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {amenitiesList.map((amenity, index) => (
          <div
            key={index}
            className="bg-white text-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
          >
            <div className="mb-4">{amenity.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{amenity.title}</h3>
            <p className="text-gray-600">{amenity.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Amenities;
