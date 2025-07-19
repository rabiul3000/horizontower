import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { confirmAlert, errorAlert, successAlert } from "../../../utils/alerts";
import { axiosSecure } from "../../../hooks/useAxios";
import LoadingState from "../../../utils/LoadingState";
import { LinearProgress } from "@mui/material";

const Agreement = ({ agreement }) => {
  const [accepted, setAccepted] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    try {
      const isConfirm = await confirmAlert(
        "Do you want to accept this agreement?"
      );
      if (!isConfirm) return;
      // backend operations

      setLoading(true);

      const res = await axiosSecure.patch(`/agreement/accept/${agreement._id}`);
      if (res.status === 200) {
        setAccepted(true);
        successAlert("Agreement accepted successfully");
      }
    } catch (err) {
      errorAlert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      const isConfirm = await confirmAlert(
        "Do you want to reject this agreement?"
      );
      if (!isConfirm) return;
      // backend operations

      setLoading(true);

      const res = await axiosSecure.patch(`/agreement/reject/${agreement._id}`);
      console.log(res);
      if (res.status === 200) {
        setRejected(true);
        successAlert("Agreement rejected successfully");
      }
    } catch (err) {
      errorAlert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr key={agreement._id}>
      <td className="capitalize">{agreement.name}</td>
      <td>{agreement.email}</td>
      <td>{agreement.floor}</td>
      <td>{agreement.block}</td>
      <td>{agreement.apartmentNo}</td>
      <td>${agreement.rent}</td>

      <td>
        {new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(agreement.createdAt))}
      </td>
      <td>
        {accepted || rejected ? (
          <span className="badge badge-sm badge-success badge-soft">
            checked
          </span>
        ) : (
          <span className="badge badge-sm badge-neutral badge-soft">
            {agreement.status}
          </span>
        )}
      </td>

      <td className="flex gap-2 justify-center">
        <button
          className="btn btn-sm btn-success"
          onClick={handleAccept}
          disabled={accepted || rejected}
        >
          <FaCheckCircle className="mr-1" /> {accepted ? "Accepted" : "Accept"}
        </button>
        <button
          className="btn btn-sm btn-error"
          onClick={handleReject}
          disabled={accepted || rejected}
        >
          <FaTimesCircle className="mr-1" /> {rejected ? "Rejected" : "Reject"}
        </button>
      </td>
      {loading && <LinearProgress color="primary" />}
    </tr>
  );
};

export default Agreement;
