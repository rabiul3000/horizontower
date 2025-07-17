import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MenuItem, TextField, Button } from "@mui/material";
import { errorAlert, successAlert } from "../../../utils/alerts";
import { axiosSecure } from "../../../hooks/useAxios";

// Predefined apartment announcement titles
const announcementTitles = [
  "Maintenance Update",
  "Electricity Interruption",
  "Water Supply Interruption",
  "Fire Drill Notice",
  "Parking Lot Update",
  "Elevator Maintenance",
  "Community Meeting",
  "Security Notice",
  "Garbage Collection Change",
  "New Resident Welcome",
  "Rent Payment Reminder",
  "Custom Title",
];

const MakeAnnouncement = () => {
  const [loading, setLoading] = useState(false);
  const [announcement, setAnnouncement] = useState({
    title: "",
    customTitle: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnouncement({ ...announcement, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const titleToSend =
        announcement.title === "Custom Title"
          ? announcement.customTitle
          : announcement.title;

      if (!titleToSend || !announcement.description) {
        errorAlert("Please provide a title and description.");
        return;
      }

      const res = await axiosSecure.post("/announcement/make", {
        title: titleToSend,
        description: announcement.description,
      });

      if (res.status === 201 && res.data?.saveAnnouncement?._id) {
        successAlert("Announcement has been published!");
        setAnnouncement({ title: "", customTitle: "", description: "" });
      } else {
        errorAlert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error posting announcement:", error);
      errorAlert("An error occurred while posting the announcement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-100 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-teal-700">
        <FiEdit /> Make an Announcement
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Title Selector */}
        <TextField
          select
          label="Select Announcement Title"
          name="title"
          value={announcement.title}
          onChange={handleChange}
          fullWidth
        >
          {announcementTitles.map((title, idx) => (
            <MenuItem key={idx} value={title}>
              {title}
            </MenuItem>
          ))}
        </TextField>

        {/* Custom Title Field (Shown only when "Other" selected) */}
        {announcement.title === "Custom Title" && (
          <TextField
            label="Add Title"
            name="customTitle"
            value={announcement.customTitle}
            onChange={handleChange}
            fullWidth
          />
        )}

        {/* Description */}
        <TextField
          label="Description"
          name="description"
          value={announcement.description}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: "#0f766e",
            ":hover": { backgroundColor: "#115e59" },
          }}
        >
          {loading ? <div>Publishing <span className="loading loading-ring"></span></div>  : "Publish"}
        </Button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
