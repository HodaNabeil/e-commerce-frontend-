import {
  useUser,
  useIsAuthenticated,
  useIsLoading,
  useLogin,
  useSignup,
  useLogout,
  useSetUser,
  //   useLoadUser,
} from "@/features/auth/store/store";

// Main authentication hook that combines all the functionality
export function useAuth() {
  const user = useUser();
  const isAuthenticated = useIsAuthenticated();
  const isLoading = useIsLoading();
  const login = useLogin();
  const signup = useSignup();
  const logout = useLogout();
  const setUser = useSetUser();

  // const loadUser = useLoadUser();
  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    setUser,
    // loadUser,
  };
}
