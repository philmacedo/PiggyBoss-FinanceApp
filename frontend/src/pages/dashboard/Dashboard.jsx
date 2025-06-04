import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";
import DarkBox from "../../components/DarkBox";
import PinkButton from "../../components/PinkButton";
import SimpleCard from "../../components/SimpleCard";
import SelectButton from "../../components/SelectButton";
import SimpleRadio from "../../components/SimpleRadio";
import BarGraph from "../../components/BarGraph";

export default function Dashboard(){
    useEffect(() => {
        document.title = "Dashboard"
        document.body.style.backgroundColor = '#17142a';
        return () => {
            document.title = ''
            document.body.style.backgroundColor = '';
        };
    }, []);

    const DASHBOARD = (
        <div className={styles["dashboard"]}>

            <div className={styles["dashboard-item"]}>

                <DarkBox style = {{width : "95%", height : "90%", minwidth : "600px", background : "#0f0b1f"}}>

                    <div className={styles["dashboard-head"]}>
                        <h4>This month</h4>
                    </div>

                    <div className={styles["dashboard-content-expenses"]}>
                        <SimpleCard title="Balance" value="1234.50" width="90%" height="70%"/>
                        <SimpleCard title="Current Bill" value="500.50" width="90%" height="70%"/>

                        <div className={styles["remaining"]}>
                            <p>Total Expenses</p>
                            <p>550.50</p>
                        </div>
                        
                        <div className={styles["remaining"]}>
                            <p>Remaining Balance Planned</p>
                            <p>550.50</p>
                        </div>
                    </div>

                </DarkBox>

            </div>

            <div className={styles["dashboard-item"]}>

                <DarkBox style = {{ width : "45%", height : "90%", minwidth : "300px", background : "#0f0b1f"}}>

                    <div className={styles["dashboard-head"]}>
                        <h4>Expenses</h4>
                    </div>
        
                    <div className={styles["dashboard-content-expense"]}>
                        <SelectButton label="Card" options={['Nubank', 'Nubank', 'Nubank']} width="85%" />
                        <SimpleRadio options={['Credit', 'Debit']} width="70%" />
                        <PinkButton text="Add Expense" style = {{ width:"50%", height:"25%", backgroundColor:"#f1109b", minWidth: "100px", minHeight: "60px"  }}  />
                    </div>

                </DarkBox>

                <DarkBox style = {{ width : "45%", height : "90%", minwidth : "300px", background : "#0f0b1f"}}>

                    <div className={styles["dashboard-head"]}>
                        <h4>Banks</h4>
                    </div>  
                    
                    <div className={styles["dashboard-content-banks"]}>
                        <DarkBox to="/login" style = {{  width:"90%", height : "25%", background : "#16102f", justifyContent : 'center', alignItems : 'flex-start', padding : '8%' }}>Nubank</DarkBox>
                        <DarkBox to="/login" style = {{  width:"90%", height : "25%", background : "#16102f", justifyContent : 'center', alignItems : 'flex-start', padding : '8%' }}>Nubank</DarkBox>
                        <DarkBox to="/login" style = {{  width:"90%", height : "25%", background : "#16102f", justifyContent : 'center', alignItems : 'flex-start', padding : '8%' }}>Nubank</DarkBox>
                        <DarkBox to="/login" style = {{  width:"90%", height : "25%", background : "#16102f", justifyContent : 'center', alignItems : 'flex-start', padding : '8%' }}>Nubank</DarkBox>
                    </div>

                </DarkBox>

            </div>

            <div className={styles["dashboard-item"]}>

                <DarkBox style = {{ width : "95%", height : "90%", background : "#0f0b1f" }}>
                    <div className={styles["dashboard-head"]}>
                        <h4 >Expenses Planning by Category</h4>
                    </div>
                    <div className={styles["dashboard-content-expenses-planning"]} style={{ width: '95%', height: '80%' }}>
                        <BarGraph />
                    </div>
                </DarkBox>

            </div>

            <div className={styles["dashboard-item"]}>

                <DarkBox style = {{ width : "45%", height : "90%", minwidth : "300px", background : "#0f0b1f"}}>

                    <div className={styles["dashboard-head"]}>
                        <h4>Budgets</h4>
                    </div>

                    <div className={styles["dashboard-content-invoices"]} style = {{ }}>
                        <DarkBox to="/login" style = {{  width:"90%", height : "25%", background : "#16102f", flexDirection:"row", justifyContent : 'space-between', alignItems : 'center', padding : '5%' }}>
                        <p>Food</p>
                        <p>R$ 100 / 1000</p>
                        </DarkBox>
                        <DarkBox to="/login" style = {{  width:"90%", height : "25%", background : "#16102f", flexDirection:"row", justifyContent : 'space-between', alignItems : 'center', padding : '5%' }}>
                        <p>Shop</p>
                        <p>R$ 100 / 1000</p>
                        </DarkBox>                    
                    </div>

                    <div style = {{ margin: '5%', width: '85%', height: '10%', display: 'flex', justifyContent : 'space-between', alignItems : 'center' }}>
                        <p>Total</p>
                        <p>200.50</p>
                    </div>

                </DarkBox>

                <DarkBox style = {{ width : "45%", height : "90%", minwidth : "300px", background : "#0f0b1f"}} >

                    <div className={styles["dashboard-head"]}>
                        <h4>Invoices</h4>
                    </div>

                    <div className={styles["dashboard-content-invoices"]} style = {{ }}>
                        <DarkBox to="/login" style = {{  width:"90%", height : "25%", background : "#16102f", flexDirection:"row", justifyContent : 'space-between', alignItems : 'center', padding : '5%' }}>
                        <p>Nubank</p>
                        <p>R$ 100</p>
                        </DarkBox>
                        <DarkBox to="/login" style = {{  width:"90%", height : "25%", background : "#16102f", flexDirection:"row", justifyContent : 'space-between', alignItems : 'center', padding : '5%' }}>
                        <p>Nubank</p>
                        <p>R$ 100</p>
                        </DarkBox>                    
                    </div>

                    <div style = {{ margin: '5%', width: '85%', height: '10%', display: 'flex', justifyContent : 'space-between', alignItems : 'center' }}>
                        <p>Total</p>
                        <p>200.50</p>
                    </div>

                </DarkBox>

            </div>
        </div>
    )

    return DASHBOARD
}
