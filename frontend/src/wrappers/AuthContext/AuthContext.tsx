import React, { createContext, useState, useEffect, ReactNode } from "react";
import { isAuthenticated, returnAccessToken } from "utils/Authentication";
import axios from "axios";
import { serverPath } from "BackendServerPath";

interface AuthContextType {
  isAuth: boolean;
  setIsAuth: (authStatus: boolean) => void;
  userData: any;
  setUserData: (userData: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);

  const getUserData = async () => {
    try {
      const { accessToken } = await returnAccessToken();
      if (accessToken) {
        const response = await axios.get(`${serverPath}api/user/info/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setUserData(response?.data);
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setUserData(null);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const userAuthenticated = await isAuthenticated();
      setIsAuth(userAuthenticated);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuth) {
      getUserData();
    } else {
      setUserData(null);
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
