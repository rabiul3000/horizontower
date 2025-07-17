import useUser from "../../../hooks/useUser";
import AdminProfile from "../admin/AdminProfile";
import MemberProfile from "../member/MemberProfile";

const ProtectedProfileRoute = ({ children }) => {
  const { userRole } = useUser();
  if (userRole === "admin") {
    return <AdminProfile />;
  }
  if (userRole === "member") {
    return <MemberProfile />;
  }
  return children;
};

export default ProtectedProfileRoute;
