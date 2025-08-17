// CommonNavLinks.jsx (or inside Navbar.jsx)
import { Link } from "react-router";
import { FiHome, FiLogIn } from "react-icons/fi";
import { RiCommunityLine, RiDashboardLine } from "react-icons/ri";
import AccountMenu from "./AccountMenu";
import useUser from "../../hooks/useUser";
import { MdInfo } from "react-icons/md";

const CommonNavLinks = ({ onLinkClick, handleLogout }) => {
  const { user, userLoading } = useUser();
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
        <Link to="/about" className="flex items-center gap-2">
          <MdInfo />
          About
        </Link>
      </li>

      <li onClick={onLinkClick}>
        {userLoading && (
          <span className="loading loading-bars text-teal-300 loading-sm"></span>
        )}
        {user && <AccountMenu user={user} />}
        {!userLoading && !user && <Link to="/login"><FiLogIn />Login</Link>}
      </li>
    </>
  );
};

export default CommonNavLinks;
