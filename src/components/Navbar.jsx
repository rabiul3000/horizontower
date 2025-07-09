import { FiHome, FiLogIn, FiMenu, FiXCircle } from "react-icons/fi";

import { RiCommunityLine } from "react-icons/ri";
import { motion } from "motion/react";
import { FiGrid } from "react-icons/fi";
import office from "../assets/office.png";
import useUser from "../hooks/useUser";

const Navbar = () => {
  const { user } = useUser();

  const LgMenu = () => (
    <div className="navbar bg-teal-800 text-white w-6/12 m-8 px-4 rounded-xl fixed right-3/12 shadow-sm">
      <div className="flex-1 flex items-center">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1 cursor-pointer item-end"
        >
          <img src={office} className="w-12 h-12" alt="icon" />
          <span className="text-xl"> HomeHorizon</span>
        </motion.a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 flex items-center gap-4">
          {/* Home Link */}
          <li>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1"
            >
              <FiHome className="text-lg" />
              Home
            </motion.a>
          </li>

          {/* Apartment Link */}
          <li>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1"
            >
              <RiCommunityLine className="text-lg" />
              Apartment
            </motion.a>
          </li>

          {/* User / Login Dropdown */}
          <div className="dropdown dropdown-end text-black font-semibold">
            <div tabIndex={0} role="button">
              {!user ? (
                <motion.div whileHover={{ scale: 1.05 }} className="avatar">
                  <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 btn btn-sm"
                >
                  <FiLogIn className="text-lg" />
                  <span>Login</span>
                </motion.div>
              )}
            </div>

            {/* Dropdown Menu */}
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box bg-base-100 z-10 w-52 p-2 shadow-md"
            >
              <li>
                <a onClick={() => document.activeElement.blur()}>
                  {user?.name}
                </a>
              </li>
              <li>
                <a onClick={() => document.activeElement.blur()}>Dashboard</a>
              </li>
              <li>
                <a onClick={() => document.activeElement.blur()}>Logout</a>
              </li>
            </ul>
          </div>
        </ul>
      </div>
    </div>
  );

  const SmMenu = () => (
    <div className="navbar bg-teal-800 shadow-sm">
      <div className="flex-none"></div>
      <div className="flex-1">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-end text-white gap-1 cursor-pointer item-end"
        >
          <img src={office} className="w-12 h-12" alt="icon" />
          <span className="text-2xl"> HomeHorizon</span>
        </motion.a>
      </div>
      <div className="flex-none ">
        <div className="drawer drawer-end">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label
              htmlFor="my-drawer"
              className="btn btn-ghost text-white drawer-button"
            >
              <FiMenu className="text-2xl mt-3" />
            </label>
          </div>
          <div className="drawer-side bg-teal-800">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200  text-base-content min-h-full w-80 p-4 py-12 flex flex-col gap-4">
              {/* Sidebar content here */}

              <li
                onClick={() => {
                  document.getElementById("my-drawer").checked = false;
                }}
              >
                <a className="flex items-center gap-2">
                  <FiGrid />
                  Dashboard
                </a>
              </li>

              <li
                onClick={() => {
                  document.getElementById("my-drawer").checked = false;
                }}
              >
                <a className="flex items-center gap-2">
                  <FiHome />
                  Apartment
                </a>
              </li>

              <li
                onClick={() => {
                  document.getElementById("my-drawer").checked = false;
                }}
              >
                {user ? (
                  <a className="flex items-center gap-2">
                    <FiLogIn />
                    Logout
                  </a>
                ) : (
                  <a className="flex items-center gap-2">
                    <FiLogIn />
                    Login
                  </a>
                )}
              </li>

              <li>
                <button
                  className="btn w-full flex items-center justify-center gap-2"
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
    <div className="sticky z-10">
      <motion.div
        className="largeDisplayMenu lg:block hidden"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
      >
        <LgMenu />
      </motion.div>

      <div className="smallDisplayMenu lg:hidden block">
        <SmMenu />
      </div>
    </div>
  );
};

export default Navbar;
