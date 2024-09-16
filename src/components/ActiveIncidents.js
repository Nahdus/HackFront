import React from 'react';

const activeTickets = [
  { id: 1, category: 'Incident 1', description: 'Server down in Region A' },
  { id: 2, category: 'Incident 2', description: 'Latency detected in Region B' },
  { id: 3, category: 'Incident 3', description: 'Network issue in Region C' },
];

function ActiveIncidents() {
  return (
    <div className="incident-list active-incidents">
      <h3>Active Incidents</h3>
      {activeTickets.map((ticket) => (
        <div key={ticket.id} className="incident-card">
          <strong>{ticket.category}</strong>
          <p>{ticket.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ActiveIncidents;
