import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Account.module.css"
import API from "../../api";
import logo from "../../assets/logo.png";
import FormField from "../../components/FormField";
import PinkButton from "../../components/PinkButton";
import DarkBox from "../../components/DarkBox";
import Message from "../../components/Message"; 

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '',});
  const [error, setError] = useState('');

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
        localStorage.setItem('token', response.data.access);
        navigate('/');
      } 
      catch (err) {
        console.log(err.response?.data)
        if (err.response?.data){
          setError(Object.values(err.response.data).flat().join(' '));
        } else {
          setError('Erro no registro.');
        }
      }
  };

  const LOGIN_PAGE = (
      <DarkBox>
        <img src={logo} alt="Logo" className={styles['logo']} />
        <form onSubmit={handleSubmit} style={{ width: '100%'}}>

          <FormField
            key="email"
            name="email"
            label="E-mail"
            type="email" 
            value={formData.email}
            onChange=  {handleChange} 
            placeholder="Enter your e-mail" 
            required={true} 
          />

          <FormField
            key="password"
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

        <div className={styles["p-link"]}>
          <p>Don't have an account? <Link to="/register">Sign up</Link></p>
        </div>

        { error && (<Message message={error} type="error" />) }
      </DarkBox>
  );

  return LOGIN_PAGE
}
