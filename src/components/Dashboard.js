import React from 'react';
import IncidentHistogram from './IncidentHistogram'; 
import ActiveIncidents from './ActiveIncidents';
import ResolvedIncidents from './ResolvedIncidents'; 
import NetworkMap from './NetworkMap'; 
import RealTimeAutomation from './RealTimeAutomation'; 
import WordCloudPage from './wordcloud';
function Dashboard() {
  return (
    <div className="dashboard">
      <div className="live-ticker">
        <div className="ticker-content">
          Breaking News: Server Down in Region A... Latency Detected in Region C... System Restored in Region B...
        </div>
      </div>

      <div className="dashboard-grid">
        <IncidentHistogram />
        <div>
        <h3 className= "card-title">Tickets Action</h3>

        <div className="incident-container">
          <ActiveIncidents />
          <ResolvedIncidents />
        </div>
        </div>
        <NetworkMap />
        <RealTimeAutomation />
        <WordCloudPage />
      </div>
     
    </div>
  

  );
}

export default Dashboard;
