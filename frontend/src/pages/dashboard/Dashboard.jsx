import { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import DarkBox from "../../components/DarkBox";
import PinkButton from "../../components/PinkButton";
import SimpleCard from "../../components/SimpleCard";
import SelectButton from "../../components/SelectButton";
import SimpleRadio from "../../components/SimpleRadio";

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

                <DarkBox width="95%" height="90%" minwidth="600px" background="#0f0b1f">

                    <div className={styles["dashboard-head"]}>
                        <h4 style={{ padding: "0 5% 0 0" }}>This month</h4>
                        <h4>Nubank</h4>
                    </div>

                    <div className={styles["dashboard-content-expenses"]}>
                        <SimpleCard title="Current Bill" value="1234.50" width="90%" height="70%"/>
                        <SimpleCard title="Total Expenses" value="500.50" width="90%" height="70%"/>

                        <div className={styles["remaining"]}>
                            <p>Remaining Balance Planned</p>
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

                <DarkBox width="45%" height="90%" minwidth="300px" background="#0f0b1f">

                    <div className={styles["dashboard-head"]}>
                        <h4>Balance</h4>
                    </div>
        
                    <div className={styles["dashboard-content-balance"]}>
                        <SelectButton label="Card" options={['Nubank', 'Nubank', 'Nubank']} width="85%" />
                        <SimpleRadio options={['Credit', 'Debit']} width="70%" />
                        <PinkButton text="Add Expense" width="50%" height="25%" color="#f1109b" />
                    </div>

                </DarkBox>

                <DarkBox width="45%" height="90%" minwidth="300px" background="#0f0b1f">

                    <div className={styles["dashboard-head"]}>
                        <h4>Banks</h4>
                    </div>  
                    
                    <div className={styles["dashboard-content"]}>
                        <DarkBox> <p>Nubank</p> </DarkBox>
                        <DarkBox> <p>Nubank</p> </DarkBox>
                    </div>

                </DarkBox>

            </div>

            <div className={styles["dashboard-item"]}>

                <DarkBox width="95%" height="90%" background="#0f0b1f">
                    <div className={styles["dashboard-head"]}>
                        <p>Expenses Planning by Category</p>
                        <p>This month</p>
                    </div>
                    <div className={styles["dashboard-content"]}>

                    </div>
                </DarkBox>

            </div>

            <div className={styles["dashboard-item"]}>

                <DarkBox width="95%" height="90%" background="#0f0b1f">

                    <div className={styles["dashboard-head"]}>
                        <p>Invoices</p>
                    </div>

                    <div className={styles["dashboard-content"]}>
                        <DarkBox> <p>Nubank</p> </DarkBox>
                        <DarkBox> <p>Nubank</p> </DarkBox>
                        <DarkBox> <p>Nubank</p> </DarkBox>
                        <DarkBox> <p>Nubank</p> </DarkBox>
                    </div>

                    <div>
                        <p>Total</p>
                        <p>2500.50</p>
                    </div>

                </DarkBox>

            </div>
        </div>
    )

    return DASHBOARD
}