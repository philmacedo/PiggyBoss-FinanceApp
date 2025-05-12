// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
// Você pode importar outras páginas depois, tipo:
import Register from './pages/Register.jsx';
import './App.css'; // Opcional: se quiser estilização global

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota principal para login */}
        <Route path="/" element={<Login />} />
        
        {/* Exemplo para futura página de registro */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

