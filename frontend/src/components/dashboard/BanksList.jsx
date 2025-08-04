import { useState, useEffect } from "react";
import * as financeServices from "../../services/financeServices";
import DarkBox from "../DarkBox"
import styles from './Dashboard.module.css'
import { fetchBanks } from "../../services/financeServices";

export default function BanksList() {

    const [banks, setBanks] = useState([]);
    
        useEffect(() => {
            fetchData();
        }, []);
    
        const fetchData = async () => {
            const fetchedbanks = await fetchBanks();
            if (fetchedbanks) {
                const names = fetchedbanks.map(item => item.institution.name);
                setBanks(names);
            }
        };

    const BANKS_LIST = (
        <DarkBox style = {{ width : "45%", height : "90%", minwidth : "300px", background : "#0f0b1f"}}>

            <div className={styles["dashboard-head"]}>
                <h4>Banks</h4>
            </div>  
            
            <div className={styles["dashboard-content-banks"]}>
                {
                banks.map((element, index) => (
                    <DarkBox key={index} to="/login" style = {{  width:"90%", height : "25%", background : "#16102f", justifyContent : 'center', alignItems : 'flex-start', padding : '8%' }}>{element}</DarkBox>
                ))
                }
            </div>
        
        </DarkBox>
    )

    return BANKS_LIST
}
