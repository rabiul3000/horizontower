import React from "react";
import { FaRegSadTear } from "react-icons/fa";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-4">
      <div className="backdrop-blur-xl bg-white/30 shadow-xl border border-white/40 rounded-2xl p-10 text-center max-w-md">
        <div className="text-6xl text-purple-600 mb-4 flex justify-center">
          <FaRegSadTear />
        </div>
        <h1 className="text-5xl font-bold text-gray-800 mb-2">404</h1>
        <p className="text-xl text-gray-700 mb-6">Page Not Found</p>
        <p className="text-sm text-gray-600 mb-6">
          The page you're looking for doesn’t exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary btn-wide">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
