// keeps authentication calls centralized
import api from './api'; // Go 1 step up, then come 1 down to api file

// Service wrapper for authentication-related API calls.
// This keeps login/register/logout logic reusable and separate from UI components.

// Register a new user or artist on the backend.
// `payload` should contain userName, email, password, and role.
export function register(payload) {
  return api.post('/auth/register', payload);
}

// Log in an existing user or artist.
// `payload` should contain userName or email, and password.
export function login(payload) {
  return api.post('/auth/login', payload);
}

// Log out the currently authenticated user.
export function logout() {
  return api.post('/auth/logout');
}

// Fetch the currently authenticated user based on the auth cookie.
export function getCurrentUser() {
  return api.get('/auth/me');
}
