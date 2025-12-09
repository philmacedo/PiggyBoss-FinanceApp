import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import PiggyBox from "../PiggyBox"
import styles from './Dashboard.module.css'
import { fetchBanks } from "../../services/financeServices";

function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function BanksList() {

    const [banks, setBanks] = useState([]);
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const fetchedbanks = await fetchBanks();
        if (fetchedbanks) {
            setBanks(fetchedbanks); // Guarda o objeto completo
        }
    };

    const BANKS_LIST = (
        <PiggyBox style = {{ width : "45%", height : "90%", minWidth : "300px", background : "#0f0b1f"}}>

            <div className={styles["dashboard-head"]}>
                <Link to="/cardsandbanks" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <h4>My Banks</h4>
                    <span style={{ fontSize: '0.8rem', color: '#f1109b', cursor: 'pointer' }}>View All &rarr;</span>
                </Link>
            </div>  
            
            <div className={styles["dashboard-content-banks"]} style={{ width: '100%', padding: '0 5%' }}>
                {banks.length > 0 ? (
                    banks.map((bank, index) => (
                        <div key={index} style={{ 
                            width: "100%", 
                            background: "#16102f", 
                            borderRadius: "12px",
                            padding: "15px",
                            marginBottom: "10px",
                            display: "flex",
                            alignItems: "center",
                            borderLeft: "3px solid #f1109b" // Detalhe rosa na esquerda
                        }}>
                            {/* Ícone Simulado */}
                            <div style={{ 
                                width: '35px', height: '35px', borderRadius: '50%', 
                                background: 'rgba(241, 16, 155, 0.1)', color: '#f1109b',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginRight: '15px', fontWeight: 'bold'
                            }}>
                                🏛️
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{bank.institution?.name}</span>
                                <span style={{ color: '#aaa', fontSize: '0.8rem' }}>{capitalize(bank.account_type)} Account</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ color: '#666' }}>No banks added.</p>
                )}
            </div>
        
        </PiggyBox>
    )

    return BANKS_LIST
}