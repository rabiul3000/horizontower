import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaBuilding,
  FaDoorOpen,
  FaLayerGroup,
} from "react-icons/fa";
import useUser from "../../hooks/useUser";

const MyProfile = () => {
  const { user, userRole } = useUser();

  return (
    <div className=" flex items-center justify-center  py-12 px-4 ">
      <div className="card shadow-2xl shadow-teal-700 w-full max-w-3xl bg-base-100">
        <div className="flex flex-col lg:flex-row items-center gap-8 p-8">
          {/* Profile Image */}
          <div className="avatar">
            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={user?.photoURL || "/placeholder-avatar.png"}
                alt="user_avatar"
              />
            </div>
          </div>

          {/* Profile Info */}
          <div className="space-y-4 text-left w-full">
            <h2 className="text-3xl text-teal-700 capitalize font-bold flex items-center gap-2">
              <FaUser /> {user?.displayName || "Unknown User"}
            </h2>

            <p className="flex items-center gap-2 text-lg text-gray-600">
              <FaEnvelope /> {user?.email}
            </p>

            <div className="divider" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <p className="flex items-center gap-2">
                <FaCalendarAlt className="text-primary" />
                <strong>Agreement Date:</strong> None
              </p>
              <p className="flex items-center gap-2">
                <FaBuilding className="text-primary" /> <strong>Block:</strong>
                None
              </p>
              <p className="flex items-center gap-2">
                <FaLayerGroup className="text-primary" />
                <strong>Floor:</strong> None
              </p>
              <p className="flex items-center gap-2">
                <FaDoorOpen className="text-primary" />
                <strong>Apartment No:</strong> None
              </p>
            </div>

            <div className="pt-4">
              <p className="badge badge-info p-3 text-white">
                Role: {userRole || "Normal User"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
