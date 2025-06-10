import { useAuth } from "../../context/AuthContext";
import API from "../../utils/api";
import { useState, useEffect } from "react";
import styles from "./TransactionsView.module.css";
import * as financeServices from "../../services/financeServices"

export default function TransactionsView(){

    const { userInfo, loading } = useAuth()

    const [transactions, setTransactions] = useState([])

    const [hiddenTransactions, setHiddenTransactions] = useState([])

    const handleHideTransaction = (id) => {
        setHiddenTransactions(prev => [...prev, id])
    }

    const handleShowAll = () => {
        setHiddenTransactions([])
    }

    useEffect(() => {
        if (!userInfo && !loading) return
        fetchData()
        
        
    }, [userInfo])

    const fetchData = async () => {
        if (!userInfo || loading) return;

        const data = await financeServices.fetchTransactions();
        setTransactions(data);
    };

    const TRANSACTIONS_VIEW = (
        <>
            <h2 style={{ fontSize: "2rem", margin: "1rem", textAlign: "center" }}>Transactions List</h2>
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
        </>
    )

    return TRANSACTIONS_VIEW
}
