import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import { axiosSecure } from "../../../hooks/useAxios";
import { confirmAlert, errorAlert } from "../../../utils/alerts";

// Fetch members from backend
const fetchMembers = async () => {
  const res = await axiosSecure.get("/user/all");
  return res.data.filter((user) => user.role === "member");
};

// Update user role
const updateUserRole = async ({ email, newRole }) => {
  const res = await axiosSecure.patch("/user/remove_member_to_user", { email, newRole });
  return res.data;
};

const ManageMembers = () => {
  const queryClient = useQueryClient();

  const {
    data: members = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["members"],
    queryFn: fetchMembers,
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: updateUserRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError:(err) => {
      console.log(err)
    }
  });

  const handleRemove = async (email) => {
    const confirm = await confirmAlert(
      "Are you sure you want to remove this member and change their role to user?"
    );
    if (confirm) {
      mutation.mutate({ email, newRole: "user" });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    errorAlert("Failed to load members. Please try again later.");
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Members</h2>

      {members.length === 0 ? (
        <p className="text-center text-gray-500">No members found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full ">
            <thead>
              <tr className="text-base font-semibold bg-teal-100">
                <th>User Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map(({ _id, name, email }) => (
                <tr key={_id}>
                  <td className="capitalize">{name || "N/A"}</td>
                  <td>{email}</td>
                  <td>
                    <button
                      onClick={() => handleRemove(email)}
                      className="btn btn-error btn-sm text-white"
                      disabled={mutation.isLoading}
                    >
                      {mutation.isLoading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        "Remove"
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageMembers;
