import { useState } from 'react';
import { uploadMusic } from '../../services/musicService';

// ArtistUpload provides an interface for artists to upload new music tracks.
export default function ArtistUpload() {
  const [title, setTitle] = useState(''); // Track title input state.
  const [file, setFile] = useState(null); // Uploaded file object.
  const [message, setMessage] = useState(''); // Success or error message.
  const [loading, setLoading] = useState(false); // Loading state during upload.

  // Called when the file input changes.
  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Save the first selected file.
  };

  // Called when the upload form is submitted.
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent browser reload.
    setMessage(''); // Clear previous messages.

    if (!title || !file) {
      setMessage('Please provide both a title and a music file.');
      return;
    }

    const formData = new FormData(); // Create a FormData object for file upload.
    formData.append('title', title); // Append the title field.
    formData.append('music', file); // Append the file under the "music" key.

    setLoading(true);

    try {
      await uploadMusic(formData); // Send the upload request.
      setMessage('Music uploaded successfully!');
      setTitle('');
      setFile(null);
      event.target.reset(); // Reset the form fields.
    } catch (error) {
      console.error('Upload error:', error);
      setMessage('Failed to upload music. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="artist-upload-page">
      <h1>Upload New Music</h1>
      <form onSubmit={handleSubmit} className="upload-form">
        <label>
          Track Title
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter the track title"
            required
          />
        </label>

        <label>
          Choose Music File
          <input type="file" accept="audio/*" onChange={handleFileChange} required />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Uploading…' : 'Upload Music'}
        </button>

        {message && <p className="form-message">{message}</p>}
      </form>
    </main>
  );
}
