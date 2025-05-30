import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ['Market', 'Uber', 'Restaurant', 'Clothes', 'Food', 'Food', 'Food', 'Food', 'Food', 'Food', 'Food', 'Food', 'Food', 'Food', 'Food'],
  datasets: [
    {
      label: 'Credit',
      data: [500, 800, 650, 700, 900 ,500, 800, 650, 700, 900, 500, 800, 650, 700, 900],
      backgroundColor: '#FF66C4',
    },
    {
      label: 'Debit',
      data: [650, 700, 900, 500, 800, 650, 700, 900, 500, 800, 650, 700, 900 ,500, 800 ],
      backgroundColor: '#710d9b',
    }
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: false,
      text: 'Gastos Mensais',
    },
  },
};

export default function BarGraph({ style }) {
  return <Bar data={data} options={options} style={{...style }}/>;
}
