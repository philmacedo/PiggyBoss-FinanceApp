import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/account', // ajuste se mudar
});

// Enviar token JWT depois (ex: API.defaults.headers.common['Authorization'] = `Bearer ${token}`);

export default API;
