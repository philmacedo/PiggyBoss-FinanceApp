import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // <-- 1. IMPORTAR O LINK
import * as financeServices from "../../services/financeServices";
import PiggyBox from "../PiggyBox"
import styles from './Dashboard.module.css'
import { fetchBanks } from "../../services/financeServices";
import { capitalize } from "@mui/material";

export default function BanksList() {

    const [banks, setBanks] = useState([]);
    
        useEffect(() => {
            fetchData();
        }, []);
    
        const fetchData = async () => {
            const fetchedbanks = await fetchBanks();
            if (fetchedbanks) {
                const names = fetchedbanks.map(item => `${item.institution?.name} - ${capitalize(item.account_type)}`);
                setBanks(names);
            }
        };

    const BANKS_LIST = (
        <PiggyBox style = {{ width : "45%", height : "90%", minwidth : "300px", background : "#0f0b1f"}}>

            <div className={styles["dashboard-head"]}>
                <Link to="/cardsandbanks" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h4>Banks</h4>
                </Link>
            </div>  
            
            <div className={styles["dashboard-content-banks"]}>
                {
                banks.map((element, index) => (
                    <PiggyBox key={index} to="/login" style = {{  width:"90%", height : "25%", background : "#16102f", justifyContent : 'center', alignItems : 'flex-start', padding : '8%' }}>{element}</PiggyBox>
                ))
                }
            </div>
        
        </PiggyBox>
    )

    return BANKS_LIST
}
