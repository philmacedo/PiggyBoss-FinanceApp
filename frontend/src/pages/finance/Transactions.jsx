import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../utils/api";
import styles from "./Transactions.module.css";
import nerd from "../../assets/nerd.png";

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
      setError("You need to log in.");
      return;
    }

    const check = async () => {
    const isValid = await verifyToken(token);
    if (!isValid) {
      setError("Session expired.");
      return;
    }}

    fetchTransactions()
    fetchOptions()
  }, []);

  const fetchTransactions = async () => {

    try {
      const token = localStorage.getItem("token");
      const response = await API["finance"].get("/transactions/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(response.data);
      setError('');
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Session Expired.");
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
        API["finance"].get("/category/", config),
        API["finance"].get("/card/", config),
        API["finance"].get("/bank_account/", config),
        API["finance"].get("/third/", config),
      ]);

      setCategories(catRes.data);
      setCards(cardRes.data);
      setBanks(bankRes.data);
      setThirds(thirdRes.data);

    } catch (err) {
      if (err.response?.status === 401) {
        setError("Session Expired.");
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
      await API["finance"].post("/transactions/", formData, {
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


  // controlar itens ocultados
  const [hiddenTransactions, setHiddenTransactions] = useState([]);

  const handleHideTransaction = (id) => {
    setHiddenTransactions(prev => [...prev, id]);
  };

  // lista de histórico
  const handleShowAll = () => {
  setHiddenTransactions([]);
  };

  const SIMPLE_FIELDS = [
    { label: "Name of Transaction", name: "name", type: "text",  placeholder: 'Ex: Market', required: true },
    { label: "Amount", name: "amount", type: "text",  placeholder: '100.50', required: true },
    { label: "Transaction Type", name: "transaction_type", type: "text",  placeholder: 'Select a type', required: true },
    { label: "Description", name: "description", type: "text",  placeholder: 'Optional description' },
    { label: "Date", name: "date", type: "date",  placeholder: 'Date', required: true },
  ]

  const SELECT_FIELDS = [
    { label: "Category", name: "category", placeholder: 'Select a category', options : categories },
    { label: "Card", name: "card", placeholder: 'Select a card', options : cards },
    { label: "Bank", name: "bank", placeholder: 'Select a bank', options: banks },
  ]

  const SELECT_BASE_FIELDS = [
    { label: "Transactions Type", name: "transactions_type", placeholder: "Select a type", required: true, options: [{ value: "income", label: "Income" }, { value: "expense", label: "Expense" }, ] },
    { label: "Payment Method", name: "payment_method", placeholder: "Select a Payment Method", required: true, options: [{ value: "card", label: "Card" }, { value: "cash", label: "Cash" }, { value: "pix", label: "Pix" }, ],}, 
  ];

  return (
    <div className={styles["transactions-page"]}>
      <DarkBox style = {{ width : "30%", minwidth : "300px", height : "90%" }}>

        <div style={{margin: '5% 0 0 0' }}> 
            <img src={nerd} alt="Logo" className={styles['logo']} />
        </div>
        
        <h3 style = {{ fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' }}>Register Your Transactions</h3>

        <form onSubmit={handleSubmit} style={{ width: '90%', height: '75%' }}>
            <div className={styles['form-container']}>
                {SIMPLE_FIELDS.map((simple_field) => (
                  <FormField
                    key={simple_field.name}
                    name={simple_field.name}
                    label={simple_field.label}
                    type={simple_field.type} 
                    value={formData[simple_field.name]}
                    onChange={handleChange} 
                    placeholder={simple_field.placeholder}
                    required={simple_field.required}
                    width= "80%"
                  />
                  ))
                }

                {SELECT_BASE_FIELDS.map((field) => (
                  <FormField
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    required={field.required}
                    width="80%"
                  >
                    <select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        height: '2.5rem',
                        fontSize: '1rem',
                        padding: '0.25rem',
                      }}
                      required={field.required}
                      >
                        <option value="" disabled>
                          {field.placeholder}
                        </option>
                        {field.options.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                      ))}
                    </select>
                  </FormField>
                ))}

                {SELECT_FIELDS.map((select_field) => (
                  <FormField
                    key={select_field.name}
                    name={select_field.name}
                    label={select_field.label} 
                    required 
                    width="80%">
                    <select
                      name={select_field.name}
                      value={formData[select_field.name]}
                      onChange={handleChange}
                      required={select_field.required}
                      >
                        <option value="" disabled >
                          {`Select a ${select_field.placeholder}`}
                        </option>
                        {select_field.options.map((option) => (
                          <option key={option.id} value={option.id}>
                            {field.getLabel(option)}
                          </option>
                        ))}
                    </select>
                  </FormField>
                  ))
                }
            </div>

          <div className={styles["add-button-container"]}>
            <PinkButton text="ADD Transaction" width="50%" height="40px" margin="1rem 0" />
          </div>
        </form>

        {error && <p className={styles.message}>{error}</p>}
        {success && <p className={styles.message} style={{ color: 'lightgreen' }}>{success}</p>}
      </DarkBox>


      <DarkBox style ={{ width : "30%", minwidth : "300px", height : "auto", minheight : "100px" }} >
        <h2 className={styles.title}>Transactions List</h2>
        <button className={styles["show-all-button"]} onClick={handleShowAll}>
          Show All History
        </button>

        <ul className={styles["transactions-list"]}>
          {transactions.filter(tx => !hiddenTransactions.includes(tx.id)).map((tx) => (
            <li key={tx.id} className={styles["transaction-item"]}>
              <strong>{tx.name}</strong> - R$ {parseFloat(tx.amount).toFixed(2)}<br />
              <span>{tx.transactions_type} • {tx.payment_method} • {tx.date} • </span>
              <button className={styles["hide-button"]}
                onClick={() => handleHideTransaction(tx.id)}
              >
                Hide
              </button>
            </li>
          ))}
        </ul>
      </DarkBox>

    </div>
  );
}
