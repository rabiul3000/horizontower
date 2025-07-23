import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MdAdd, MdClose } from "react-icons/md";
import { errorAlert, successAlert } from "../../../utils/alerts";
import { axiosSecure } from "../../../hooks/useAxios";
import { Button } from "@mui/material";
import CouponRow from "./CouponRow";
import LoadingState from "../../../utils/LoadingState";

const ManageCoupon = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: coupons = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["coupon", "all"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupon/all");
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = e.target;
      const formData = new FormData(form);
      const newCoupon = Object.fromEntries(formData.entries());

      const res = await axiosSecure.post("/coupon/create", newCoupon);
      console.log(res);

      if (res.status === 201) {
        successAlert("New coupon added");
        refetch();
        setIsModalOpen(false);
      } else {
        errorAlert("Failed to add coupon. Try again.");
      }
    } catch (error) {
      errorAlert(error.message);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Coupons</h2>
        <button
          className="btn bg-teal-700 text-white flex items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <MdAdd className="text-xl" />
          Add Coupon
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Coupon Code</th>
              <th>Discount (%)</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="text-center">
                  {<LoadingState />}
                </td>
              </tr>
            ) : coupons.length ? (
              coupons.map((coupon, index) => (
                <CouponRow
                  key={coupon._id}
                  coupon={coupon}
                  index={index}
                  refetch={refetch}
                />
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">
                  No coupons available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg">Add New Coupon</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-sm btn-circle"
              >
                <MdClose />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="code"
                placeholder="Coupon Code"
                className="input input-bordered w-full"
                required
              />
              <input
                type="number"
                name="discount"
                placeholder="Discount Percentage"
                className="input input-bordered w-full"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                className="textarea textarea-bordered w-full"
                required
              />
              <div className="modal-action">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ backgroundColor: "teal" }}
                  fullWidth
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageCoupon;
