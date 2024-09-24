import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Registering chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

// Factorial helper function
function factorial(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
}

// Poisson probability mass function
function poissonProbability(lambda, k) {
  return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
}

function PoissonGraph({ lambda }) {
  const [probabilityData, setProbabilityData] = useState([]);
  const kValues = Array.from({ length: 20 }, (_, i) => i); // x-axis, tickets (0 to 19)

  useEffect(() => {
    const generateProbabilities = () => {
      const probabilities = kValues.map(k => poissonProbability(lambda, k));
      setProbabilityData(probabilities);
    };

    generateProbabilities(); // Generate data when lambda changes
  }, [lambda]);

  const data = {
    labels: kValues,
    datasets: [
      {
        label: `Poisson Probability (λ = ${lambda})`,
        data: probabilityData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Probability',
        },
        ticks: {
          callback: (value) => (value * 100).toFixed(0) + '%', // Format y-axis as percentage
        },
      },
      x: {
        title: {
          display: true,
          text: 'Number of Tickets (k)',
        },
      },
    },
  };

  return (
    <div>
      <h2 className="card-title">Poisson Distribution of Tickets</h2>
      <Line data={data} options={options} />
    </div>
  );
}

export default PoissonGraph;
