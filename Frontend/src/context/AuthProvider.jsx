import React, { createContext, useContext, useState } from "react";
import cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const initialUserState = localStorage.getItem("ChatApp") || cookies.get("token");
  
  const [authUser, setAuthUser] = useState(
    initialUserState ? JSON.parse(initialUserState) : undefined
  );

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);