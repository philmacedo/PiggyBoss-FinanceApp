import * as dashboardServices from "../../services/dashboardServices"
import * as financeServices from "../../services/financeServices" // Importar financeServices para pegar todas as transações
import { useEffect, useState } from "react"
import PiggyBox from "../PiggyBox"
import SimpleCard from "../SimpleCard"
import styles from './MonthSummary.module.css'

export default function MonthSummary() {
    const [balance, setBalance] = useState(0);
    const [billsTotal, setBillsTotal] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [remaining, setRemaining] = useState(0);

    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();
    const params = { month: currentMonth, year: currentYear };

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        try {
            // 1. Busca TODAS as transações (sem filtro de mês)
            const allTransactions = await financeServices.fetchTransactions();
            const fetchedBudgets = await dashboardServices.fetchMonthlyBudgets(params);

            if (allTransactions) {
                // --- CORREÇÃO DO SALDO (Current Balance) ---
                // Calcula usando TODAS as transações para bater com a tela de Transactions
                const currentBalance = allTransactions.reduce((acc, tx) => {
                    const amount = parseFloat(tx.amount || 0);
                    // Soma Income, subtrai Expense
                    return tx.transactions_type === 'income' ? acc + amount : acc - amount;
                }, 0);
                setBalance(currentBalance);

                // --- CORREÇÃO DA FATURA (Current Bills Total) ---
                // Filtra apenas: Mês Atual + Método Cartão + Tipo Despesa
                const currentBills = allTransactions
                    .filter(tx => {
                        const txDate = new Date(tx.date);
                        // Ajuste de fuso horário
                        const userTimezoneOffset = txDate.getTimezoneOffset() * 60000;
                        const adjustedDate = new Date(txDate.getTime() + userTimezoneOffset);
                        
                        const isSameMonth = (adjustedDate.getMonth() + 1) === currentMonth && adjustedDate.getFullYear() === currentYear;
                        const isCardExpense = tx.payment_method === 'card' && tx.transactions_type === 'expense';
                        
                        return isSameMonth && isCardExpense;
                    })
                    .reduce((acc, tx) => acc + parseFloat(tx.amount || 0), 0);
                
                setBillsTotal(currentBills.toFixed(2));
            }

            // Processar Budgets (Mantido)
            if (fetchedBudgets && fetchedBudgets.length > 0) {
                const expenses = fetchedBudgets.reduce((acc, curr) => acc + curr.spent, 0);
                const totalLimit = fetchedBudgets.reduce((acc, curr) => acc + parseFloat(curr.limit_value), 0);
                
                setTotalExpenses(expenses.toFixed(2));
                setRemaining((totalLimit - expenses).toFixed(2));
            }
        } catch (error) {
            console.error("Erro ao carregar resumo:", error);
        }
    }

    const MONTH_SUMMARY = (
        <PiggyBox style={{ width: "95%", height: "100%", minWidth: "600px", background: "#0f0b1f" }}>
            <div className={styles["dashboard-head"]}>
                <p>balance overview</p>
            </div>
            <div className={styles["dashboard-content-expenses"]}>
                {/* Mostra o Saldo Acumulado Total */}
                <SimpleCard 
                    title="Total Balance" 
                    value={balance.toFixed(2)} 
                    card_style={{ width: "90%", height: "80%", background: "linear-gradient(135deg, #16102f 0%, #2c254a 100%)", borderLeft: "4px solid #f1109b"}} 
                />
                
                {/* Mostra o Total de Faturas de Cartão deste Mês */}
                <SimpleCard 
                    title="Current Bills Total" 
                    value={billsTotal} 
                    card_style={{width: "90%", height: "80%", background: "linear-gradient(135deg, #16102f 0%, #2c254a 100%)", borderLeft: "4px solid #f1109b"}} 
                />
                
                <div className={styles["remaining"]}>
                    <p>Total Expenses (Budget)</p>
                    <p>{totalExpenses || 0.00}</p>
                </div>
                <div className={styles["remaining"]}>
                    <p>Remaining Budget</p>
                    <p>{remaining || 0.00}</p>
                </div>
            </div>
        </PiggyBox>
    )

    return MONTH_SUMMARY
}