// CommonNavLinks.jsx (or inside Navbar.jsx)
import { Link } from "react-router";
import { FiHome, FiLogIn } from "react-icons/fi";
import { RiCommunityLine, RiDashboardLine } from "react-icons/ri";
import AccountMenu from "./AccountMenu";

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
        {user ? (
          <AccountMenu user={user} />
        ) : (
          <Link to="/login">
            <FiLogIn />
            Login
          </Link>
        )}
      </li>
    </>
  );
};

export default CommonNavLinks;
