import React, { useState } from "react";
import { confirmAlert, errorAlert, successAlert } from "../../../utils/alerts";
import { axiosSecure } from "../../../hooks/useAxios";
import { LinearProgress } from "@mui/material";

const CouponRow = ({ coupon, index, refetch }) => {
  const [loading, setLoading] = useState(false);

  const handleActiveCoupon = async () => {
    try {
      const isConfirm = await confirmAlert(
        "Are you sure you want to Inactive this coupon?"
      );
      if (!isConfirm) return;
      setLoading(true);

      const res = await axiosSecure.patch("/coupon/change_status", {
        couponId: coupon._id,
        status: coupon.status,
      });
      if (res.status === 200) {
        if (res.data._id) {
          successAlert("Coupon status changed to Inactive");
          refetch();
        }
      } else {
        errorAlert("Failed to change coupon status. Try again.");
      }
    } catch (error) {
      errorAlert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInactiveCoupon = async () => {
    try {
      const isConfirm = await confirmAlert(
        "Are you sure you want to Active this coupon?"
      );
      if (!isConfirm) return;
      setLoading(true);

      const res = await axiosSecure.patch("/coupon/change_status", {
        couponId: coupon._id,
        status: coupon.status,
      });
      if (res.status === 200) {
        if (res.data._id) {
          successAlert("Coupon status changed to Active");
          refetch();
        }
      } else {
        errorAlert("Failed to change coupon status. Try again.");
      }
    } catch (error) {
      errorAlert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr key={coupon._id}>
      <td>{index + 1}</td>
      <td>{coupon.code}</td>
      <td>{coupon.discount}</td>
      <td>{coupon.description || "—"}</td>
      <td>
        <span
          className={`badge badge-sm badge-soft ${
            coupon.status === "active" ? "badge-success" : "badge-error"
          } `}
        >
          {" "}
          {coupon.status || "—"}{" "}
        </span>
      </td>
      <td className="space-y-2">
        {coupon.status === "active" ? (
          <button
            className="btn btn-sm btn-info btn-outline"
            onClick={handleActiveCoupon}
          >
            Change Status
          </button>
        ) : (
          <button
            className="btn btn-sm btn-info btn-outline"
            onClick={handleInactiveCoupon}
          >
            Change Status
          </button>
        )}
        {loading && <LinearProgress color="primary" />}
      </td>
    </tr>
  );
};

export default CouponRow;
