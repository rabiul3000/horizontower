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
  const { user } = useUser();
  const { setUser } = useContext(AuthContext);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // scrolling down
        setShowNavbar(false);
      } else {
        // scrolling up
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleLogout = async () => {
    document.activeElement.blur();
    try {
      const isConfirmed = await confirmAlert("Are you sure you want to logout?");
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
    <div
      className={`navbar bg-teal-800 text-white w-6/12 m-8 mx-auto px-4 rounded-xl shadow-sm fixed top-0 left-3/12 z-50
    
    ${
      showNavbar
        ? "opacity-100 translate-y-0 duration-1000 ease-in-out"
        : "opacity-0"
    }
  `}
    >
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
            user={user}
            handleLogout={handleLogout}
            onLinkClick={() => document.activeElement.blur()}
          />
        </ul>
      </div>
    </div>
  );

  const SmMenu = () => (
    <div className="navbar bg-teal-800 shadow-sm">
      <div className="flex-1">
        <Link to={"/"}>
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-end text-white gap-1 cursor-pointer item-end"
          >
            <img src={office} className="w-12 h-12" alt="icon" />
            <span className="text-2xl"> HomeHorizon</span>
          </motion.span>
        </Link>
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
              <CommonNavLinks
                user={user}
                handleLogout={handleLogout}
                onLinkClick={() => {
                  document.getElementById("my-drawer").checked = false;
                }}
              />

           
              
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
