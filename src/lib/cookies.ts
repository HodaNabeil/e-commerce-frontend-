import { User } from "firebase/auth";
import Cookies from "js-cookie";

// Cookie configuration
const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  secure: process.env.NODE_ENV === "production", // HTTPS only in production
  sameSite: "strict" as const,
  path: "/",
};

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const USER_DATA_KEY = "user_data";

export const authCookies = {
  // Access token management
  setAccessToken: (token: string) => {
    Cookies.set(ACCESS_TOKEN_KEY, token, COOKIE_OPTIONS);
  },

  getAccessToken: (): string | null => {
    return Cookies.get(ACCESS_TOKEN_KEY) || null;
  },

  removeAccessToken: () => {
    Cookies.remove(ACCESS_TOKEN_KEY, { path: "/" });
  },

  // Refresh token management
  setRefreshToken: (token: string) => {
    Cookies.set(REFRESH_TOKEN_KEY, token, COOKIE_OPTIONS);
  },

  getRefreshToken: (): string | null => {
    return Cookies.get(REFRESH_TOKEN_KEY) || null;
  },

  removeRefreshToken: () => {
    Cookies.remove(REFRESH_TOKEN_KEY, { path: "/" });
  },

  // Legacy token methods (for backward compatibility)
  setToken: (token: string) => {
    console.log("token", token);

    authCookies.setAccessToken(token);
  },

  getToken: (): string | null => {
    return authCookies.getAccessToken();
  },

  removeToken: () => {
    authCookies.removeAccessToken();
  },

  // User data management
  setUser: (user: User) => {
    try {
      const userData = JSON.stringify(user);
      Cookies.set(USER_DATA_KEY, userData, COOKIE_OPTIONS);
    } catch (error) {
      console.error("Failed to store user data in cookies:", error);
    }
  },

  getUser: (): User | null => {
    try {
      const userData = Cookies.get(USER_DATA_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Failed to parse user data from cookies:", error);
      // Clear invalid cookie data
      Cookies.remove(USER_DATA_KEY, { path: "/" });
      return null;
    }
  },

  removeUser: () => {
    Cookies.remove(USER_DATA_KEY, { path: "/" });
  },

  // Clear all auth cookies
  clearAll: () => {
    Cookies.remove(ACCESS_TOKEN_KEY, { path: "/" });
    Cookies.remove(REFRESH_TOKEN_KEY, { path: "/" });
    Cookies.remove(USER_DATA_KEY, { path: "/" });
  },

  // Check if authentication cookies exist
  hasAuthData: (): boolean => {
    const accessToken = Cookies.get(ACCESS_TOKEN_KEY);
    const userData = Cookies.get(USER_DATA_KEY);
    return !!(accessToken && userData);
  },

  // Get all auth data at once
  getAuthData: (): {
    accessToken: string | null;
    refreshToken: string | null;
    user: User | null;
    // Legacy compatibility
    token: string | null;
  } => {
    return {
      accessToken: authCookies.getAccessToken(),
      refreshToken: authCookies.getRefreshToken(),
      user: authCookies.getUser(),
      token: authCookies.getAccessToken(), // Legacy compatibility
    };
  },

  // Set all auth data at once
  setAuthData: (accessToken: string, refreshToken: string, user: User) => {
    authCookies.setAccessToken(accessToken);
    authCookies.setRefreshToken(refreshToken);
    authCookies.setUser(user);
  },

  // Set tokens only
  setTokens: (accessToken: string, refreshToken?: string) => {
    authCookies.setAccessToken(accessToken);
    if (refreshToken) {
      authCookies.setRefreshToken(refreshToken);
    }
  },

  // Get tokens only
  getTokens: (): {
    accessToken: string | null;
    refreshToken: string | null;
  } => {
    return {
      accessToken: authCookies.getAccessToken(),
      refreshToken: authCookies.getRefreshToken(),
    };
  },
};

// Utility for cookie-based persistence middleware
export const cookieStorage = {
  getItem: (name: string): string | null => {
    return Cookies.get(name) || null;
  },
  setItem: (name: string, value: string): void => {
    Cookies.set(name, value, COOKIE_OPTIONS);
  },
  removeItem: (name: string): void => {
    Cookies.remove(name, { path: "/" });
  },
};

// Enhanced storage for Zustand persist middleware
export const createCookieStorage = () => ({
  getItem: (name: string): Promise<string | null> => {
    try {
      const value = Cookies.get(name);
      return Promise.resolve(value || null);
    } catch (error) {
      console.error("Error reading from cookies:", error);
      return Promise.resolve(null);
    }
  },
  setItem: (name: string, value: string): Promise<void> => {
    try {
      Cookies.set(name, value, COOKIE_OPTIONS);
      return Promise.resolve();
    } catch (error) {
      console.error("Error writing to cookies:", error);
      return Promise.resolve();
    }
  },
  removeItem: (name: string): Promise<void> => {
    try {
      Cookies.remove(name, { path: "/" });
      return Promise.resolve();
    } catch (error) {
      console.error("Error removing from cookies:", error);
      return Promise.resolve();
    }
  },
});
