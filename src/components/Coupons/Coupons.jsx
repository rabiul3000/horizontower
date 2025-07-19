import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "motion/react";
import { axiosPublic } from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import LoadingState from "../../utils/LoadingState";
import { errorAlert } from "../../utils/alerts";
import CouponCard from "../Cards/CouponCard";

const Coupons = () => {
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["coupon", "all"],
    queryFn: async () => {
      const res = await axiosPublic.get("/coupon/all");
      console.log(res.data);
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };
 

  if (isLoading) return <LoadingState />;
  if (error) return errorAlert("Coupons fetching failed");
  if (!data.length)
    return <h1 className="text-center text-3xl"> No Coupons found</h1>;

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
        {data.map((coupon) => (
          <CouponCard key={coupon._id} {...coupon} />
        ))}
      </div>
    </motion.div>
  );
};

export default Coupons;
