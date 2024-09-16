import React from 'react';

const resolvedTickets = [
  { id: 1, category: 'Incident 1', description: 'Server restored in Region A' },
  { id: 2, category: 'Incident 2', description: 'Latency resolved in Region B' },
  { id: 3, category: 'Incident 3', description: 'Network issue fixed in Region C' },
];

function ResolvedIncidents() {
  return (
    <div className="incident-list resolved-incidents">
      <h3>Resolved Incidents</h3>
      {resolvedTickets.map((ticket) => (
        <div key={ticket.id} className="incident-card">
          <strong>{ticket.category}</strong>
          <p>{ticket.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ResolvedIncidents;
