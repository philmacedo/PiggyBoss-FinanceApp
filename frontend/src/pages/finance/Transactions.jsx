import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api";
import styles from "./Transactions.module.css";
import logo from "../../assets/logo.png";

import DarkBox from "../../components/DarkBox";
import FormField from "../../components/FormField";
import PinkButton from "../../components/PinkButton";
import Message from "../../components/Message";

export default function Transactions() {

  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [categories, setCategories] = useState([]);
  const [cards, setCards] = useState([]);
  const [banks, setBanks] = useState([]);
  const [thirds, setThirds] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    transactions_type: '',
    category: '',
    date: '',
    payment_method: '',
    card: '',
    bank: '',
    third: '',
    description: ''
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Você precisa estar logado para acessar esta página.");
      navigate("/");
      return;
    }

    document.title = "Transactions";
    fetchTransactions();
    fetchOptions();
  }, []);

  const fetchTransactions = async () => {

    try {
      const token = localStorage.getItem("token");
      const response = await API["main"].get("/transactions/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(response.data);
      setError('');
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Sessão expirada. Faça login novamente.");
        navigate("/login");
      } else if (err.response?.data) {
        setError(Object.values(err.response.data).flat().join(' '));
      } 
    }
  };

  const fetchOptions = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const [catRes, cardRes, bankRes, thirdRes] = await Promise.all([
        API["main"].get("/category/", config),
        API["main"].get("/card/", config),
        API["main"].get("/bank_account/", config),
        API["main"].get("/third/", config),
      ]);

      setCategories(catRes.data);
      setCards(cardRes.data);
      setBanks(bankRes.data);
      setThirds(thirdRes.data);

    } catch (err) {
      if (err.response?.status === 401) {
        setError("Sessão expirada. Faça login novamente.");
        navigate("/login");
      } else if (err.response?.data) {
        setError(Object.values(err.response.data).flat().join(' '));
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ['name', 'amount', 'transactions_type', 'date', 'payment_method'];
    const isValid = requiredFields.every(field => formData[field].trim() !== '');
    if (!isValid) {
      setError('Please fill in all the fields correctly.');
      setSuccess('');
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await API["main"].post("/transactions/", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Transaction added successfully!');
      setError('');
      setFormData({ name: '', amount: '', transactions_type: '', category: '', date: '', payment_method: '',
                  card: '', bank: '', third: '', description: '' });
      fetchTransactions();
    } catch (err) {
        if (err.response?.data){
            setError(Object.values(err.response.data).flat().join(' '));
        } else{
            setError('Error adding transaction');
        }
      
        setSuccess('');
    }
  };

  return (
    <div className={styles["transactions-page"]}>
      <DarkBox width="30%" minwidth="300px" height="auto" minheight="500px" >

        <div style={{ height: '25%', margin: '5% 0 0 0' }}> 
            <img src={logo} alt="Logo" className={styles['logo']} />
        </div>
        <h2 className={styles.title}>Register Your Transactions</h2>

        <ul className={styles["transactions-list"]}>
          {transactions.map((tx) => (
            <li key={tx.id} className={styles["transaction-item"]}>
              <strong>{tx.name}</strong> - R$ {parseFloat(tx.amount).toFixed(2)}<br />
              <span>{tx.transactions_type} • {tx.payment_method} • {tx.date}</span>
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit} style={{ width: '90%', height: '55%'}}>
            <div className={styles['form-container']}></div>
                <FormField
                    key = "name" 
                    name="name" 
                    label="Name of Transaction" 
                    type="text" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Ex: Market" 
                    required width="100%" 
                />

                <FormField 
                    key = "amount"
                    name="amount" 
                    label="Amount" 
                    type="number" 
                    value={formData.amount} 
                    onChange={handleChange} 
                    placeholder="Ex: 100.00" 
                    required width="100%" 
                />

                <FormField 
                    key = "transactions_type"
                    name="transactions_type" 
                    label="Transactions Type" 
                    required width="100%">
                    <select
                        name="transactions_type"
                        value={formData.transactions_type}
                        onChange={handleChange}
                        style={{ width: '100%', height: '2.5rem', fontSize: '1rem', padding: '0.25rem' }}
                        required
                    >
                        <option value="" disabled>
                            Select a type
                        </option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </FormField>

                <FormField 
                    name="category" 
                    label="Category" 
                    required width="100%">

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>
                            Select a category
                        </option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </FormField>      

                <FormField 
                    key ="date" 
                    name="date" 
                    label="Data" 
                    type="date" 
                    value={formData.date} 
                    onChange={handleChange} 
                    required width="100%" 
                />

                <FormField 
                    key = "payment_method" 
                    name="payment_method" 
                    label="Payment Method" 
                    required width="100%">
                    <select
                        name="payment_method" 
                        value={formData.payment_method} 
                        onChange={handleChange}
                        style={{ width: '100%', height: '2.5rem', fontSize: '1rem', padding: '0.25rem' }} 
                        required
                    > 
                        <option value="" disabled>
                            Select a Payment Method
                        </option>
                        <option value="card">Card</option>
                        <option value="cash">Cash</option>
                        <option value="pix">Pix</option>
                    </select>
                </FormField>

                <FormField 
                  
                    name="card" 
                    label="Card"
                    required width="100%">
                    <select
                        name="card"
                        value={formData.card}
                        onChange={handleChange}
                        
                        required
                    >
                       <option value="" disabled>
                        Select a card
                       </option>
                        {cards.map(card => (
                         <option key={card.id} value={card.id}>{card.name}</option>
                        ))}
                    </select>
                </FormField>

                <FormField 
                  
                    name="bank" 
                    label="Bank"
                    required width="100%">
                    <select
                        name="bank"
                        value={formData.bank}
                        onChange={handleChange}
                        
                        required
                    >
                       <option value="" disabled>
                        Select a bank
                       </option>
                        {banks.map(bank => (
                         <option key={bank.id} value={bank.id}>{bank.name}</option>
                        ))}
                    </select>
                </FormField>

                <FormField 
                  
                    name="third" 
                    label="Third"
                    required width="100%">
                    <select
                        name="third"
                        value={formData.third}
                        onChange={handleChange}
                        
                        required
                    >
                       <option value="" disabled>
                        Select a third
                       </option>
                        {thirds.map(third => (
                         <option key={third.id} value={third.id}>{third.name}</option>
                        ))}
                    </select>
                </FormField>

                <FormField
                    name="description" 
                    label="Description" 
                    type="text" 
                    value={formData.description} 
                    onChange={handleChange} 
                    placeholder="Optional description" 
                    width="100%" 
                />


          <div className={styles["add-button-container"]}>
            <PinkButton text="ADD Transaction" width="50%" height="40px" margin="1rem 0" />
          </div>
        </form>

        {error && <p className={styles.message}>{error}</p>}
        {success && <p className={styles.message} style={{ color: 'lightgreen' }}>{success}</p>}
      </DarkBox>
    </div>
  );
}
