import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const useUser = () => {
  const { user, userLoading, userRole, setUserRole } = useContext(AuthContext);

  return {
    userLoading: userLoading,
    user,
    userRole,
    setUserRole,
  };
};

export default useUser;
