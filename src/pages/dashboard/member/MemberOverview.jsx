import React, { useMemo } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxios";
import dayjs from "dayjs";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MemberOverview = () => {
  const {
    data: paymentHistory = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["payment", "overview"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/payment/payment_history");
      return data;
    },
    refetchOnWindowFocus: false,
  });

  // Summary data
  const totalPaidAmount = useMemo(
    () =>
      paymentHistory.reduce(
        (sum, p) => sum + (p.status === "paid" ? p.finalAmount : 0),
        0
      ),
    [paymentHistory]
  );

  const successCount = useMemo(
    () => paymentHistory.filter((p) => p.status === "paid").length,
    [paymentHistory]
  );

  const failedCount = useMemo(
    () => paymentHistory.length - successCount,
    [paymentHistory, successCount]
  );

  const latestPayment = useMemo(
    () =>
      paymentHistory
        .filter((p) => p.status === "paid")
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0],
    [paymentHistory]
  );

  const pieData = [
    { name: "Successful", value: successCount },
    { name: "Failed", value: failedCount },
  ];
  const COLORS = ["#22c55e", "#ef4444"];

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
        Error fetching payment data.
      </div>
    );
  }

  if (!paymentHistory.length) {
    return (
      <div className="text-gray-800 text-center mt-10">
        No payment data found.
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        💳 Payment Overview
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card bg-base-100 shadow p-4">
          <h3 className="font-semibold">Total Payments</h3>
          <p className="text-xl font-bold">{paymentHistory.length}</p>
        </div>
        <div className="card bg-base-100 shadow p-4">
          <h3 className="font-semibold">Total Paid</h3>
          <p className="text-xl font-bold text-green-600">
            ${totalPaidAmount.toFixed(2)}
          </p>
        </div>
        <div className="card bg-base-100 shadow p-4">
          <h3 className="font-semibold">Successful</h3>
          <p className="text-xl font-bold text-green-500">{successCount}</p>
        </div>
        <div className="card bg-base-100 shadow p-4">
          <h3 className="font-semibold">Failed</h3>
          <p className="text-xl font-bold text-red-500">{failedCount}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="flex justify-center mb-6">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Latest Payment Highlight */}
      {latestPayment && (
        <div className="card bg-base-200 shadow p-4 my-6">
          <h3 className="font-semibold">Last Payment</h3>
          <p className="text-sm">
            Paid{" "}
            <span className="font-bold">
              ${latestPayment.finalAmount.toFixed(2)}
            </span>{" "}
            on {dayjs(latestPayment.createdAt).format("MMM D, YYYY h:mm A")}
          </p>
          <p className="text-sm">
            Apartment:{" "}
            <span className="font-semibold">{latestPayment.apartmentNo}</span>
          </p>
          <p className="text-sm">
            Month: <span className="font-semibold">{latestPayment.month}</span>,
            Year: <span className="font-semibold">{latestPayment.year}</span>
          </p>
        </div>
      )}

      {/* Recent Payments Table */}
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
            {paymentHistory.slice(0, 10).map((payment, index) => (
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

export default MemberOverview;
