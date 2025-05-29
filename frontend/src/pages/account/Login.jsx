import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Account.module.css"
import API from "../../api";
import logo from "../../assets/logo.png";
import FormField from "../../components/FormField";
import PinkButton from "../../components/PinkButton";
import DarkBox from "../../components/DarkBox";
import Message from "../../components/Message"; 

import { useLocation } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';


export default function Login() {
  useEffect(() => {
    document.title = "Login";
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const registrationMessage = location.state?.successMessage || '';
  
  const [formData, setFormData] = useState({ email: '', password: '',});
  const [error, setError] = useState('');

  const [successMessage, setSuccessMessage] = useState(registrationMessage);
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { login } = useAuth();

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await API["account"].post('/login/', formData);
        login(response.data.access);
        localStorage.setItem('token', response.data.access);
        navigate('/transactions');
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
    <div className={styles['account-page']}>
        <DarkBox width="20%" height="55%"  minwidth="280px" minheight="500px">

          <div style={{ height: '25%', margin: '5% 0 0 0' }}> 
            <img src={logo} alt="Logo" className={styles['logo']} />
          </div>

          <form onSubmit={handleSubmit} style={{ width: '100%', height: '55%'}}>
            <div className={styles['form-container']}>
              <FormField
                key="email"
                name="email"
                label="E-mail"
                type="email" 
                value={formData.email}
                onChange=  {handleChange} 
                placeholder="Enter your e-mail" 
                required={true}
                width="80%"
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
                width="80%"
              />

              <div style={{ width: "80%", textAlign: "center", marginBottom: "1rem" }}>
                <Link
                  to="/forgot-password"
                  style={{
                    textDecoration: "underline",
                    color: "inherit",
                    fontSize: "0.95rem",
                    cursor: "pointer"
                  }}
                >
                  Forgot password?
                </Link>
              </div>

              <PinkButton text="Sign in" width="35%" height="15%" />
              </div>
          </form>

          <div style={{ padding: "0.5rem 0 0 0", height: "10%" }}>
            <p>Don't have an account? <Link to="/register" style={{ textDecoration: 'underline', color: 'inherit' }} >Sign up</Link></p>
          </div>

          <Message message={error} type="error" style={{ height: '5%' }} />
        </DarkBox>
    </div>
  );

  return LOGIN_PAGE
}
