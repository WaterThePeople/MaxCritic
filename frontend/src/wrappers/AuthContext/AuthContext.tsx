import React, { createContext, useState, useEffect, ReactNode } from "react";
import { isAuthenticated, returnAccessToken } from "utils/Authentication";
import axios from "axios";
import { serverPath } from "BackendServerPath";

interface AuthContextType {
  isAuth: boolean | null;
  setIsAuth: (authStatus: boolean) => void;
  userData: any;
  setUserData: (userData: any) => void;
  isLoading: boolean | null;
  setIsLoading: (isLoading: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(true);

  const getUserData = async () => {
    setIsLoading(true);
    try {
      const { accessToken } = await returnAccessToken();
      if (accessToken) {
        const response = await axios.get(`${serverPath}api/user/info/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setUserData(response?.data);
        setIsLoading(false);
      } else {
        setUserData(null);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setUserData(null);
      setIsLoading(false);
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
      setIsLoading(false);
    }
  }, [isAuth]);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        userData,
        setUserData,
        isLoading,
        setIsLoading,
      }}
    >
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
