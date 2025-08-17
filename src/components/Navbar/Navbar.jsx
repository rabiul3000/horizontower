import {
  FiHome,
  FiLogIn,
  FiMenu,
  FiXCircle,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { RiCommunityLine, RiDashboardLine } from "react-icons/ri";
import { motion } from "motion/react";
import office from "../../assets/office.png";
import useUser from "../../hooks/useUser";
import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { confirmAlert, errorAlert } from "../../utils/alerts";
import CommonNavLinks from "./CommonNavLinks"; // adjust path as needed
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const { user } = useUser();
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const bgClass = theme === "dark" ? "bg-gray-900" : "bg-teal-900";
  const textClass = theme === "dark" ? "text-white" : "text-white";

  const handleLogout = async () => {
    document.activeElement.blur();
    try {
      const isConfirmed = await confirmAlert(
        "Are you sure you want to logout?"
      );
      if (!isConfirmed) return;
      await signOut(auth);
      setUser(null);
      navigate("/");
    } catch (error) {
      errorAlert(error);
    }
  };

  const LgMenu = () => (
    <div
      className={`navbar ${bgClass} ${textClass} fixed top-0 w-full px-10 z-50 h-16`}
    >
      <div className="flex-1 flex items-center gap-2">
        <Link to={"/"}>
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 cursor-pointer"
          >
            <img src={office} className="w-12 h-12" alt="icon" />
            <span className="text-xl font-semibold">Horizon Tower</span>
          </motion.span>
        </Link>
      </div>

      <div className="flex-none flex items-center gap-4">
        <ul className="flex items-center gap-4">
          <CommonNavLinks
            handleLogout={handleLogout}
            onLinkClick={() => document.activeElement.blur()}
          />
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {theme === "light" ? <FiMoon size={18} /> : <FiSun size={18} />}
          </button>
        </ul>
      </div>
    </div>
  );

  const SmMenu = () => (
    <div
      className={`navbar ${bgClass} ${textClass} fixed top-0 w-full px-4 z-50 h-16`}
    >
      <div className="flex-1 flex items-center gap-2">
        <Link to={"/"}>
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img src={office} className="w-7 h-7" alt="icon" />
            <span className="text-xs font-medium">HomeHorizon</span>
          </motion.span>
        </Link>
      </div>

      <div className="flex-none flex items-center gap-2">
        {user ? (
          <Link to="/dashboard" className="flex items-center gap-2 text-xs">
            <div className="w-7 h-7 rounded-full overflow-hidden">
              <img src={user.photoURL} alt="User Avatar" />
            </div>
            <span className="truncate capitalize max-w-[80px]">
              {user.displayName || "Profile"}
            </span>
          </Link>
        ) : (
          <Link to="/login" className="btn btn-sm">
            {/* Using simple Tailwind btn classes */}
            Login
          </Link>
        )}

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {theme === "light" ? <FiMoon size={18} /> : <FiSun size={18} />}
        </button>

        {/* Drawer / Sidebar */}
        <div className="drawer drawer-end">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="my-drawer" className="btn btn-ghost p-2">
              <FiMenu size={22} />
            </label>
          </div>
          <div
            className={`drawer-side ${
              theme === "dark" ? "bg-teal-900" : "bg-teal-500"
            }`}
          >
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <ul className="menu min-h-full w-72 p-4 py-16 flex flex-col gap-4">
              <li>
                <Link to="/" className="flex items-center gap-2 text-sm">
                  <FiHome /> Home
                </Link>
              </li>
              <li>
                <Link
                  to="/apartment"
                  className="flex items-center gap-2 text-sm"
                >
                  <RiCommunityLine /> Apartment
                </Link>
              </li>
              {user && (
                <>
                  <li>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 text-sm"
                    >
                      <RiDashboardLine /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-sm"
                    >
                      <RiDashboardLine /> Logout
                    </button>
                  </li>
                </>
              )}
              {!user && (
                <li>
                  <Link to="/login" className="flex items-center gap-2 text-sm">
                    <FiLogIn /> Login
                  </Link>
                </li>
              )}
              <li>
                <button
                  className="flex items-center justify-center gap-2 w-full p-2"
                  onClick={() =>
                    (document.getElementById("my-drawer").checked = false)
                  }
                >
                  <FiXCircle /> Close
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block">
        <LgMenu />
      </div>
      <div className="block lg:hidden">
        <SmMenu />
      </div>
    </>
  );
};

export default Navbar;
