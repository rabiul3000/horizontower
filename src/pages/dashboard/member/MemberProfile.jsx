import React from "react";
import { FaUserCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import useUser from "../../../hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxios";
import RentedApartmentCard from "../../../components/Cards/RentedApartmentInfoCard";
import LoadingState from "../../../utils/LoadingState";
import { errorAlert } from "../../../utils/alerts";

const MemberProfile = () => {
  const { user, userRole, userLoading } = useUser();

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["agreement", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/agreement/${user.email}`);
      return res.data;
    },
    refetchOnWindowFocus: false,
    enabled: !!user?.email, // only fetch if email is available
  });

  if (isLoading || isFetching || userLoading) return <LoadingState />;
  if (error) errorAlert(error.message);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center p-4"
    >
      <div className="w-11/12 md:w-4/5 lg:max-w-5xl mx-auto space-y-6">
        {/* User Info Card */}
        <div className="card bg-base-200 shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
          <img
            src={user?.photoURL}
            alt="User"
            className="w-24 h-24 rounded-full object-cover border-2 border-primary"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold flex justify-center md:justify-start items-center gap-2">
              {user?.displayName || "Member"}
              <span className="badge badge-info text-white text-xs font-medium flex items-center gap-1">
                <FaUserCheck className="text-white text-sm" />
                {userRole}
              </span>
            </h2>
            <p className="text-sm text-neutral">{user?.email}</p>
          </div>
        </div>

        {/* Apartment Info */}
        <div className="card bg-base-200 shadow-md p-6">
          <RentedApartmentCard apartment={data} />
        </div>
      </div>
    </motion.div>
  );
};

export default MemberProfile;
