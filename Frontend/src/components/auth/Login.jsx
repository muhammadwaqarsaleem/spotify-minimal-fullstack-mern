import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';

// Login page component.
// This renders a login form and sends credentials to the backend.
export default function Login() {
  const [userNameOrEmail, setUserNameOrEmail] = useState(''); // Input state for username or email.
  const [password, setPassword] = useState(''); // Input state for password.
  const [error, setError] = useState(''); // Error message shown when login fails.
  const navigate = useNavigate(); // Hook for programmatic navigation.
  const { setUser } = useAuth(); // Get auth setter from context.

  // Called when the user submits the login form.
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page refresh on submit.
    setError(''); // Reset any previous error.

    try {
      // Send login request to the backend.
      const response = await login({
        userName: userNameOrEmail,
        email: userNameOrEmail,
        password,
      });

      // If login succeeds, backend returns the authenticated user.
      setUser(response.data.user);
      navigate('/'); // Redirect to the home page after login.
    } catch (err) {
      // Show a friendly error message when login fails.
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <main className="auth-page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          Username or Email
          <input
            type="text"
            value={userNameOrEmail}
            onChange={(event) => setUserNameOrEmail(event.target.value)}
            placeholder="Enter username or email"
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            required
          />
        </label>

        {error && <p className="form-error">{error}</p>}

        <button type="submit">Login</button>
      </form>
    </main>
  );
}