import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/register.css"; // Estilização específica do registro
import API from "../api";
import logo from "../assets/logo.png";


function Register() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    date_of_birth: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password1 !== formData.password2) {
      setError('As senhas não coincidem.');
      return;
    }
    try {
      const dataToSend = { 
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password1,
        phone_number: formData.phone_number || null,
        date_of_birth: formData.date_of_birth || null
      };
      const response = await API.post('/register/', dataToSend);
      console.log('Cadastro feito com sucesso:', response.data);
      setMessages(['Cadastro realizado com sucesso!']);
      setError('');
      // talvez redirecionar para login
    } catch (err) {
      console.error(err.response);
      if (err.response?.data){
        setError(Object.values(err.response.data).flat().join(' '));
      } else {
        setError('Erro no registro.');
      }
    }
  };

    return (
    <div className="container">
      <div className="register-box">
        <img src={logo} alt="Logo" className="logo" />
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
            <label htmlFor="phone_number">Telefone (opcional)</label>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="Digite seu telefone"
            />
          </div>
          <div className="input-group">
            <label htmlFor="date_of_birth">Data de nascimento (opcional)</label>
            <input
              type="date"
              id="date_of_birth"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
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
