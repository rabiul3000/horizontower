import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { errorAlert, successAlert } from "../../../utils/alerts";
import { MdOutlineAttachMoney } from "react-icons/md";
import LoadingState from "../../../utils/LoadingState";
import useUser from "../../../hooks/useUser";
import { motion } from "framer-motion";
import { TextField, Button } from "@mui/material";
import { axiosSecure } from "../../../hooks/useAxios";

const MakePayment = () => {
  const { user, userLoading } = useUser();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountedRent, setDiscountedRent] = useState(null);
  const [couponStatus, setCouponStatus] = useState("");

  const {
    data: apartment,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["agreement", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/agreement/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
    refetchOnWindowFocus: false,
  });

  const handleApplyCoupon = async () => {
    if (!couponCode) return errorAlert("Enter a coupon code first.");
    try {
      const { data } = await axiosSecure.post("/coupon/validate/", {
        couponCode,
      });
      const discount = data;

      if (discount) {
        const newRent = apartment?.rent - (apartment?.rent * discount) / 100;
        setDiscountedRent(Math.round(newRent));
        setCouponStatus(`Coupon applied: ${discount}% off`);
        successAlert("Coupon applied successfully!");
      } else {
        setCouponStatus("Invalid coupon.");
        errorAlert("Invalid coupon code.");
      }
    } catch (err) {
      console.error(err);
      errorAlert(err.response.data);
      setCouponStatus(err.response.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMonth) return errorAlert("Please select a month.");
    setLoading(true);

    try {
      const res = await axiosSecure.post("/payment", {
        email: apartment?.email,
        floor: apartment?.floor,
        block: apartment?.block,
        apartmentNo: apartment?.apartmentNo,
        rent: discountedRent || apartment?.rent,
        month: selectedMonth,
        coupon: couponCode || null,
      });

      if (res.status === 201) {
        successAlert("Payment submitted successfully.");
        setCouponCode("");
        setCouponStatus("");
        setDiscountedRent(null);
      } else {
        errorAlert("Payment failed. Try again.");
      }
    } catch (err) {
      errorAlert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading || userLoading) return <LoadingState />;
  if (error) return errorAlert("Failed to load apartment info");

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center p-4"
    >
      <div className="w-11/12 md:w-8/12 lg:w-6/12 bg-base-200 p-6 rounded-xl shadow-md space-y-6">
        <h2 className="text-2xl font-bold text-center flex justify-center items-center gap-2">
          <MdOutlineAttachMoney className="text-primary text-3xl" /> Make
          Payment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField
              label="Email"
              value={apartment?.email}
              InputProps={{ readOnly: true }}
              fullWidth
            />
            <TextField
              label="Floor"
              value={apartment?.floor}
              InputProps={{ readOnly: true }}
              fullWidth
            />
            <TextField
              label="Block"
              value={apartment?.block}
              InputProps={{ readOnly: true }}
              fullWidth
            />
            <TextField
              label="Room/Apartment No"
              value={apartment?.apartmentNo}
              InputProps={{ readOnly: true }}
              fullWidth
            />
            <TextField
              label="Rent"
              value={discountedRent || apartment?.rent}
              InputProps={{ readOnly: true }}
              fullWidth
            />
            <TextField
              select
              label="Select Month"
              SelectProps={{ native: true }}
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              fullWidth
            >
              <option disabled value="">
                Select Month
              </option>
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </TextField>
          </div>

          {/* Coupon Section */}
          <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
            <TextField
              label="Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="w-full"
            />
            <Button variant="outlined" onClick={handleApplyCoupon}>
              Apply
            </Button>
          </div>
          {couponStatus && (
            <p className="text-sm text-info text-center">{couponStatus}</p>
          )}

          <button
            className="btn btn-primary w-full mt-4"
            type="submit"
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default MakePayment;
