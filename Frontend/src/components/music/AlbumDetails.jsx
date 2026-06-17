import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAlbumById } from '../../services/musicService';

// AlbumDetails shows a single album with its track list.
// It uses the album ID from the route parameters.
export default function AlbumDetails() {
  const { albumId } = useParams(); // Read the album id from the URL.
  const [album, setAlbum] = useState(null); // Store the returned album.
  const [loading, setLoading] = useState(true); // Loading state while the request runs.
  const [error, setError] = useState(''); // Error message when request fails.

  useEffect(() => {
    getAlbumById(albumId)
      .then((response) => { // data body from backend
        setAlbum(response.data.album); // Save the album data from backend.
      })
      .catch((err) => {
        console.error('Failed to fetch album details:', err);
        setError('Album not found or could not be loaded.');
      })
      .finally(() => {
        setLoading(false); // Stop the loading indicator.
      });
  }, [albumId]);

  if (loading) {
    return <div>Loading album details...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!album) {
    return <div>No album data available.</div>;
  }

  return (
    <main className="album-details-page">
      <section className="album-summary">
        <h1>{album.title}</h1>
        <p>Artist: {album.artist?.userName || album.artist?.email}</p>
      </section>

      <section className="album-tracks">
        <h2>Track List</h2>
        {album.musics?.length > 0 ? (
          <ul>
            {album.musics.map((track) => (
              <li key={track.id || track._id} className="track-item">
                <div>
                  <strong>{track.title}</strong>
                  <p>Artist: {track.artist?.userName || track.artist?.email}</p>
                </div>
                <audio controls src={track.uri} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No tracks have been added to this album yet.</p>
        )}
      </section>
    </main>
  );
}
