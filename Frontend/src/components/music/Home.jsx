import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import MusicList from './MusicList';
import AlbumList from './AlbumList';

// Home page component for the app.
// This page provides a welcome message and includes the main music and album sections.
export default function Home() {
  const { user } = useAuth(); // Get the current authenticated user from context.

  return (
    <main className="home-page">
      {/* Hero section with user-specific greeting. */}
      <section className="home-hero">
        <h1>Welcome to the Spotify Clone</h1>
        <p>
          Discover music, explore albums, and manage your artist uploads in one place.
        </p>

        {/* If a user is logged in, personalize the greeting. */}
        {user ? (
          <p className="welcome-text">
            Logged in as {user.userName || user.email || user.role || 'your account'}
          </p>
        ) : (
          <div className="auth-links">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}

        {/* If the logged-in user is an artist, show the upload action. */}
        {user?.role === 'artist' && (
          <Link className="primary-button" to="/artist/upload">
            Upload New Music
          </Link>
        )}
      </section>

      {/* Music discovery section. */}
      <section className="home-section">
        <h2>Latest Music</h2>
        <MusicList />
      </section>

      {/* Album discovery section. */}
      <section className="home-section">
        <div className="section-header">
          <h2>Popular Albums</h2>
          <Link to="/albums">View all albums</Link>
        </div>
        <AlbumList />
      </section>
    </main>
  );
}
