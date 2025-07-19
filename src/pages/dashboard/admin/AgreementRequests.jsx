import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxios";
import { errorAlert } from "../../../utils/alerts";
import LoadingState from "../../../utils/LoadingState";
import Agreement from "./Agreement";
import { FaSync } from "react-icons/fa";

const AgreementRequests = () => {
  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["agreement", "all"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/agreement/all");
      return data;
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <LoadingState />;
  if (error) {
    return errorAlert("Error fetching agreement requests");
  }

  if (!data?.length)
    return (
      <div className="flex justify-between items-center py-2">
        <h2 className="text-2xl text-center font-semibold mb-4">
          No Agreement Requests
        </h2>
        <button className="btn btn-sm btn-outline" onClick={() => refetch()}>
          <FaSync className="mr-2" />
          Refresh
        </button>
      </div>
    );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center py-2">
        <h2 className="text-2xl font-semibold mb-4">Agreement Requests</h2>
        {data.length && (
          <button className="btn btn-sm btn-outline" onClick={() => refetch()}>
            <FaSync className="mr-2" />
            Refresh
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-base-200">
              <th>User Name</th>
              <th>Email</th>
              <th>Floor</th>
              <th>Block</th>
              <th>Room</th>
              <th>Rent</th>
              <th>Request Date</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((agreement) => (
              <Agreement agreement={agreement} key={agreement._id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgreementRequests;
