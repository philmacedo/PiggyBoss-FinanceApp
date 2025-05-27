import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/account/Login.jsx';
import Register from './pages/account/Register.jsx';
import NavBar from './components/NavBar.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import './styles/App.css';

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

