import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Account.module.css";
import API from "../../api";
import logo from "../../assets/logo.png";
import FormField from "../../components/FormField"; 
import PinkButton from "../../components/PinkButton";
import DarkBox from "../../components/DarkBox";
import Message from "../../components/Message";

export default function Register() {

  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    date_of_birth: '',
    password1: '',
    password2: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password1 !== formData.password2) {
      setError('Passwords do not match');
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
      const response = await API["account"].post('/register/', dataToSend);
      setError('');
      navigate('/');
      
    } catch (err) {
      if (err.response?.data){
        setError(Object.values(err.response.data).flat().join(' '));
      } else {
        setError('Erro no registro.');
      }
    }
  };

  const FIELDS = [
    { label: 'First Name', name: 'first_name', type: 'text', placeholder: 'Enter your first name', required: true },
    { label: 'Last Name', name: 'last_name', type: 'text', placeholder: 'Enter your last name', required: true },
    { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email', required: true },
    { label: 'Phone (optional)', name: 'phone_number', type: 'tel', placeholder: 'Enter your phone number' },
    { label: 'Date of Birth (optional)', name: 'date_of_birth', type: 'date' },
    { label: 'Password', name: 'password1', type: 'password', placeholder: 'Enter your password', required: true },
    { label: 'Confirm Password', name: 'password2', type: 'password', placeholder: 'Confirm your password', required: true },
  ];

  const REGISTER_PAGE = (
    <DarkBox>
      <img src={logo} alt="Logo" className={styles['logo']} />
      <form onSubmit={handleSubmit}>
        {FIELDS.map((field) => (
          <FormField
            key={field.name}
            name={field.name}
            label={field.label}
            type={field.type} 
            value={formData[field.name]}
            onChange={handleChange} 
            placeholder={field.placeholder}
            required={field.required} 
          />
        ))}
        <PinkButton text="Sign up"/>
      </form>

      <div className={styles["p-link"]}>
        <p>Already have an account? <Link to="/">Sign in</Link></p>
      </div>

      {error && (<Message message={error} type="error" />)}

    </DarkBox>
  )

  return REGISTER_PAGE
}
