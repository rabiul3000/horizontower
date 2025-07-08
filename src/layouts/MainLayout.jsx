import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  }, []);

  return (
    <div>
      {showAnimation ? (
        <div className="flex  justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-teal-800"></div>
        </div>
      ) : (
        <div>
          <Navbar />
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default MainLayout;
