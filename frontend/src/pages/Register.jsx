import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/register.css"; // Estilização específica do registro

function Register() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password1: '',
    password2: '',
  });
  const [error, setError] = useState('');
  const [messages, setMessages] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulando uma verificação simples
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.password1 || !formData.password2) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    if (formData.password1 !== formData.password2) {
      setError('As senhas não coincidem.');
      return;
    }

    // Depois aqui faria uma requisição real para o backend
    console.log("Dados cadastrados:", formData);

    // Simular sucesso
    setError('');
    setMessages(["Registro realizado com sucesso!"]);
  };

  return (
    <div className="container">
      <div className="register-box">
        <h1>Cadastre-se</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="first_name">Nome</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="Digite seu nome"
            />
          </div>
          <div className="input-group">
            <label htmlFor="last_name">Sobrenome</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Digite seu sobrenome"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite seu e-mail"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password1">Senha</label>
            <input
              type="password"
              id="password1"
              name="password1"
              value={formData.password1}
              onChange={handleChange}
              placeholder="Digite sua senha"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password2">Confirme a senha</label>
            <input
              type="password"
              id="password2"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              placeholder="Confirme sua senha"
            />
          </div>
          <button type="submit" className="btn">Registrar</button>
        </form>

        <div className="register">
          <p>Já tem uma conta? <Link to="/">Faça login</Link></p>
        </div>

        {error && (
          <div className="card">
            <p>{error}</p>
          </div>
        )}

        {messages.length > 0 && messages.map((message, index) => (
          <div key={index} className="card">
            <p>{message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Register;
