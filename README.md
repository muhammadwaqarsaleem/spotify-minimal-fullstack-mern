# Spotify Project

**Spotify Project** is a professional full-stack application that combines secure authentication, music management, and modern frontend experience. It is built with a Node.js and Express backend, MongoDB for data storage, and a React frontend powered by Vite.

## Key Features

- **User authentication** with secure **register** and **login** flows
- **Password hashing** using industry-standard encryption techniques
- **Token-based authorization** for protected routes
- **Role-aware access control** for artists and regular users
- **Music and album management** APIs for uploading and listing tracks
- **Modern React UI** with protected routes and user context management
- **Structured backend architecture** with controllers, services, and middleware

## Backend

The backend is implemented with:

- `Node.js`
- `Express`
- `MongoDB`
- `Mongoose`

### Backend responsibilities

- Register new users with hashed passwords
- Authenticate users and issue access tokens
- Verify user tokens for protected API endpoints
- Manage music and album metadata
- Persist user, music, and album data in a MongoDB database

### Backend structure

- `server.js` — application entry point
- `src/app.js` — Express app configuration and middleware setup
- `src/controllers/` — authentication and music controllers
- `src/middlewares/` — authentication middleware
- `src/models/` — MongoDB schemas for users, music, and albums
- `src/routes/` — backend API routes
- `src/services/` — storage and helper services

## Frontend

The frontend is built with:

- `React` + `Vite`
- `React Router`
- Context-based authentication state

### Frontend responsibilities

- Provide a responsive user interface for authentication
- Enable users to register and log in securely
- Protect private pages using route guards
- Display music and album collections dynamically
- Allow authenticated users to interact with backend APIs

### Frontend structure

- `src/components/auth/` — login and registration pages
- `src/components/layout/` — navigation and protected route handling
- `src/components/music/` — music, album, and upload views
- `src/contexts/AuthContext.jsx` — authentication state management
- `src/services/` — API integration utilities

## Authentication & Security

Security is a key part of this project:

- **Password hashing** ensures user credentials are never stored in plain text
- **Token-based authentication** protects private endpoints
- **Middleware** verifies user sessions before allowing access to sensitive routes

## Getting Started

### Backend

1. Navigate to the backend folder:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

### Frontend

1. Navigate to the frontend folder:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Why this project

This project is an excellent example of a **full-stack application** that integrates secure backend authentication, efficient API design, and a polished React-based user experience. It demonstrates how to build a production-minded app with clean separation of concerns between frontend and backend responsibilities.

## License

This project is licensed under the terms defined in `LICENSE`.
