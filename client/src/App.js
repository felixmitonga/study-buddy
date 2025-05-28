import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/Layout/PrivateRoute';
import Navbar from './components/Layout/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/Dashboard/Profile';
import Matches from './components/Dashboard/Matches';
import Messages from './components/Dashboard/Messages';
import './styles/global.css';

/**
 * Main application component that sets up routing and authentication
 * Wraps all routes with AuthProvider for authentication context
 * Uses PrivateRoute for protected dashboard routes
 */
function App() {
  return (
    <Router>
      {/* Provides authentication context to all child components */}
      <AuthProvider>
        {/* Navigation bar visible on all pages */}
        <Navbar />
        
        {/* Application route configuration */}
        <Routes>
          {/* Public routes (accessible without authentication) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected dashboard routes (requires authentication) */}
          <Route 
            path="/dashboard/profile" 
            element={<PrivateRoute><Profile /></PrivateRoute>} 
          />
          <Route 
            path="/dashboard/matches" 
            element={<PrivateRoute><Matches /></PrivateRoute>} 
          />
          <Route 
            path="/dashboard/messages" 
            element={<PrivateRoute><Messages /></PrivateRoute>} 
          />
          
          {/* Catch-all route that redirects to profile by default */}
          <Route 
            path="*" 
            element={<PrivateRoute><Profile /></PrivateRoute>} 
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
