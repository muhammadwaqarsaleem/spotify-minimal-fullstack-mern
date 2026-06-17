import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';

// Register page component.
// This renders a signup form and sends new user data to the backend.
export default function Register() {
  const [userName, setUserName] = useState(''); // Input state for username.
  const [email, setEmail] = useState(''); // Input state for email.
  const [password, setPassword] = useState(''); // Input state for password.
  const [role, setRole] = useState('user'); // Input state for user role.
  const [error, setError] = useState(''); // Error message shown when registration fails.
  const navigate = useNavigate(); // Hook for programmatic navigation.
  const { setUser } = useAuth(); // Get auth setter from context.

  // Called when the user submits the signup form.
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior.
    setError(''); // Reset any previous error.

    try {
      // Send register request to the backend.
      const response = await register({ userName, email, password, role });

      // If registration succeeds, backend returns the created user.
      setUser(response.data.user);
      navigate('/'); // Redirect to the home page after successful registration.
    } catch (err) {
      // Show a friendly error message when registration fails.
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <main className="auth-page">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          Username
          <input
            type="text"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            placeholder="Enter a username"
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter a strong password"
            required
          />
        </label>

        <label>
          Account Type
          <select value={role} onChange={(event) => setRole(event.target.value)}>
            <option value="user">User</option>
            <option value="artist">Artist</option>
          </select>
        </label>

        {error && <p className="form-error">{error}</p>}

        <button type="submit">Register</button>
      </form>
    </main>
  );
}