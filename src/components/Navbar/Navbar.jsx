import { FiHome, FiLogIn, FiMenu, FiXCircle } from "react-icons/fi";

import { RiCommunityLine, RiDashboardLine } from "react-icons/ri";
import { motion } from "motion/react";
import office from "../../assets/office.png";
import useUser from "../../hooks/useUser";
import { Link, useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { confirmAlert, errorAlert } from "../../utils/alerts";
import CommonNavLinks from "./CommonNavLinks"; // adjust path as needed

const Navbar = () => {
  const { user, userLoading } = useUser();
  const { setUser } = useContext(AuthContext);
  // const [showNavbar, setShowNavbar] = useState(true);
  // const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;

  //     if (currentScrollY > lastScrollY && currentScrollY > 80) {
  //       // scrolling down
  //       setShowNavbar(false);
  //     } else {
  //       // scrolling up
  //       setShowNavbar(true);
  //     }

  //     setLastScrollY(currentScrollY);
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [lastScrollY]);

  const handleLogout = async () => {
    document.activeElement.blur();
    try {
      const isConfirmed = await confirmAlert(
        "Are you sure you want to logout?"
      );
      if (!isConfirmed) {
        return;
      }
      signOut(auth);
      setUser(null);
      navigate("/");
    } catch (error) {
      errorAlert(error);
    }
  };
  // console.log(user)

  const LgMenu = () => (
    <div className={`navbar bg-teal-800 text-white fixed px-10 top-0 z-10 h-12`}>
      <div className="flex-1 flex items-center">
        <Link to={"/"}>
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 cursor-pointer item-end"
          >
            <img src={office} className="w-12 h-12" alt="icon" />
            <span className="text-xl"> Horizon Tower</span>
          </motion.span>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 flex items-center gap-4">
          <CommonNavLinks
            handleLogout={handleLogout}
            onLinkClick={() => document.activeElement.blur()}
          />
        </ul>
      </div>
    </div>
  );

  const SmMenu = () => (
    <div className="navbar bg-teal-800 shadow-sm fixed top-0 z-10 px-4 h-16">
      <div className="flex-1">
        <Link to={"/"}>
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center text-white gap-2 cursor-pointer"
          >
            <img src={office} className="w-7 h-7" alt="icon" />
            <span className="text-sm font-medium">HomeHorizon</span>
          </motion.span>
        </Link>
      </div>

      <div className="flex-none flex items-center gap-4">
        {/* Dynamic Login / User on top navbar */}
        {user ? (
          <Link
            to="/dashboard"
            className="flex  items-center gap-2 text-white text-xs"
          >
            <div className="avatar avatar-online">
              <div className="w-7 h-7 rounded-full">
                <img src={user.photoURL} alt="User Avatar" />
              </div>
            </div>
            <span className="truncate capitalize text-sm max-w-[100px]">
              {user.displayName || "My Profile"}
            </span>
          </Link>
        ) : (
          <Link to="/login" className="btn btn-soft  text-sm btn-sm ">
            Login
          </Link>
        )}

        {/* Drawer button (sidebar) */}
        <div className="drawer drawer-end">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label
              htmlFor="my-drawer"
              className="btn btn-ghost text-white drawer-button p-2"
            >
              <FiMenu className="text-xl" />
            </label>
          </div>
          <div className="drawer-side bg-teal-800">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 py-12 flex flex-col gap-4">
              <li className="border-b border-b-gray-300 pb-2">
                <Link to="/" className="flex items-center gap-2 text-sm">
                  <FiHome />
                  Home
                </Link>
              </li>

              <li className="border-b border-b-gray-300 pb-2">
                <Link
                  to="/apartment"
                  className="flex items-center gap-2 text-sm"
                >
                  <RiCommunityLine />
                  Apartment
                </Link>
              </li>

              {user && (
                <li className="border-b border-b-gray-300 pb-2">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 text-sm"
                  >
                    <div className="avatar avatar-online">
                      <div className="w-7 h-7 rounded-full">
                        <img src={user.photoURL} alt="User Avatar" />
                      </div>
                    </div>
                    My Profile
                  </Link>
                </li>
              )}
              {user && (
                <li className="border-b border-b-gray-300 pb-2">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 text-sm"
                  >
                    <RiDashboardLine />
                    Dashboard
                  </Link>
                </li>
              )}

              {user && (
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm"
                  >
                    <RiDashboardLine />
                    Logout
                  </button>
                </li>
              )}

              {!user && (
                <li>
                  <Link className="flex items-center gap-2 text-sm" to="/login">
                    <FiLogIn />
                    Login
                  </Link>
                </li>
              )}

              <li>
                <button
                  className="btn w-full flex items-center justify-center gap-2 text-sm"
                  onClick={() => {
                    document.getElementById("my-drawer").checked = false;
                  }}
                >
                  <FiXCircle className="text-lg" />
                  Close
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="">
      <div className="largeDisplayMenu lg:block hidden z-50">
        <LgMenu />
      </div>

      <div className="smallDisplayMenu lg:hidden block">
        <SmMenu />
      </div>
    </div>
  );
};

export default Navbar;
