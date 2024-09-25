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

function PoissonGraph() {


  const [probabilityData, setProbabilityData] = useState([]);
  const [numberOfTickets, setNumberOfTickets] = useState(0)
  const [startTime,setStartTime] = useState(Date.now())
  const [rate,setRate]= useState(0)    
  const kValues = Array.from({ length: 20 }, (_, i) => i); // x-axis, tickets (0 to 19)

  useEffect(()=>{
    if(numberOfTickets==0){

      setStartTime(Date.now())
    }
    
  },[])
  useEffect(()=>{
    const updateRate = () => {
      console.log("regular update")
      console.log(numberOfTickets)
      
      const currentTime = Date.now();
      const timeElapsed = (currentTime - startTime) / 10000; // Convert milliseconds to seconds
      console.log(timeElapsed)
      if (timeElapsed > 1) {
        setRate(Math.floor(numberOfTickets / timeElapsed)); // Calculate tickets per second
      }
    };

    // Update rate every second
    const intervalId = setInterval(updateRate, 10000);
    return () => clearInterval(intervalId)
  },[numberOfTickets, startTime])

  const handleClick = () => {
    let newNumber = numberOfTickets+1
    setNumberOfTickets(newNumber)
   
  };

  useEffect(() => {
    const generateProbabilities = () => {
      const probabilities = kValues.map(k => poissonProbability(rate, k));
      setProbabilityData(probabilities);
    };

    generateProbabilities(); // Generate data when lambda changes
  }, [rate]);

  const data = {
    labels: kValues,
    datasets: [
      {
        label: `Poisson Probability (λ = ${rate})`,
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
    <>
    
     <div>
      <h2 className="card-title">Poisson Distribution of Tickets</h2>
      <Line data={data} options={options} />
    </div>
    <button onClick={handleClick} style={{
          position: 'absolute', 
          color: 'black', 
          padding: '100px 20px', 
          border: 'none', 
          borderRadius: '5px',
          cursor: 'pointer'
        }}/>
    </>
  );
}

export default PoissonGraph;
