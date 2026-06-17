import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, logout as logoutApi } from '../services/authService';

// Create a context object that will hold authenticated user state.
const AuthContext = createContext(null);

// AuthProvider wraps the application and provides auth state to the whole tree.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Store the current user object
  const [loading, setLoading] = useState(true); // Track whether auth state is loading

  useEffect(() => {
    // When the app starts, ask the backend who is currently logged in.
    getCurrentUser()
      .then((response) => {
        const currentUser = response.data?.user ?? null;
        setUser(currentUser); // Set user if authenticated, or null if not.
        console.log('User fetched successfully from Backend:', currentUser);
      })
      .catch((error) => {
        console.error('Failed to fetch authenticated user:', error);
        setUser(null);
      })
      .finally(() => {
        setLoading(false); // Auth check is complete.
      });
  }, []);

  // Sign out the current user by calling the backend logout endpoint.
  const logout = async () => {
    try {
      await logoutApi();
      setUser(null); // Clear local auth state after successful logout.
      console.log("Logged out successfully!");
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  // Provide auth state and helpers to the app.
  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook that components can use to access auth state.
export function useAuth() {
  return useContext(AuthContext);
}
