import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.username.trim() === '' || formData.password.trim() === '') {
      setError('Usuário ou senha inválidos.');
    } else {
      setError('');
      console.log("Login realizado:", formData);
      // Aqui você poderá redirecionar ou autenticar de verdade futuramente
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <h1>Piggy Boss</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Usuário</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Digite seu usuário"
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

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
