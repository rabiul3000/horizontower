import React from "react";
import {
  FaUsers,
  FaUserShield,
  FaBuilding,
  FaDoorOpen,
  FaDoorClosed,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxios";
import useUser from "../../../hooks/useUser";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#10B981", "#EF4444"]; // green, red

const Overview = () => {
  const { user, userRole } = useUser();

  const { data: dashboardStats = {} } = useQuery({
    queryKey: ["overviewStats"],
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

  const pieData = [
    { name: "Available", value: availableRooms },
    { name: "Unavailable", value: unavailableRooms },
  ];

  const userData = [
    { role: "Users", count: usersCount },
    { role: "Members", count: membersCount },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Admin Summary */}
      <div className="card bg-base-200 shadow-md p-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
          <img
            src={user?.photoURL}
            alt="Admin"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold">{user?.displayName || "Admin"}</h2>
          <p className="text-sm text-neutral">{user?.email}</p>
          <span className="badge badge-primary mt-1">{userRole}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow p-5 flex items-center gap-4">
          <FaBuilding className="text-3xl text-primary" />
          <div>
            <h3 className="text-lg font-semibold">Total Rooms</h3>
            <p>{totalRooms}</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow p-5 flex items-center gap-4">
          <FaDoorOpen className="text-3xl text-success" />
          <div>
            <h3 className="text-lg font-semibold">Available Rooms</h3>
            <p>{availableRooms}</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow p-5 flex items-center gap-4">
          <FaDoorClosed className="text-3xl text-error" />
          <div>
            <h3 className="text-lg font-semibold">Unavailable Rooms</h3>
            <p>{unavailableRooms}</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="card bg-base-100 shadow p-5">
          <h3 className="text-lg font-semibold mb-4">Room Availability</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="card bg-base-100 shadow p-5">
          <h3 className="text-lg font-semibold mb-4">User Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={userData}>
              <XAxis dataKey="role" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Overview;
