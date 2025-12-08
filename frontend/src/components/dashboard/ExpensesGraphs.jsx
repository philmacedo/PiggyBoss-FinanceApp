import * as dashboardServices from "../../services/dashboardServices"
import PiggyBox from "../PiggyBox"
import { Doughnut } from 'react-chartjs-2'; 
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from './Dashboard.module.css'
import { useEffect, useState } from "react";

// Registrar elementos do ChartJS
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpensesGraphs() {
  const [graphData, setGraphData] = useState(null);
  const today = new Date()
  const month = today.getMonth() + 1
  const year = today.getFullYear()

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async () => {
    const fetchedData = await dashboardServices.fetchCategoryExpensesDistribution({ month, year })

    if(fetchedData){
      const labels = fetchedData.map(item => item.category);
      const values = fetchedData.map(item => item.total);
  
      const formattedData = {
        labels: labels,
        datasets: [
          {
            label: 'R$',
            data: values,
            // Cores vibrantes para contrastar com o fundo escuro
            backgroundColor: [
              '#FF66C4', // Pink (Padrão do app)
              '#36A2EB', // Azul
              '#FFCE56', // Amarelo
              '#4BC0C0', // Turquesa
              '#9966FF', // Roxo Claro
              '#FF9F40'  // Laranja
            ],
            borderColor: '#0f0b1f', // Borda da cor do fundo para separar fatias
            borderWidth: 2,
          },
        ],
      };
        setGraphData(formattedData);
    }
  }

  const options = {
    plugins: {
      legend: {
        position: 'right', // Legenda na direita fica mais elegante
        labels: { color: 'white' }
      }
    },
    maintainAspectRatio: false
  };

  return (
      <PiggyBox style = {{ width : "95%", height : "90%", background : "#0f0b1f" }}>
          <div className={styles["dashboard-head"]}>
              <h4>Expenses Distribution</h4>
          </div>
          <div style={{ width: '95%', height: '80%', display: 'flex', justifyContent: 'center' }}>
              {graphData ? <Doughnut data={graphData} options={options} /> : <p>Loading data...</p>}
          </div>
      </PiggyBox>
  )
}