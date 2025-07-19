import useUser from "../../../hooks/useUser";
import NotFound from "../../NotFound/NotFound";

const MemberRoutes = ({ children }) => {
  const { userRole } = useUser();

  if (userRole === "member") {
    return children;
  }
  return <NotFound />;
};

export default MemberRoutes;
