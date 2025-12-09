import { useState } from "react";
import styles from "./TransactionsView.module.css";
import SelectTabs from "../SelectTabs";
import Button from '@mui/material/Button';

export default function TransactionsView({ 
    bank = null, 
    card = null, 
    category = null, 
    transactions = [], 
    hiddenTransactions = [], 
    setHiddenTransactions, 
    onHide, 
    onDelete,
    allCategories = [],
    allCards = [],
    allBanks = []
}) {

    const monthNames = [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez" ]
    const today = new Date()
    const currentMonthIndex = today.getMonth()
    
    const [month, setMonth] = useState(monthNames[currentMonthIndex])
    const [type, setType] = useState(null)

    const handleResetFilters = () => {
        setMonth(monthNames[currentMonthIndex]);
        setType(null);
    };

    const handleRestoreHidden = () => {
        setHiddenTransactions([]); 
    };

    const getContrastColor = (hexColor) => {
        if (!hexColor) return 'white';
        const hex = hexColor.replace('#', '');
        if (hex.length !== 6) return 'white';
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? 'black' : 'white';
    }

    const resolveData = (data, list) => {
        if (!data) return null;
        if (typeof data === 'object') return data; 
        return list.find(item => item.id === data); 
    };

    const filteredTransactions = transactions.filter(tx => {
        if (hiddenTransactions.includes(tx.id)) return false;

        const txDate = new Date(tx.date);
        const userTimezoneOffset = txDate.getTimezoneOffset() * 60000;
        const adjustedDate = new Date(txDate.getTime() + userTimezoneOffset);
        
        const txMonthIndex = adjustedDate.getMonth();
        const targetMonthIndex = monthNames.indexOf(month);

        if (txMonthIndex !== targetMonthIndex) return false;

        if (bank && bank.length > 0) {
             const txBankId = (tx.bank && typeof tx.bank === 'object') ? tx.bank.id : tx.bank;
             if (txBankId !== bank[0]?.id) return false;
        }
        if (card && card.length > 0) {
             const txCardId = (tx.card && typeof tx.card === 'object') ? tx.card.id : tx.card;
             if (txCardId !== card[0]?.id) return false;
        }
        if (category && category.length > 0) {
             const txCatId = (tx.category && typeof tx.category === 'object') ? tx.category.id : tx.category;
             if (txCatId !== category[0]?.id) return false;
        }

        if (type && tx.transactions_type !== type) return false;

        return true;
    });

    const TRANSACTIONS_VIEW = (
        <>  
            <div className={styles["top-header"]}>
                <div className={styles["left-filters"]}>
                    <button className={`${styles["filter-text-btn"]} ${type === 'expense' ? styles['active'] : ''}`} onClick={() => setType(type === 'expense' ? null : 'expense')}>Expense</button>
                    <button className={`${styles["filter-text-btn"]} ${type === 'income' ? styles['active'] : ''}`} onClick={() => setType(type === 'income' ? null : 'income')}>Income (Credit)</button>
                    
                    {(type || month !== monthNames[currentMonthIndex]) && (
                        <button onClick={handleResetFilters} className={styles["reset-btn"]}>Reset</button>
                    )}

                    {hiddenTransactions.length > 0 && (
                        <button 
                            onClick={handleRestoreHidden} 
                            className={styles["reset-btn"]}
                            style={{ marginLeft: '10px', color: '#d946ef', borderColor: '#d946ef' }}
                        >
                            Restore Hidden ({hiddenTransactions.length})
                        </button>
                    )}
                </div>

                <h3 className={styles["table-title"]}>Transactions</h3>
                
                <div className={styles["right-filters"]}>
                    <select className={styles["month-select"]} value={month} onChange={(e) => setMonth(e.target.value)}>
                        {monthNames.map(m => (<option key={m} value={m}>{m}</option>))}
                    </select>
                </div>
            </div>

            <div className={styles["table-container"]}>
                <table className={styles["transactions-table"]}>
                    <thead className={styles["transactions-header"]}>
                        <tr>
                            <th>date</th>
                            <th>account</th>
                            <th>method</th> {/* <--- ADICIONADO AQUI */}
                            <th>transaction</th>
                            <th>category</th>
                            <th>description</th>
                            <th>value</th>
                            <th style={{textAlign: 'right'}}>actions</th> 
                        </tr>
                    </thead>
                    <tbody className={styles["transactions-body"]}>
                        {filteredTransactions.length === 0 ? (
                            <tr className={styles["no-transactions"]}><td colSpan="8">No transactions found.</td></tr> // Ajustado colSpan para 8
                        ) : (
                            filteredTransactions.map((tx) => {
                                const categoryData = resolveData(tx.category, allCategories);
                                const cardData = resolveData(tx.card, allCards);
                                const bankData = resolveData(tx.bank, allBanks);
                                
                                const badgeColor = categoryData?.color || '#333';
                                const badgeTextColor = getContrastColor(badgeColor);

                                return (
                                <tr key={tx.id} className={styles["transaction-row"]}>
                                    <td className={styles["date-cell"]}>{new Date(tx.date).toLocaleDateString('pt-BR')}</td> 
                                    
                                    <td>{bankData?.institution?.name || cardData?.name || 'Cash/Pix'}</td> 
                                    
                                    {/* <--- CÉLULA NOVA: Payment Method ---> */}
                                    <td style={{ textTransform: 'capitalize', color: '#aaa' }}>
                                        {tx.payment_method}
                                    </td>

                                    <td style={{ fontWeight: 'bold' }}>{tx.name}</td> 
                                    
                                    <td className={styles["category-cell"]}>
                                        <span style={{ 
                                            backgroundColor: badgeColor, 
                                            color: badgeTextColor, 
                                            padding: '4px 8px', 
                                            borderRadius: '12px', 
                                            display: 'inline-block', 
                                            fontSize: '0.8em', 
                                            textTransform: 'uppercase', 
                                            fontWeight: 'bold',
                                            boxShadow: badgeTextColor === 'black' ? 'none' : '0 0 2px rgba(0,0,0,0.5)'
                                        }}>
                                            {categoryData?.name || 'N/A'} 
                                        </span>
                                    </td> 
                                    
                                    <td className={styles["desc-cell"]}>{tx.description || '-'}</td>
                                    
                                    <td className={tx.transactions_type === 'expense' ? styles['expense'] : styles['income']}>
                                        $ {parseFloat(tx.amount).toFixed(2)}
                                    </td>
                                    
                                    <td className={styles["actions-cell"]}>
                                        <span onClick={() => onHide(tx.id)} className={styles["action-icon"]} title="Hide"> E </span>
                                        <span onClick={() => onDelete(tx.id)} className={styles["action-icon"]} title="Delete"> X </span>
                                    </td>
                                </tr>
                            )})
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )

    return TRANSACTIONS_VIEW
}