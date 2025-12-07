import * as dashboardServices from "../../services/dashboardServices"
import { useEffect, useState } from "react"
import PiggyBox from "../PiggyBox"
import SimpleCard from "../SimpleCard"
import styles from './MonthSummary.module.css'

export default function MonthSummary() {
    const [bills, setBills] = useState([]);
    const [balance, setBalance] = useState({ balance: 0.00 });
    const [billsTotal, setBillsTotal] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [remaining, setRemaining] = useState(0);

    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const params = { month, year };

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        const fetchedBills = await dashboardServices.fetchMonthBillTotal(params);
        const fetchedBalance = await dashboardServices.fetchMonthBalance(params);

        const fetchedBudgets = await dashboardServices.fetchMonthlyBudgets(params);

        // Processar Faturas (Bills)
        if (fetchedBills) {
            const total = fetchedBills.reduce((acc, curr) => acc + curr.total, 0);
            setBillsTotal(total.toFixed(2));
        }

        // Processar Balanço
        if (fetchedBalance) {
            setBalance(fetchedBalance);
        }

        if (fetchedBudgets && fetchedBudgets.length > 0) {
            // Calcular o total gasto
            const expenses = fetchedBudgets.reduce((acc, curr) => acc + curr.spent, 0);
            
            // Calcular o total planeado (limite)
            const totalLimit = fetchedBudgets.reduce((acc, curr) => acc + parseFloat(curr.limit_value), 0);
            
            setTotalExpenses(expenses.toFixed(2));
            setRemaining((totalLimit - expenses).toFixed(2));
        }

    }

    const MONTH_SUMMARY = (
        <PiggyBox style={{ width: "95%", height: "100%", minWidth: "600px", background: "#0f0b1f" }}>
            <div className={styles["dashboard-head"]}>
                <p>this month</p>
                <p style={{ fontSize : '1.3rem' }}>balance overview</p>
                <p>all banks</p>
            </div>
            <div className={styles["dashboard-content-expenses"]}>
                <SimpleCard title="Balance" value={balance?.balance?.toFixed(2) || '0.00'} card_style={{ width: "90%", height: "80%"}} />
                <SimpleCard title="Current Bills Total" value={billsTotal} card_style={{ width: "90%", height: "80%"}} />
                <div className={styles["remaining"]}>
                    <p>Total Expenses</p>
                    <p>{totalExpenses || 0.00}</p>
                </div>
                <div className={styles["remaining"]}>
                    <p>Remaining Balance Planned</p>
                    <p>{remaining || 0.00}</p>
                </div>
            </div>
        </PiggyBox>
    )

    return MONTH_SUMMARY
}
