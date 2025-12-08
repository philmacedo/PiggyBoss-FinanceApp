import styles from "./CardsAndBanks.module.css"
import SelectBox from "../../components/cardsandbanks/SelectBox";
import PiggyBox from "../../components/PiggyBox";
import BankForm from "../../components/cardsandbanks/BankForm";
import CardForm from "../../components/cardsandbanks/CardForm";
import CategoriesForm from "../../components/cardsandbanks/CategoriesForm";
import TransactionsView from "../../components/finance/TransactionsView"
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext"
import API from "../../utils/api";
import * as financeServices from "../../services/financeServices"
import FormField from "../../components/FormField"
import PinkButton from "../../components/PinkButton"
import nerd from "../../assets/images/nerd.png" 
import NeedLogin from "../../components/NeedLogin"

function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ======================================================================
// COMPONENTE TransactionForm 
// ======================================================================

function TransactionForm({ onFormSubmit, onClose, categories, cards, banks }) {
    
    const [formData, setFormData] = useState({
        name: '', amount: '', transactions_type: '', category: '',
        date: '', payment_method: '', card: '', bank: '', third: '', description: ''
    });
    
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => {
          const newFormData = { ...prevFormData, [name]: value };
          if (name === 'card') {
            const selectedCard = cards.find(c => c.id === parseInt(value));
            newFormData.bank = selectedCard ? selectedCard.bank : '';
          } else if (name === 'bank') {
              newFormData.card = '';
          }
          return newFormData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requiredFields = ['name', 'amount', 'transactions_type', 'date', 'payment_method'];
        const isValid = requiredFields.every(field => (formData[field] || '').toString().trim() !== '');
        
        if (!isValid) {
          setError('Please fill in all the fields correctly.');
          setSuccess('');
          return;
        }
    
        try {
          await API["finance"].post("/transactions/", formData); 
          setSuccess('Transaction added successfully!');
          setError('');
          setFormData({ name: '', amount: '', transactions_type: '', category: '', date: '', payment_method: '', card: '', bank: '', third: '', description: '' });
          onFormSubmit(); 
          setTimeout(onClose, 1000); 
        } catch (err) {
            if (err.response?.data){
                setError(Object.values(err.response.data).flat().join(' '));
            } else{
                setError('Error adding transaction');
            }
            setSuccess('');
        }
    };
    
    const SIMPLE_FIELDS = [
        { label: "Name of Transaction", name: "name", type: "text",  placeholder: 'Ex: Market', required: true, style: { width : "95%", gridColumn: "span 2" }},
        { label: "Description", name: "description", type: "text",  placeholder: 'Optional description', style: { width : "95%", gridColumn: "span 2" }},
        { label: "Amount", name: "amount", type: "number",  placeholder: '100.50', required: true, style: { width : "90%" }  },
        { label: "Date", name: "date", type: "date",  placeholder: 'Date', required: true, style: { width : "90%" }  },
    ]

    const SELECT_FIELDS = [
        { label: "Category", name: "category", placeholder: 'Select a category', options : categories, style: { width : "95%", gridColumn: "span 2" }  },
        { label: "Card", name: "card", placeholder: 'Select a card', options : cards, style: { width : "90%" }  },
        { label: "Bank", name: "bank", placeholder: 'Select a bank', options: banks, style: { width : "90%" }  },
    ]

    const SELECT_BASE_FIELDS = [
        { label: "Transactions Type", name: "transactions_type", placeholder: "Select a type", required: true,
          options: [{ value: "income", label: "Income" }, { value: "expense", label: "Expense" }, ],
          style: { width : "90%" } 
        },
        { label: "Payment Method", name: "payment_method", placeholder: "Select a Payment Method", required: true,
          options: [{ value: "card", label: "Card" }, { value: "cash", label: "Cash" }, { value: "pix", label: "Pix" }, ],
          style: { width : "90%" }
        }, 
    ];

    return (
        <PiggyBox style = {{ width : "95%", height : "95%", minWidth : "300px", minHeight: "800px" }}>
            <div className={styles["form-header-wrapper"]}>
                <button onClick={onClose} className={styles["form-back-button"]}>&larr; Voltar</button>
                <div><img src={nerd} alt="Logo" className={styles['logo']} /></div>
                <h3 style = {{ fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' }}>Register Your Transactions</h3>
            </div>
            <form onSubmit={handleSubmit} style={{ width: '90%', height: '70%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div className={styles['form-container']}>
                    {SIMPLE_FIELDS.map((simple_field) => (
                      <FormField
                        key={simple_field.name} name={simple_field.name} label={simple_field.label} type={simple_field.type} 
                        value={formData[simple_field.name]} onChange={handleChange} placeholder={simple_field.placeholder}
                        required={simple_field.required} style={simple_field.style}
                      />
                    ))}
                    {SELECT_BASE_FIELDS.map((field) => (
                      <FormField key={field.name} name={field.name} label={field.label} required={field.required} style={field.style}>
                        <select name={field.name} value={formData[field.name]} onChange={handleChange}
                          style={{ width: '100%', height: '2.5rem', fontSize: '1rem', padding: '0.25rem', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '5px' }}
                          required={field.required}
                        >
                            <option value="" disabled>{field.placeholder}</option>
                            {field.options.map((opt) => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
                        </select>
                      </FormField>
                    ))}
                    {SELECT_FIELDS.map((select_field) => (
                      <FormField key={select_field.name} name={select_field.name} label={select_field.label} required style={select_field.style}>
                        <select name={select_field.name} value={formData[select_field.name]} onChange={handleChange} required={select_field.required}
                          disabled={select_field.name === 'bank' && formData.card}
                          style={{ width: '100%', height: '2.5rem', fontSize: '1rem', padding: '0.25rem', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '5px' }}
                        >
                            <option value="" disabled >{select_field.placeholder}</option>
                            {select_field.options.map((option) => (
                              <option key={option.id} value={option.id}>
                                {select_field.name === 'bank' ? `${option.institution?.name} - ${capitalize(option.account_type)}` : option.name}
                              </option>
                            ))}
                        </select>
                      </FormField>
                    ))}
                </div>
                <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "20px" }}>
                    <PinkButton text="Add Transaction" style={{ width:"50%", height:"40px" }} type="submit" />
                </div>
            </form>
            <p style={{ color: error ? 'red' : success ? 'lightgreen' : 'inherit', visibility: error || success ? 'visible' : 'hidden', margin: '2%', textAlign: 'center' }}>{error || success || ''}</p>
        </PiggyBox>
    );
}

// ======================================================================
// COMPONENTE PRINCIPAL
// ======================================================================

export default function CardsAndBanks(){

    const { userInfo, loading } = useAuth()
    
    const [banks, setBanks] = useState([]);
    const [bankSelected, setBankSelected] = useState([]); 
    const [cards, setCards] = useState([]);
    const [cardSelected, setCardSelected] = useState([]); 
    const [categories, setCategories] = useState([]);
    const [categorySelected, setCategorySelected] = useState([]);
    const [thirds, setThirds] = useState([]); 
    
    const [transactions, setTransactions] = useState([]);
    const [hiddenTransactions, setHiddenTransactions] = useState([]);
    const [visibleForm, setVisibleForm] = useState(null);

    const fetchData = async () => {
        if (!userInfo && !loading) return 
        try {
            const [catRes, cardRes, bankRes, thirdRes] = await Promise.all([
                API["finance"].get("/category/"),
                API["finance"].get("/card/"),
                API["finance"].get("/bank_account/"),
                API["finance"].get("/third/"), 
            ]);
            setCategories(catRes.data);
            setCards(cardRes.data);
            setBanks(bankRes.data);
            setThirds(thirdRes.data);
            const txs = await financeServices.fetchTransactions();
            setTransactions(txs);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    }
    
    useEffect(() => { fetchData() }, [userInfo, loading])
    
    const handleHideTransaction = (id) => { setHiddenTransactions(prev => [...prev, id]); };

    const handleDeleteTransaction = async (id) => {
        if (!window.confirm("Are you sure you want to delete this transaction?")) return;
        try {
            await financeServices.deleteTransaction(id);
            setTransactions(prev => prev.filter(tx => tx.id !== id));
        } catch (error) { console.error("Error deleting transaction:", error); }
    };

    const handleSelectBank = (bank) => {
        // Agora 'bank' é um OBJETO, então podemos acessar .id com segurança
        if (bankSelected.length > 0 && bankSelected[0].id === bank.id) {
            setBankSelected([]); 
        } else {
            setBankSelected([bank]); 
        }
    };

    const handleSelectCard = (card) => {
        if (cardSelected.length > 0 && cardSelected[0].id === card.id) {
            setCardSelected([]); 
        } else {
            setCardSelected([card]);
        }
    };

    const handleSelectCategory = (category) => {
        if (categorySelected.length > 0 && categorySelected[0].id === category.id) {
            setCategorySelected([]); 
        } else {
            setCategorySelected([category]);
        }
    };

    const netTotal = transactions.reduce((acc, tx) => {
        const amount = parseFloat(tx.amount || 0);
        return tx.transactions_type === 'income' ? acc + amount : acc - amount;
    }, 0);

    if (!userInfo && !loading) return <NeedLogin />;
    else if (loading) return <></>;

    return (
        <div className={styles["cardsandbanks"]}>
            <div className={styles["sidebar"]}>
                
                {/* --- CORREÇÃO AQUI: Passamos 'options={banks}' (o array de objetos) --- */}
                {/* E usamos 'displayFn' para dizer como o texto deve ser montado */}
                <SelectBox 
                    label="Banks Accounts" 
                    options={banks} 
                    displayFn={(b) => `${b.institution?.name} - ${capitalize(b.account_type)}`}
                    cardstyle={{ width : "100%", height: "30%" }} 
                    titlebuttonlabel="+" 
                    titlebuttoncallback={() => setVisibleForm("bank")} 
                    
                    selectcallback={handleSelectBank} 
                    selectedIndex={bankSelected.length > 0 ? banks.findIndex(b => b.id === bankSelected[0].id) : -1}
                />

                <SelectBox 
                    label="Cards" 
                    options={cards}
                    displayKey="name" 
                    cardstyle={{ width : "100%", height: "30%" }} 
                    titlebuttonlabel="+" 
                    titlebuttoncallback={() => setVisibleForm("card")} 
                    
                    selectcallback={handleSelectCard}
                    selectedIndex={cardSelected.length > 0 ? cards.findIndex(c => c.id === cardSelected[0].id) : -1}
                />

                <SelectBox 
                    label="Categories" 
                    options={categories}
                    displayKey="name"
                    colorKey="color"
                    cardstyle={{ width : "100%", height: "30%" }} 
                    titlebuttonlabel="+" 
                    titlebuttoncallback={() => setVisibleForm("cat")} 
                    
                    selectcallback={handleSelectCategory}
                    selectedIndex={categorySelected.length > 0 ? categories.findIndex(c => c.id === categorySelected[0].id) : -1}
                />
            </div>

            <div className={styles["content"]}>
                {visibleForm === 'bank' && <BankForm onFormSubmit={fetchData} onClose={() => setVisibleForm(null)} />}
                {visibleForm === 'card' && <CardForm onFormSubmit={fetchData} onClose={() => setVisibleForm(null)} />}
                {visibleForm === 'cat' && <CategoriesForm onFormSubmit={fetchData} onClose={() => setVisibleForm(null)} />}
                
                {visibleForm === 'transaction' && <TransactionForm onFormSubmit={fetchData} onClose={() => setVisibleForm(null)} categories={categories} cards={cards} banks={banks}/>}

                {visibleForm === null && (
                    <div className={styles["transactions-wrapper"]}>
                        <div className={styles["transactions-table-view"]}>
                            <TransactionsView 
                                transactions={transactions}
                                hiddenTransactions={hiddenTransactions}
                                setHiddenTransactions={setHiddenTransactions}
                                onHide={handleHideTransaction}
                                onDelete={handleDeleteTransaction}
                                
                                bank={bankSelected} 
                                card={cardSelected} 
                                category={categorySelected}
                                
                                allCategories={categories}
                                allCards={cards}
                                allBanks={banks}
                            />
                        </div>
                        <div className={styles["transactions-footer"]}>
                            <button className={styles["add-button"]} onClick={() => setVisibleForm("transaction")}>ADD</button> 
                            <span style={{color: 'white', fontWeight: 'bold'}}>Total R$ {netTotal.toFixed(2)}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}