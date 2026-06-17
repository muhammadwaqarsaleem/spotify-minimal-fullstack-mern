import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAlbums } from '../../services/musicService';

// AlbumList fetches and renders a list of album cards.
// It is used on both the home page and the albums page.
export default function AlbumList() {
  const [albums, setAlbums] = useState([]); // Store the returned album list.
  const [loading, setLoading] = useState(true); // Loading state while fetching.
  const [error, setError] = useState(''); // Error state when fetch fails.

  useEffect(() => {
    getAlbums()
      .then((response) => {
        setAlbums(response.data.albums || []); // Save albums from backend.
      })
      .catch((err) => {
        console.error('Failed to fetch albums:', err);
        setError('Could not load albums. Please refresh.');
      })
      .finally(() => {
        setLoading(false); // Stop the loading indicator.
      });
  }, []);

  if (loading) {
    return <div>Loading albums...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (albums.length === 0) {
    return <div>No albums available yet.</div>;
  }

  return (
    <div className="album-grid">
      {albums.map((album) => (
        <article key={album.id || album._id} className="album-card">
          <h3>{album.title}</h3>
          <p>Artist: {album.artist?.userName || album.artist?.email}</p>
          <Link to={`/albums/${album.id || album._id}`}>View details</Link>
        </article>
      ))}
    </div>
  );
}
