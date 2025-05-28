// Import required React hooks and routing utilities
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Import authentication service functions with renamed imports to avoid naming conflicts
import { login as authLogin, register as authRegister, getCurrentUser } from '../services/auth';

// Create a new React context for authentication
// This will allow us to share auth state across components
const AuthContext = createContext();

// AuthProvider component that will wrap our application
// This manages all authentication state and provides it to child components
export const AuthProvider = ({ children }) => {
  // State to track the current authenticated user (null if not logged in)
  const [user, setUser] = useState(null);
  // State to track if we're loading the initial auth check
  const [loading, setLoading] = useState(true);
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Effect hook runs once when component mounts
  useEffect(() => {
    // Async function to check if user is already authenticated
    const checkAuth = async () => {
      try {
        // Try to fetch current user data from backend
        const user = await getCurrentUser();
        setUser(user); // If successful, set user in state
      } catch (err) {
        // If error (not authenticated), clear user
        setUser(null);
      } finally {
        // Regardless of success/failure, mark loading as complete
        setLoading(false);
      }
    };

    // Execute the auth check
    checkAuth();
  }, []); // Empty dependency array means this runs only once on mount

  // Login function - handles user authentication
  const login = async (email, password) => {
    try {
      // Call auth service to perform login
      const { user, token } = await authLogin(email, password);
      // Store the authentication token in localStorage
      localStorage.setItem('token', token);
      // Update user state
      setUser(user);
      // Redirect to dashboard after successful login
      navigate('/dashboard');
    } catch (err) {
      // If login fails, re-throw the error to be handled by the calling component
      throw err;
    }
  };

  // Registration function - handles new user signup
  const register = async (name, email, password, university, major, year) => {
    try {
      // Call auth service to register new user
      const { user, token } = await authRegister(name, email, password, university, major, year);
      // Store the authentication token
      localStorage.setItem('token', token);
      // Update user state
      setUser(user);
      // Redirect to profile setup after registration
      navigate('/dashboard/profile');
    } catch (err) {
      // If registration fails, re-throw the error
      throw err;
    }
  };

  // Logout function - clears authentication
  const logout = () => {
    // Remove the authentication token
    localStorage.removeItem('token');
    // Clear user state
    setUser(null);
    // Redirect to login page
    navigate('/login');
  };

  // Render the AuthContext provider with all our values
  return (
    <AuthContext.Provider 
      value={{ 
        user,       // Current user object
        loading,    // Loading state
        login,      // Login function
        register,   // Registration function
        logout      // Logout function
      }}
    >
      {/* Only render children when initial auth check is complete */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily access auth context
// Usage: const { user, login } = useAuth();
export const useAuth = () => useContext(AuthContext);
