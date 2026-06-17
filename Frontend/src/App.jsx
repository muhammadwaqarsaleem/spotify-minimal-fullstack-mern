import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Home from './components/music/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AlbumList from './components/music/AlbumList';
import AlbumDetails from './components/music/AlbumDetails';
import ArtistUpload from './components/music/ArtistUpload';
import './App.css';

function App() {
  return (
    // AuthProvider makes auth state available to every component.
    <AuthProvider>
      {/* BrowserRouter enables client-side routing in React. */}
      <BrowserRouter>
        <Navbar />

        {/* Define the route structure for the app. */}
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected music pages only available to authenticated users */}
          <Route
            path="/albums"
            element={
              <ProtectedRoute>
                <AlbumList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/albums/:albumId"
            element={
              <ProtectedRoute>
                <AlbumDetails />
              </ProtectedRoute>
            }
          />

          {/* Artist-only upload page */}
          <Route
            path="/artist/upload"
            element={
              <ProtectedRoute role="artist">
                <ArtistUpload />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
