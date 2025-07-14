import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const useUser = () => {
  const { user, userLoading } = useContext(AuthContext);

  return {
    userLoading: userLoading,
    user,
  };
};

export default useUser;
