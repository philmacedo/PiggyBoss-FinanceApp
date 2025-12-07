import { useAuth } from "../../context/AuthContext";
import API from "../../utils/api";
import { useState, useEffect } from "react";
import styles from "./TransactionsView.module.css";
import * as financeServices from "../../services/financeServices"
import SelectTabs from "../SelectTabs";
import SelectButton from "../SelectButton";
import Button from '@mui/material/Button';

export default function TransactionsView({ bank = null, card = null, category = null, transactions = [], hiddenTransactions = [], onHide,onDelete,setHiddenTransactions }){

    const monthNames = [
        "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
        "Jul", "Ago", "Set", "Out", "Nov", "Dez"
    ]

    const today = new Date()
    const currentMonthIndex = today.getMonth()
    const currentYear = today.getFullYear()

    
    const [month, setMonth] = useState(monthNames[currentMonthIndex])
    const [year, setYear] = useState(currentYear)
    const [type, setType] = useState(null)
    const [method, setMethod] = useState(null)

    const handleMonthSelect = (month) => {

        const monthMap = {
            Jan: 1, Fev: 2, Mar: 3, Abr: 4, Mai: 5, Jun: 6,
            Jul: 7, Ago: 8, Set: 9, Out: 10, Nov: 11, Dez: 12
        }

        return monthMap[month]
    }

    //FUNÇÃO DE RESET
    const handleResetFilters = () => {
        setType(null);
        setMethod(null);
        setHiddenTransactions([])
    };


    const filteredTransactions = transactions.filter(tx => {
        // console.log(tx) // (Pode manter os seus logs de debug se quiser)
        // console.log(category)
        // console.log(card)
        // console.log(bank)
        
        // A sua lógica de data correta (sem bug de fuso horário)
        const dateParts = tx.date.split('-');
        const txMonth = parseInt(dateParts[1]);

        // Filtros externos (props)
        const bankFilter = !bank || tx.bank === bank.id;
        const cardFilter = !card || tx.card === card.id;
        const categoryFilter = !category || tx.category === category.id;

        // Filtros internos (state)
        const typeFilter = !type || tx.transactions_type === type;
        const methodFilter = !method || tx.payment_method === method;
        const isHidden = hiddenTransactions.includes(tx.id);

        return (
            txMonth === handleMonthSelect(month) &&
            bankFilter &&
            cardFilter &&
            categoryFilter &&
            typeFilter &&
            methodFilter &&
            !isHidden
        );
    });

    const totalExpense = filteredTransactions
        .filter(tx => tx.transactions_type === 'expense') // Filtra só despesas
        .reduce((sum, tx) => sum + parseFloat(tx.amount), 0); // Soma

    const totalIncome = filteredTransactions
        .filter(tx => tx.transactions_type === 'income') // Filtra só receitas
        .reduce((sum, tx) => sum + parseFloat(tx.amount), 0); // Soma

    const TRANSACTIONS_VIEW = (
        <>  
            <div style={{ width: "100%", height: "8%", padding: "0% 1%", display : "flex", justifyContent: "space-between", alignItems: "center"}}>
                <SelectTabs options={['expense', 'income']} onSelect={setType} value={type} styles={{ width: "35%" }} indicator={false} />
                <h3>Transactions Resume</h3>
                <SelectTabs options={['card', 'cash', 'pix']} onSelect={setMethod} value={method} styles={{ width: "35%" }} indicator={false} />
            </div>
            
            <SelectTabs options={monthNames} onSelect={setMonth} value={month}/>

            <Button 
                onClick={handleResetFilters} 
                sx={{ color: '#FF66C4', margin: '10px 0', alignSelf: 'center' }}
            >
                Resetar Filtros
            </Button>

            <ul className={styles["transactions-list"]}>
            {filteredTransactions.map((tx) => (
                <li key={tx.id} className={styles["transaction-item"]} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
                    <span style={{ flex: 2, paddingLeft: '10px' }}><strong>{tx.name}</strong></span>
                    <span style={{ flex: 1, textAlign: 'center' }}>R$ {parseFloat(tx.amount).toFixed(2)}</span>
                    <span style={{ flex: 1, textAlign: 'center' }}>{tx.transactions_type}</span>
                    <span style={{ flex: 1, textAlign: 'center'}}>{tx.payment_method}</span>
                    <span style={{ flex: 1, textAlign: 'center' }}>{tx.date}</span>
                    <span style={{ flex: 1, textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '5px' }}>
                        <button 
                            className={styles["hide-button"]} 
                            onClick={() => onHide(tx.id)}
                            title="Hide"
                        >
                            Hide
                        </button>
                        <span> • </span>
                        <button 
                            className={styles["delete-button"]} 
                            onClick={() => onDelete(tx.id)}
                            title="Delete"
                        >
                            Delete
                        </button>
                    </span>
                </li>
            ))}
            </ul>

            <div style={{ width: "90%", display: "flex", justifyContent: "space-between" }}>
                <div style={{ textAlign: "left" }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#c0392b' }}>Total Expense:</p>
                    <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>
                        $ {totalExpense.toFixed(2)}
                    </p>
                </div>

                {/* Total de Receitas (Income) */}
                <div style={{ textAlign: "right" }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#2ecc71' }}>Total Income:</p>
                    <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>
                        $ {totalIncome.toFixed(2)}
                    </p>
                </div>
            </div>
        </>
    )

    return TRANSACTIONS_VIEW
}
