import React from 'react';
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

function IncidentHistogram() {
  const data = {
    labels: ['Incident 1', 'Incident 2', 'Incident 3','Incident 4','Incident 5','Incident 6'], // Incident categories on the X-axis
    datasets: [
      {
        label: 'Frequency of Incidents', // Label for the Y-axis
        data: [5, 10, 3, 8, 7, 2], // Incident frequencies (Y-axis values)
        backgroundColor: '#3498db', // Blue bars
        borderColor: '#2980b9', // Darker blue border for bars
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // Show the legend
        position: 'top', // Position the legend
      },
    //   title: {
    //     display: true,
    //     text: 'Incident Histogram',
    //   },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Incident Categories', // Label for X-axis
        },
      },
      y: {
        title: {
          display: true,
          text: 'Frequency', // Label for Y-axis
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '450px' }}>
                <h3 className= "card-title">Bar Graph</h3>

      <Bar data={data} options={options} />
    </div>
  );
}

export default IncidentHistogram;
