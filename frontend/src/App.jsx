import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/account/Login.jsx';
import Register from './pages/account/Register.jsx';
import NavBar from './components/NavBar.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import './styles/App.css';
import ForgotPassword from "./pages/account/ForgotPassword";
import Transactions from './pages/finance/Transactions.jsx';

import { AuthProvider } from './context/AuthContext';
import CardsAndBanks from './pages/finance/CardsAndBanks.jsx';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/cardsandbanks" element={<CardsAndBanks /> } />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </AuthProvider>
    </Router>
  );

}

