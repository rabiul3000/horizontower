import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaBullhorn, FaCalendarAlt, FaUserShield } from "react-icons/fa";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import LoadingState from "../../utils/LoadingState";
import { errorAlert } from "../../utils/alerts";
import { axiosSecure } from "../../hooks/useAxios";

const Announcements = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["announcements", "all"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcement/all");
      console.log(res.data);
      return res.data;
    },
  });

  if (isLoading) return <LoadingState />;
  if (error) return errorAlert("Failed to load announcements");

  const isRecent = (createdAt) => dayjs().diff(dayjs(createdAt), "day") <= 3;

  const filtered = data.filter((a) => {
    const created = dayjs(a.createdAt);
    if (startDate && created.isBefore(startDate, "day")) return false;
    if (endDate && created.isAfter(endDate, "day")) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <FaBullhorn className="text-primary" /> Announcements
        </h1>

        {/* Filter */}
        <div className="bg-base-100 p-4 rounded-lg shadow mb-6 flex flex-col sm:flex-row gap-4 items-center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newVal) => setStartDate(newVal)}
              slotProps={{ textField: { size: "small" } }}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newVal) => setEndDate(newVal)}
              slotProps={{ textField: { size: "small" } }}
            />
          </LocalizationProvider>
          <button
            className="btn btn-sm btn-outline btn-error"
            onClick={() => {
              setStartDate(null);
              setEndDate(null);
            }}
          >
            Clear Filter
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center text-gray-500">
            No announcements found.
          </div>
        ) : (
          <div className="space-y-6">
            {filtered.map((a) => (
              <div
                key={a._id}
                className={`card shadow border ${
                  isRecent(a.createdAt)
                    ? "ring-2 ring-primary/40"
                    : "bg-base-100"
                }`}
              >
                <div className="card-body">
                  <h2 className="card-title flex items-center gap-2">
                    <FaBullhorn className="text-primary" /> {a.title}
                    {isRecent(a.createdAt) && (
                      <span className="badge badge-success badge-sm">NEW</span>
                    )}
                  </h2>
                  <p className="text-gray-600 mt-2">{a.description}</p>
                  <div className="mt-4 flex justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <FaUserShield /> {a.postedBy || "Owner"}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt />{" "}
                      {dayjs(a.createdAt).format("MMM D, YYYY")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;
