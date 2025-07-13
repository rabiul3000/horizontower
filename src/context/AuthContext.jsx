import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userLoading, setUserLoading] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "email@gmail.com",
    role: "user",
  });

  const userInfo = {
    user: null,
    userLoading,
  };

  return (
    <AuthContext.Provider value={{ userInfo }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
