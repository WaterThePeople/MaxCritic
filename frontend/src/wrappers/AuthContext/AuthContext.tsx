import React, { createContext, useState, useEffect, ReactNode } from "react";
import { isAuthenticated } from "utils/Authentication";
import axios from "axios";
import { serverPath } from "BackendServerPath";
import { returnAccessToken } from "utils/Authentication";

interface AuthContextType {
  isAuth: boolean;
  setIsAuth: (authStatus: boolean) => void;
  userData: any;
  setUserData: (authStatus: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>();

  const getUserData = async () => {
    const { accessToken } = await returnAccessToken();
    axios
      .get(`${serverPath}api/user/info/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setUserData(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const userAuthenticated = isAuthenticated();
    setIsAuth(userAuthenticated);
  }, []);

  useEffect(() => {
    if (isAuth) {
      getUserData();
    }
  }, [isAuth]);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
