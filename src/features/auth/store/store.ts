"use client";

import { create } from "zustand";
import type { LoginRequest, SignupRequest, AuthResponse } from "@/types/user";
import { AuthService } from "@/lib/auth";
import { User } from "firebase/auth";
import { authCookies } from "@/lib/cookies";

interface AuthState {
  // State
  user: User | null;

  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  login: (credentials: LoginRequest) => Promise<AuthResponse>;
  signup: (userData: SignupRequest) => Promise<AuthResponse>;
  logout: () => Promise<void>;
}

// Initialize authentication state from cookies
const initializeAuthState = () => {
  return {
    user: null,
    isLoading: false,
    isAuthenticated: Boolean(false),
  };
};
export const useAuthStore = create<AuthState>()((set) => ({
  // Initial state
  ...initializeAuthState(),
  // Actions
  setUser: (user) =>
    set(() => ({
      user,
      isAuthenticated: !!user,
    })),

  setLoading: (loading) =>
    set(() => ({
      isLoading: loading,
    })),

  login: async (credentials) => {
    set(() => ({ isLoading: true }));

    try {
      const user = await AuthService.login(
        credentials.email,
        credentials.password
      );
      const idToken = await user.getIdToken();

      set(() => ({
        user,
        isAuthenticated: true,
        isLoading: false,
      }));
      // Store in cookies
      authCookies.setAccessToken(idToken);
      return { user };
    } catch (error) {
      set(() => ({ isLoading: false }));
      throw error;
    }
  },

  signup: async (userData) => {
    set(() => ({ isLoading: true }));

    try {
      const user = await AuthService.signUp(userData.email, userData.password);
      const idToken = await user.getIdToken();

      set(() => ({
        user: user,
        isAuthenticated: true,
        isLoading: false,
      }));

      // Store access token in cookies
      authCookies.setAccessToken(idToken);
      return { user };
    } catch (error) {
      set(() => ({ isLoading: false }));
      throw error;
    }
  },

  logout: async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      // Clear state regardless of API success
      set(() => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      }));

      // Clear cookies
      authCookies.clearAll();

      // Redirect to login
      // window.location.href = `/${Routes.AUTH}/${Pages.SIGNIN}`;
    }
  },

  clearAuth: () => {
    set(() => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
    }));

    // Clear cookies
    authCookies.clearAll();
  },
}));

// Selectors for specific state slices
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
export const useIsLoading = () => useAuthStore((state) => state.isLoading);

// Individual action selectors - more stable than returning an object
export const useLogin = () => useAuthStore((state) => state.login);
export const useSignup = () => useAuthStore((state) => state.signup);
export const useLogout = () => useAuthStore((state) => state.logout);
export const useSetUser = () => useAuthStore((state) => state.setUser);
