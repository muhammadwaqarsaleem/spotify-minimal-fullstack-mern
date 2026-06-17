import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// ProtectedRoute wraps pages that require authentication.
// It optionally checks user role before rendering the requested page.
export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  // While the auth state is being fetched, show a loading placeholder.
  if (loading) {
    return <div>Loading authentication...</div>;
  }

  // If no user is authenticated, redirect to the login page.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If a role is required and the current user does not have it, redirect home.
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // If checks pass, render the protected child route.
  return children;
}
