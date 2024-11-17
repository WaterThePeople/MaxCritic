// auth.ts
import axios from "axios";
import { serverPath } from "BackendServerPath";
const parseJwt = (token: string): { exp: number } | null => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to parse JWT", error);
    return null;
  }
};

const isTokenExpired = (token: string): boolean => {
  const decoded = parseJwt(token);
  if (!decoded) {
    return true;
  }
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};

const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

const getRefreshToken = (): string | null => {
  return localStorage.getItem("refreshToken");
};

const setAccessToken = (token: string): void => {
  localStorage.setItem("accessToken", token);
};

const refreshAccessToken = async (
  refreshToken: string
): Promise<string | null> => {
  try {
    const response = await axios.post(`${serverPath}/api/token/refresh/`, {
      refresh: refreshToken,
    });
    return response.data.access;
  } catch (error) {
    console.error("Failed to refresh access token", error);
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  const accessToken = getAccessToken();

  if (!accessToken || isTokenExpired(accessToken)) {
    const refreshToken = getRefreshToken();

    if (refreshToken && !isTokenExpired(refreshToken)) {
      refreshAccessToken(refreshToken).then((newAccessToken) => {
        if (newAccessToken) {
          setAccessToken(newAccessToken);
        }
      });
      return false;
    }

    return false;
  }

  return true;
};

export const returnAccessToken = async () => {
  try {
    const isAuth = await isAuthenticated();
    if (isAuth) {
      const accessToken = localStorage.getItem("accessToken");
      return { accessToken };
    } else {
      const accessToken = "";
      return { accessToken };
    }
  } catch (e) {
    console.error("Failed to fetch the tokens from storage", e);
    return { accessToken: null };
  }
};
