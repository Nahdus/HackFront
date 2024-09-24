import React, { useEffect } from 'react';

function NewTicketComponent({ onNewTicket }) {
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
      try {
        const ticketData = JSON.parse(event.data); // Parse the incoming ticket data
        console.log('Data received from WebSocket:', ticketData);

        onNewTicket(ticketData); // Pass the ticket data to the parent component
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    // Clean up the WebSocket connection when component unmounts
    return () => {
      ws.close();
    };
  }, [onNewTicket]);

  return null; // No UI rendering for this component
}

export default NewTicketComponent;
