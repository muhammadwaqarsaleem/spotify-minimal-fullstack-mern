import axios from 'axios'; // package that allows frontend to access apis from the backend

// Create a reusable Axios instance that points to the backend API.
// This keeps our frontend HTTP calls consistent and centralized.
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Backend root for all API requests
  withCredentials: true, // Include cookies so the backend can read auth tokens
});

export default api; // Export the configured instance for use across the app
// All service files can import api instead of creating their own Axios call each time.
// We can make cookie-based auth work automatically when our backend returns JWT cookies.
