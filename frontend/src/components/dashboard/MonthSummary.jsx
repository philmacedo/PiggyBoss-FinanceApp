import * as dashboardServices from "../../services/dashboardServices"
import { useEffect, useState } from "react"
import DarkBox from "../DarkBox"
import SimpleCard from "../SimpleCard"
import styles from './Dashboard.module.css'

export default function MonthSummary() {
    const [bills, setBills] = useState([])
    const [balance, setBalance] = useState(0)
    const [billsTotal, setBillsTotal] = useState(0)
    const [totalExpenses, setTotalExpenses] = useState(0)
    const [remaining, setRemaining] = useState(0)

    const today = new Date()
    const month = today.getMonth() + 1
    const year = today.getFullYear()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const fetchedBills = await dashboardServices.fetchMonthBillTotal({ month, year })
        const fetchedBalance = await dashboardServices.fetchMonthBalance({ month, year })

        if (fetchedBills) {
            setBills(fetchedBills)
            const total = fetchedBills.reduce((acc, curr) => acc + curr.total, 0)
            setBillsTotal(total)
        }

        if (fetchedBalance) {
            setBalance(fetchedBalance)
        }
    }

    const MONTH_SUMMARY = (
        <DarkBox style={{ width: "95%", height: "90%", minWidth: "600px", background: "#0f0b1f" }}>
            <div className={styles["dashboard-head"]}>
                <h4>This month</h4>
            </div>
            <div className={styles["dashboard-content-expenses"]}>
                <SimpleCard title="Balance" value={balance.balance} width="90%" height="70%" />
                <SimpleCard title="Current Bills Total" value={billsTotal} width="90%" height="70%" />
                <div className={styles["remaining"]}>
                    <p>Total Expenses</p>
                    <p>{totalExpenses || 0.00}</p>
                </div>
                <div className={styles["remaining"]}>
                    <p>Remaining Balance Planned</p>
                    <p>{remaining || 0.00}</p>
                </div>
            </div>
        </DarkBox>
    )

    return MONTH_SUMMARY
}
