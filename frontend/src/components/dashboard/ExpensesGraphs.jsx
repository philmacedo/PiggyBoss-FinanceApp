import * as dashboardServices from "../../services/dashboardServices"
import API from "../../utils/api" // Importando API para buscar as categorias e suas cores
import PiggyBox from "../PiggyBox"
import { Doughnut } from 'react-chartjs-2'; 
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from './Dashboard.module.css'
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpensesGraphs() {
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(true);
  const today = new Date()
  const month = today.getMonth() + 1
  const year = today.getFullYear()

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async () => {
    try {
        setLoading(true);
        // 1. Busca os dados de distribuição (Valores)
        // Se der erro 404 aqui, verifique o arquivo services/dashboardServices.js
        const fetchedData = await dashboardServices.fetchCategoryExpensesDistribution({ month, year });

        // 2. Busca as categorias (Para pegar as Cores que o usuário escolheu)
        const categoriesRes = await API["finance"].get("/category/");
        const categories = categoriesRes.data;

        if(fetchedData && categories){
            // Cria um mapa de cores: { 'NomeCategoria': '#CorEscolhida' }
            const colorMap = {};
            categories.forEach(cat => {
                // Normaliza o nome para minúsculo para evitar erros de 'Alimento' vs 'alimento'
                colorMap[cat.name.toLowerCase()] = cat.color;
            });

            const labels = fetchedData.map(item => item.category);
            const values = fetchedData.map(item => item.total);
            
            // Busca a cor correta no mapa. Se não achar, usa um cinza padrão.
            const bgColors = fetchedData.map(item => {
                const catName = item.category ? item.category.toLowerCase() : '';
                return colorMap[catName] || '#555555'; 
            });
        
            const formattedData = {
                labels: labels,
                datasets: [
                {
                    label: 'R$',
                    data: values,
                    backgroundColor: bgColors, // Usa as cores reais das categorias
                    borderColor: '#0f0b1f',
                    borderWidth: 2,
                },
                ],
            };
            setGraphData(formattedData);
        }
    } catch (error) {
        console.error("Erro ao carregar gráfico:", error);
    } finally {
        setLoading(false);
    }
  }

  const options = {
    plugins: {
      legend: {
        position: 'right',
        labels: { color: 'white', font: { size: 12 } }
      }
    },
    maintainAspectRatio: false
  };

  return (
      <PiggyBox style = {{ width : "95%", height : "90%", background : "#0f0b1f" }}>
          <div className={styles["dashboard-head"]}>
              <h4>Expenses Distribution</h4>
          </div>
          <div style={{ width: '95%', height: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {loading ? (
                  <p style={{color: '#888'}}>Loading...</p>
              ) : graphData ? (
                  <Doughnut data={graphData} options={options} />
              ) : (
                  <p style={{color: '#888'}}>No expenses this month.</p>
              )}
          </div>
      </PiggyBox>
  )
}