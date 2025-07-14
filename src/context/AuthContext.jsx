import React, { createContext, useEffect, useState } from "react";
import auth from "../firebase.init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userLoading, setUserLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUserLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUserLoading(false);
      } else {
        setUser(null);
        setUserLoading(false);
      }
    });
  }, []);

  const emailSignIn = ({ email, password }) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUser = ({ photoURL }) => {
    return updateProfile(auth.currentUser, {
      photoURL,
    });
  };

  const loginWithEmailAndPassword = ({email, password}) => {
    return signInWithEmailAndPassword(auth, email, password)
  };

  const userInfo = {
    user,
    setUser,
    userLoading,
    emailSignIn,
    updateUser,

    loginWithEmailAndPassword,

  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
