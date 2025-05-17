import axios from 'axios';

const API = {
  account: axios.create({baseURL: 'http://localhost:8000/account'}),
  finance: axios.create({baseURL: 'http://localhost:8000/finance'}),
} 

export default API;
