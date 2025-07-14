// CommonNavLinks.jsx (or inside Navbar.jsx)
import { Link } from "react-router";
import { FiHome, FiLogIn } from "react-icons/fi";
import { RiCommunityLine, RiDashboardLine } from "react-icons/ri";

const CommonNavLinks = ({ user, onLinkClick, handleLogout }) => {
  return (
    <>
      <li onClick={onLinkClick}>
        <Link to="/" className="flex items-center gap-2">
          <FiHome />
          Home
        </Link>
      </li>
      <li onClick={onLinkClick}>
        <Link to="/apartment" className="flex items-center gap-2">
          <RiCommunityLine />
          Apartment
        </Link>
      </li>
      <li onClick={onLinkClick}>
        <Link to="/dashboard" className="flex items-center gap-2">
          <RiDashboardLine />
          Dashboard
        </Link>
      </li>

      <li onClick={onLinkClick}>
        {user ? (
          <button onClick={handleLogout} className="flex items-center gap-2">
            <FiLogIn />
            Logout
          </button>
        ) : (
          <Link to="/login" className="flex items-center gap-2">
            <FiLogIn />
            Login
          </Link>
        )}
      </li>
    </>
  );
};

export default CommonNavLinks;
