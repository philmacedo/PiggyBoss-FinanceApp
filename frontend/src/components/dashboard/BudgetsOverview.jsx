import * as dashboardServices from "../../services/dashboardServices";
import { useEffect, useState } from "react";
import PiggyBox from "../PiggyBox";
import styles from "./Dashboard.module.css";

export default function BudgetsOverview() {
  const [budgets, setBudgets] = useState([]);
  const [totalBudgetsLimit, setTotalBudgetsLimit] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  // Função para calcular cor baseada na porcentagem
  const getProgressColor = (percent) => {
    if (percent > 100) return '#c0392b'; // Vermelho (Estourou)
    if (percent > 80) return '#e67e22'; // Laranja (Alerta)
    return '#2ecc71'; // Verde (OK)
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const fetchedBudgets = await dashboardServices.fetchMonthlyBudgets({ month, year });

    if (fetchedBudgets) {
      setBudgets(fetchedBudgets);
      
      const spentSum = fetchedBudgets.reduce((acc, curr) => acc + curr.spent, 0);
      const totalLimit = fetchedBudgets.reduce((acc, curr) => acc + parseFloat(curr.limit_value), 0);
      setTotalSpent(spentSum);
      setTotalBudgetsLimit(totalLimit);
    }
  };

  const BUDGETS_OVERVIEW = (
    <PiggyBox style={{ width: "45%", height: "90%", minWidth: "300px", background: "#0f0b1f" }}>
      <div className={styles["dashboard-head"]}>
        <h4>Budgets</h4>
      </div>

      <div className={styles["dashboard-content-invoices"]}>
        {budgets.map((element, index) => {
          const percent = Math.min((element.spent / element.limit_value) * 100, 100);

          // ADICIONADO: return (...) para renderizar o JSX
          return (
            <PiggyBox key={index} style={{ width:"90%", height: "auto", background: "#16102f", padding: '15px', marginBottom: '10px' }}>
              
              {/* Header do item (Nome e Valor) */}
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '5px' }}>
                <p style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.9rem', margin: 0 }}>
                    {element.category_name}
                </p>
                <p style={{ fontSize: '0.8rem', color: '#ccc', margin: 0 }}>
                   R$ {parseFloat(element.spent).toFixed(0)} / {parseFloat(element.limit_value).toFixed(0)}
                </p>
              </div>

              {/* Barra de Progresso */}
              <div style={{ width: '100%', height: '8px', backgroundColor: '#333', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  width: `${percent}%`,
                  height: '100%',
                  backgroundColor: getProgressColor(percent),
                  transition: 'width 0.5s ease-in-out'
                }}></div>
              </div>

            </PiggyBox>
          );
        })}
      </div>
      
      {/* Rodapé com Total (Opcional, se quiser manter) */}
      <div style = {{ margin: '5%', width: '85%', height: '10%', display: 'flex', justifyContent : 'space-between', alignItems : 'center' }}>
        <p>Total</p>
        <p>R$ {totalSpent.toFixed(2)} / {totalBudgetsLimit.toFixed(2)}</p>
      </div>

    </PiggyBox>
  );

  return BUDGETS_OVERVIEW;
}