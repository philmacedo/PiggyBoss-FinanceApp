import DarkBox from "../DarkBox"
import styles from './Dashboard.module.css'

const budgets = [
    {
        budget : "Food",
        current : 100,
        total : 1000,
    },
    {
        budget : "Market",
        current : 100,
        total : 1000,
    },
    {
        budget : "Shop",
        current : 100,
        total : 1000,
    },
]

export default function BudgetsOverview({}) {

    const BUDGETS_OVERVIEW = (
        <DarkBox style = {{ width : "45%", height : "90%", minwidth : "300px", background : "#0f0b1f"}}>
        
            <div className={styles["dashboard-head"]}>
                <h4>Budgets</h4>
            </div>

            <div className={styles["dashboard-content-invoices"]}>
                {
                    budgets.forEach(element => {
                        <DarkBox to="/login" style = {{  width:"90%", height : "25%", background : "#16102f", flexDirection:"row", justifyContent : 'space-between', alignItems : 'center', padding : '5%' }}>
                            <p>{element.budget}</p>
                            <p>R$ {element.current} / {element.total}</p>
                        </DarkBox> 
                    })
                }             
            </div>
        </DarkBox>
    )
    
    return BUDGETS_OVERVIEW
}