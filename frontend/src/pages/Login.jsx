import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";
import API from "../api";
import logo from "../assets/logo.png";



function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
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
        const response = await API.post('/login/', formData); //envia email e password
        console.log('Login bem-sucedido:', response.data);
        localStorage.setItem('token', response.data.access); // salvar o token se precisar
        setSuccessMessage("Login bem-sucedido!");
        setError("") // limpa mensagem de erro, caso tenha
      // redirecionar o usuário
      } catch (err) {
        console.error(err);
        setError('Usuário ou senha inválidos.');
        setSuccessMessage('');
      }
  };

  return (
    <div className="container">
      <div className="login-box">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Piggy Boss</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Usuário</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite seu email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Digite sua senha"
              required
            />
          </div>
          <button type="submit" className="btn">Entrar</button>
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
}

export default Login;
