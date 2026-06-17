import api from './api';

// Service wrapper for music and album API calls.
// These functions keep the frontend UI components focused on rendering,
// while this file handles all HTTP request details.

// Fetch the list of all available music items from the backend.
export function getMusics() {
  return api.get('/music');
}

// Fetch the list of all available albums from the backend.
export function getAlbums() {
  return api.get('/music/albums');
}

// Fetch a single album by its id.
// `albumId` is the backend document ID of the requested album.
export function getAlbumById(albumId) {
  return api.get(`/music/albums/${albumId}`);
}

// Upload a new music track as an artist.
// `formData` must be a FormData object containing the track file and title.
export function uploadMusic(formData) {
  return api.post('/music/upload', formData);
}

// Create a new album as an artist.
// `payload` should include title and musics array of music IDs.
export function createAlbum(payload) {
  return api.post('/music/album', payload);
}
