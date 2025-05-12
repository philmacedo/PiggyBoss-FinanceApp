import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // ou pode até não ter nada dentro
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
