import React, { useState } from 'react';
import IncidentHistogram from './IncidentHistogram'; 
import ActiveIncidents from './ActiveIncidents';
import ResolvedIncidents from './ResolvedIncidents'; 
import NetworkMap from './NetworkMap'; 
import RealTimeAutomation from './RealTimeAutomation'; 
import WordCloudPage from './wordcloud';
import PoissonGraph from './poissonDistribution';
import NewTicketComponent from './NewTicketComponent'; // Import your new component

function Dashboard() {
  const [incomingTickets, setIncomingTickets] = useState([]);
  const [predictedTickets, setPredictedTickets] = useState(0);

  // Function to process the incoming ticket data
  const processTicketData = (newTicket) => {
    const ticketTime = new Date(newTicket.Time).getTime(); // Convert time to milliseconds
    setIncomingTickets(prevTickets => {
      const updatedTickets = [...prevTickets, newTicket];
      calculatePrediction(updatedTickets, ticketTime);
      return updatedTickets;
    });
  };

  // Calculate predicted tickets for the next 5 minutes
  const calculatePrediction = (tickets, currentTime) => {
    if (tickets.length < 2) {
      setPredictedTickets(0); // Not enough data to predict
      return;
    }
  
    const intervals = [];
  
    for (let i = 1; i < tickets.length; i++) {
      const prevTime = new Date(tickets[i - 1].Time).getTime();
      const interval = (currentTime - prevTime) / 1000; // Interval in seconds
      intervals.push(interval);
    }
  
    // Calculate average interval
    const averageInterval = intervals.reduce((acc, val) => acc + val, 0) / intervals.length;
  
    // Calculate predicted number of tickets in the next 5 minutes (300 seconds)
    const rate = 1 / averageInterval; // Tickets per second
    const predictedIn5Minutes = Math.round(rate * 300); // Predict for 5 minutes
  
    setPredictedTickets(predictedIn5Minutes);
    return predictedIn5Minutes; // Return the predicted value
  };
  

  const nodes = [
    { id: 1, position: [-2, 0, 0], size: 0.2, color: 'pink' },
    { id: 2, position: [2, 0, 0], size: 0.2, color: 'purple' },
    { id: 3, position: [0, 1, 0], size: 0.4, color: 'green' },
    { id: 4, position: [-2, 1, 0], size: 0.2, color: 'yellow' },
    { id: 5, position: [2, 1, 1], size: 0.2, color: 'red' },
  ];

  const edges = [
    { start: [-2, 0, 0], end: [0, 1, 0] }, 
    { start: [2, 0, 0], end: [0, 1, 0] },  
    { start: [2, 1, 1], end: [2, 0, 0] },  
  ];

  return (
    <div className="dashboard">
      <div className="live-ticker">
        <div className="ticker-content">
          Breaking News: Server Down in Region A... Latency Detected in Region C... System Restored in Region B...
        </div>
      </div>

      <div className="dashboard-grid">
        <IncidentHistogram />
        <PoissonGraph lambda={predictedTickets} />

        <div>
          <h3 className="card-title">Tickets Action</h3>
          <div className="incident-container">
            <ActiveIncidents tickets={incomingTickets} />
            {/* <ResolvedIncidents /> */}
          </div>
        </div>
        <NetworkMap nodesData={nodes} edgesData={edges} trafficCount={10} />
        <RealTimeAutomation />
        <WordCloudPage />
      </div>

      {/* NewTicketComponent to receive ticket data */}
      <NewTicketComponent onNewTicket={processTicketData} />
    </div>
  );
}

export default Dashboard;
