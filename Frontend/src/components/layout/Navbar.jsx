import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Navbar displays navigation links based on authentication state.
// It also allows a logged-in user to log out.
export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="app-navbar">
      {/* App brand/title on the left side */}
      <div className="brand">
        <Link to="/">Spotify Clone</Link>
      </div>

      {/* Navigation links that depend on auth state and user role */}
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/albums">Albums</Link>

        {/* Show artist-only link when an artist is logged in */}
        {user?.role === 'artist' && <Link to="/artist/upload">Upload</Link>}

        {/* Show login/register or profile/logout depending on auth */}
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <span className="user-label">{user.userName || user.email || user.role || 'Account'}</span>
            <button type="button" className="link-button" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}