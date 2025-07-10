import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "motion/react";

const Coupons = () => {
  const offs = [15, 10, 5, 20, 25, 30];
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };
  const Coupon = ({ off }) => (
    <div className="flex flex-col gap-4 shadow-teal-300 shadow-2xl bg-teal-900 text-white rounded-lg overflow-hidden">
      <div className="p-4 flex flex-col sm:flex-row gap-4 items-center sm:items-center">
        {/* Left Box */}
        <div className="border font-bold w-24 h-24 sm:w-32 sm:h-32 border-dashed flex flex-col items-center justify-center">
          <h1 className="text-2xl sm:text-4xl">${off}</h1>
          <h1 className="text-2xl sm:text-4xl">Off</h1>
        </div>

        {/* Middle Text */}
        <div className="flex-1 flex flex-col sm:justify-center gap-1">
          <h1 className="text-lg sm:text-2xl font-semibold">
            Get ${off} Off on your Next Purchase
          </h1>
          <p className="text-sm flex items-center gap-1 text-green-400">
            <FaCheckCircle className="text-green-400" />
            Code Verified
          </p>
        </div>

        {/* Right Button */}
        <div className="w-full sm:w-auto flex justify-start sm:justify-end items-center">
          <button className="btn btn-outline w-full sm:w-auto">
            Add Coupon
          </button>
        </div>
      </div>

      <div className="px-4 py-2 bg-teal-700 text-sm sm:text-base">
        <p>Limited Time Offer. Grab Now!</p>
      </div>
    </div>
  );

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={fadeUp}
      viewport={{ once: true, amount: 0.2 }}
      className="w-full px-4 py-12 sm:p-8 lg:p-24 bg-gray-200 text-white"
    >
      <h1 className="py-6 text-xl sm:text-2xl font-bold">
        <button className="btn btn-lg text-teal-900">
          Top Horizon Tower Coupons
        </button>
      </h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {offs.map((off, index) => (
          <Coupon key={index} off={off} />
        ))}
      </div>
    </motion.div>
  );
};

export default Coupons;
