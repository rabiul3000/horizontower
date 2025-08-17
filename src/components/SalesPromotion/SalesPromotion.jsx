import React from 'react';
import { FaGift, FaRocket, FaRegSmileBeam } from 'react-icons/fa';

const promotions = [
  {
    icon: <FaGift size={30} className="text-teal-800" />,
    title: 'Welcome Gift',
    description: 'Get a smart home starter kit on your first month of stay.',
    bg: 'bg-white',
  },
  {
    icon: <FaRocket size={30} className="text-teal-800" />,
    title: 'Early Bird Discount',
    description: 'Sign the lease early and enjoy 10% off your first 3 months.',
    bg: 'bg-white',
  },
  {
    icon: <FaRegSmileBeam size={30} className="text-teal-800" />,
    title: 'Referral Rewards',
    description: 'Invite friends and get free amenity access for a month.',
    bg: 'bg-white',
  },
];

const SalesPromotion = () => {
  return (
    <section className="bg-teal-800 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Special Offers & Promotions
        </h2>
        <p className="text-teal-100 text-lg sm:text-xl">
          Exclusive deals to make your stay at Horizon Tower even more rewarding
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {promotions.map((promo, index) => (
          <div
            key={index}
            className={`flex flex-col items-center text-center p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 ${promo.bg}`}
          >
            <div className="mb-4 p-4 rounded-full bg-teal-100">{promo.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{promo.title}</h3>
            <p className="text-gray-700">{promo.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SalesPromotion;
