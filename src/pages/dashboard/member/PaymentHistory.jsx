import React, { useState, useMemo } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { axiosSecure } from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { FormControl, InputLabel, MenuItem, Select, Box } from "@mui/material";

const PaymentHistory = () => {
  const [selectedYear, setSelectedYear] = useState("all");

  const {
    data: paymentHistory = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["payment", "payment_history"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/payment/payment_history");
      return data;
    },
    refetchOnWindowFocus: false,
  });

  // Extract unique years for dropdown
  const years = useMemo(() => {
    const uniqueYears = new Set(paymentHistory.map((p) => p.year));
    return Array.from(uniqueYears).sort((a, b) => b - a); // descending order
  }, [paymentHistory]);

  // Filtered payments based on selected year
  const filteredPayments =
    selectedYear === "all"
      ? paymentHistory
      : paymentHistory.filter((p) => p.year === selectedYear);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center mt-10">
        Error fetching payment history.
      </div>
    );
  }
  if (!paymentHistory.length) {
    return (
      <div className="text-gray-800 text-center mt-10">No payment found.</div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        💳 Payment History
      </h2>

      {/* Year Filter */}
      <Box className="mb-6 max-w-xs mx-auto">
        <FormControl fullWidth size="small">
          <InputLabel id="year-filter-label">Search by Year</InputLabel>
          <Select
            labelId="year-filter-label"
            id="year-filter"
            value={selectedYear}
            label="Filter by Year"
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <MenuItem value="all">All Years</MenuItem>
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="table table-zebra w-full text-sm">
          <thead className="bg-teal-100 text-base font-semibold text-base-content">
            <tr>
              <th>No</th>
              <th>Transaction ID</th>
              <th>Apartment</th>
              <th>Paid Month</th>
              <th>Year</th>
              <th>Paid At</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                <td className="text-xs break-all">{payment.transactionId}</td>
                <td>{payment.apartmentNo}</td>
                <td>{payment.month}</td>
                <td>{payment.year}</td>
                <td>{dayjs(payment.createdAt).format("MMM D, YYYY h:mm A")}</td>
                <td>${payment.finalAmount.toFixed(2)}</td>
                <td>
                  {payment.status === "paid" ? (
                    <span className="flex items-center gap-1 text-green-600 font-semibold">
                      <FaCheckCircle className="text-green-500" /> Paid
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-600 font-semibold">
                      <FaTimesCircle className="text-red-500" /> Failed
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
