import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const useUser = () => {
  const { userInfo } = useContext(AuthContext);

  return {
    userLoading: userInfo.userLoading,
    user: userInfo.user,
  };
};

export default useUser;
