import { useState, useEffect } from "react";
import * as financeServices from "../../services/financeServices";
import API from "../../utils/api";
import PiggyBox from "../PiggyBox";
import PinkButton from "../PinkButton";
import styles from "./Dashboard.module.css";

export default function ExpensesManager() {
    const [cards, setCards] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // Estado do formulário
    const [formData, setFormData] = useState({
        amount: '',
        description: '',
        card: '',
        category: '',
        transactions_type: 'expense',
        payment_method: 'card', 
        date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [fetchedCards, fetchedCats] = await Promise.all([
                financeServices.fetchCards(),
                API["finance"].get("/category/")
            ]);
            
            if (fetchedCards) setCards(fetchedCards);
            if (fetchedCats.data) setCategories(fetchedCats.data);
            
            // Define valores padrão para evitar selects vazios
            if (fetchedCards && fetchedCards.length > 0) {
                setFormData(prev => ({ ...prev, card: fetchedCards[0].id }));
            }
            if (fetchedCats.data && fetchedCats.data.length > 0) {
                setFormData(prev => ({ ...prev, category: fetchedCats.data[0].id }));
            }

        } catch (error) {
            console.error("Error loading options", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Impede o recarregamento da página

        if (!formData.amount || !formData.category) {
            alert("Please fill in Amount and Category");
            return;
        }

        // Validação: Se for cartão, precisa ter um cartão selecionado
        if (formData.payment_method === 'card' && !formData.card) {
            alert("Please select a Card");
            return;
        }

        setLoading(true);

        try {
            let bankId = null;
            let cardId = null;

            // Lógica para preparar os dados corretamente para o Backend
            if (formData.payment_method === 'card') {
                const selectedCard = cards.find(c => c.id === parseInt(formData.card));
                cardId = selectedCard ? selectedCard.id : null;
                bankId = selectedCard ? selectedCard.bank : null;
            } else {
                
                cardId = null; 
                bankId = null; 
            }

            const payload = {
                name: formData.description || "Quick Expense", // Nome obrigatório
                description: formData.description,
                amount: parseFloat(formData.amount), // Garante que é número
                transactions_type: 'expense',
                payment_method: formData.payment_method,
                date: formData.date,
                category: parseInt(formData.category), // Garante que é inteiro
                card: cardId, 
                bank: bankId
            };

            await API["finance"].post("/transactions/", payload);
            
            alert("Expense added successfully!");
            
            setFormData(prev => ({ ...prev, amount: '', description: '' })); 
            
            window.location.reload(); 

        } catch (error) {
            console.error(error);
            const errorMsg = error.response?.data ? JSON.stringify(error.response.data) : "Unknown error";
            alert("Error adding expense: " + errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PiggyBox style={{ width: "45%", height: "90%", background: "#0f0b1f", minWidth: "300px" }}>
            <div className={styles["dashboard-head"]}>
                <h4>Quick Expense</h4>
            </div>

            
            <form 
                onSubmit={handleSubmit}
                style={{ width: '90%', height: '85%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}
            >
                
                <input 
                    type="number" 
                    name="amount"
                    placeholder="R$ 0.00" 
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    style={{
                        width: '100%', padding: '10px', borderRadius: '8px', 
                        border: '1px solid #333', background: '#16102f', color: 'white', fontSize: '1.2rem', fontWeight: 'bold'
                    }}
                />

                <input 
                    type="text" 
                    name="description"
                    placeholder="Description (optional)" 
                    value={formData.description}
                    onChange={handleChange}
                    style={{
                        width: '100%', padding: '8px', borderRadius: '8px', 
                        border: 'none', background: '#16102f', color: '#ccc', fontSize: '0.9rem'
                    }}
                />

                
                <select 
                    name="payment_method" 
                    value={formData.payment_method} 
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', background: '#16102f', color: 'white', border: '1px solid #333', marginBottom: '5px' }}
                >
                    <option value="card">Card</option>
                    <option value="pix">Pix</option>
                    <option value="cash">Cash</option>
                </select>

                <div style={{ display: 'flex', width: '100%', gap: '10px' }}>
                    
                  
                    {formData.payment_method === 'card' && (
                        <select 
                            name="card" 
                            value={formData.card} 
                            onChange={handleChange}
                            style={{ flex: 1, padding: '8px', borderRadius: '8px', background: '#16102f', color: 'white', border: 'none' }}
                        >
                            <option value="" disabled>Card</option>
                            {cards.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    )}

                    <select 
                        name="category" 
                        value={formData.category} 
                        onChange={handleChange}
                        required
                        style={{ flex: 1, padding: '8px', borderRadius: '8px', background: '#16102f', color: 'white', border: 'none' }}
                    >
                        <option value="" disabled>Category</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>

                
                <PinkButton
                    type="submit" 
                    text={loading ? "Saving..." : "Add Expense"}
                    style={{ width: "100%", height: "40px", marginTop: "10px" }}
                />
            </form>
        </PiggyBox>
    );
}