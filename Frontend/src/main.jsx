// Import React strict mode to activate additional checks during development.
import { StrictMode } from 'react';

// Import the React DOM client to render the app into the HTML page.
import { createRoot } from 'react-dom/client';

// Import global CSS styles for the entire application.
import './index.css';

// Import the root app component that contains routing and page layout.
import App from './App.jsx';

// Find the root HTML element where the React app will be mounted.
const rootElement = document.getElementById('root');

// Create a React root for concurrent rendering.
const root = createRoot(rootElement);

// Render the App component inside StrictMode to enable additional runtime checks.
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
