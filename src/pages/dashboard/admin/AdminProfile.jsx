import { CircularProgress } from "@mui/material";
import {
  FaUsers,
  FaUserShield,
  FaBuilding,
  FaDoorOpen,
  FaDoorClosed,
  FaStar,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useUser from "../../../hooks/useUser";
import useAxios from "../../../hooks/useAxios";

const AdminProfile = () => {
  const { user, userRole } = useUser();
  const { axiosSecure } = useAxios();

  // React Query logic
  const {
    data: dashboardStats = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["adminDashboardStats"],
    queryFn: async () => {
      const [apartmentRes, usersRes] = await Promise.all([
        axiosSecure.get("/apartment/apartments_for_admin"),
        axiosSecure.get("/user/all"),
      ]);

      const apartments = apartmentRes.data || [];
      const users = usersRes.data || [];

      const totalRooms = apartments.length;
      const availableRooms = apartments.filter(
        (a) => a.status === "available"
      ).length;
      const unavailableRooms = totalRooms - availableRooms;

      const usersCount = users.filter((u) => u.role === "user").length;
      const membersCount = users.filter((u) => u.role === "member").length;
      console.log(apartmentRes);

      return {
        totalRooms,
        availableRooms,
        unavailableRooms,
        usersCount,
        membersCount,
      };
    },
    refetchOnWindowFocus: false,
  });

  const {
    totalRooms = 0,
    availableRooms = 0,
    unavailableRooms = 0,
    usersCount = 0,
    membersCount = 0,
  } = dashboardStats;

  const availablePercent = totalRooms
    ? ((availableRooms / totalRooms) * 100).toFixed(1)
    : 0;
  const unavailablePercent = totalRooms
    ? ((unavailableRooms / totalRooms) * 100).toFixed(1)
    : 0;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Admin Info Card */}
      <div className="card bg-base-200 shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
        <img
          src={user?.photoURL}
          alt="Admin"
          className="w-24 h-24 rounded-full object-cover border-2 border-primary"
        />
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            {user?.displayName || "Admin"}
            <span className="badge bg-teal-500 text-white text-xs font-medium flex items-center gap-1">
              <FaStar className="text-white text-sm" />
              {userRole}
            </span>
          </h2>
          <p className="text-sm text-neutral">{user?.email}</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <CircularProgress />
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">
          Failed to load dashboard data
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Total Rooms */}
          <div className="card bg-base-100 shadow p-5 flex items-center gap-4">
            <FaBuilding className="text-4xl text-primary" />
            <div>
              <h3 className="text-lg font-semibold">Total Rooms</h3>
              <p className="text-lg">{totalRooms}</p>
            </div>
          </div>

          {/* Available Rooms */}
          <div className="card bg-base-100 shadow p-5 flex items-center gap-4">
            <FaDoorOpen className="text-4xl text-success" />
            <div className="w-full">
              <h3 className="text-lg font-semibold">Available Rooms</h3>
              <p>
                {availableRooms} ({availablePercent}%)
              </p>
              <progress
                className="progress progress-success w-full mt-1"
                value={availablePercent}
                max="100"
              />
            </div>
          </div>

          {/* Unavailable Rooms */}
          <div className="card bg-base-100 shadow p-5 flex items-center gap-4">
            <FaDoorClosed className="text-4xl text-error" />
            <div className="w-full">
              <h3 className="text-lg font-semibold">Unavailable Rooms</h3>
              <p>
                {unavailableRooms} ({unavailablePercent}%)
              </p>
              <progress
                className="progress progress-error w-full mt-1"
                value={unavailablePercent}
                max="100"
              />
            </div>
          </div>

          {/* Total Users */}
          <div className="card bg-base-100 shadow p-5 flex items-center gap-4">
            <FaUsers className="text-4xl text-info" />
            <div>
              <h3 className="text-lg font-semibold">Total Users</h3>
              <p className="text-lg">{usersCount}</p>
            </div>
          </div>

          {/* Total Members */}
          <div className="card bg-base-100 shadow p-5 flex items-center gap-4">
            <FaUserShield className="text-4xl text-warning" />
            <div>
              <h3 className="text-lg font-semibold">Total Members</h3>
              <p className="text-lg">{membersCount}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
