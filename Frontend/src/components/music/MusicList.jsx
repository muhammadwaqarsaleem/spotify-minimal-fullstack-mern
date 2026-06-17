import { useEffect, useState } from 'react';
import { getMusics } from '../../services/musicService';

// MusicList fetches and renders a list of music tracks.
// It is used on the home page to display a preview of available music.
export default function MusicList() {
  const [musics, setMusics] = useState([]); // Store the fetched music list.
  const [loading, setLoading] = useState(true); // Loading flag while the request is in progress.
  const [error, setError] = useState(''); // Error message when the request fails.

  useEffect(() => {
    // Load musics from the backend when the component mounts.
    getMusics()
      .then((response) => {
        setMusics(response.data.musics || []); // Save the returned music data.
      })
      .catch((err) => {
        console.error('Failed to fetch musics:', err);
        setError('Could not load music. Please refresh the page.');
      })
      .finally(() => {
        setLoading(false); // Stop showing the loading state.
      });
  }, []);

  if (loading) {
    return <div>Loading music...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (musics.length === 0) {
    return <div>No music available yet.</div>;
  }

  return (
    <div className="music-grid">
      {musics.map((music) => (
        <article key={music.id || music._id} className="music-card">
          <h3>{music.title}</h3>
          <p>Artist: {music.artist?.userName || music.artist?.email}</p>
          <audio controls src={music.uri} />
        </article>
      ))}
    </div>
  );
}
