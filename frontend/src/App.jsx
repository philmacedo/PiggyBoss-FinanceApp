import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.jsx'; 
import Footer from './components/Footer/Footer.jsx'; 
import HomePage from './pages/homepage/HomePage.jsx'; 
import Login from './pages/account/Login.jsx';
import Register from './pages/account/Register.jsx';

import './styles/App.css';

export default function App() {
  return (
    <Router>
      <div className="app-container"> {}
        <Header /> {}
        <main className="main-content"> {/* Conteúdo principal da página */}
          <Routes>
            <Route path="/" element={<HomePage />} /> {}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}