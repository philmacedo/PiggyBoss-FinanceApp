import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css";
import API from "../../api";
import logo from "../../assets/logo.png";
import FormField from "../../components/FormField";
import PinkButton from "../../components/PinkButton";


export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '',});
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await API["account"].post('/login/', formData);
        console.log('Login bem-sucedido:', response.data);
        localStorage.setItem('token', response.data.access);
        setSuccessMessage("Login bem-sucedido!");
        setError("")
        navigate('/');
      } 
      catch (err) {
        console.error(err);
        setError('Usuário ou senha inválidos.');
        setSuccessMessage('');
      }
  };

  const loginPage = (
    <div className="container">
      <div className="login-box">
        <img src={logo} alt="Logo" className="logo" />

        <h1>Piggy Boss</h1>

        <form onSubmit={handleSubmit}>

          <FormField
            name="email"
            label="E-mail"
            type="email" 
            value={formData.email}
            onChange=  {handleChange} 
            placeholder="Enter your e-mail" 
            required={true} 
          />

          <FormField
            name="password"
            label="Password"
            type="password" 
            value={formData.password}
            onChange=  {handleChange} 
            placeholder="Enter your password" 
            required={true} 
          />

          <PinkButton text="Sign in" />
        </form>

        <div className="register">
          <p>Não possui uma conta? <Link to="/register">Registre-se</Link></p>
        </div>

        {successMessage ? (
          <div className="success-message">
            <p>{successMessage}</p>
          </div>
      ) : error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
      )}

      </div>
    </div>
  );

  return loginPage
}
