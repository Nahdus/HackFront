import React, { useState, useEffect } from 'react';
import NewTicketComponent from './NewTicketComponent';

function ActiveIncidents() {
    const [activeTickets, setActiveTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null); // For the popup with full details

    // Function to handle receiving new tickets
    const handleNewTicket = (ticketData) => {
        const receivedTicket = ticketData
        const newTicket = {
            id: activeTickets.length + 1, // Generate new ID
            nodeID: receivedTicket.Node_ID, // Correctly use Node_ID from the ticket data
            category: receivedTicket.Ticket_created, // Correctly use Ticket_created from the ticket data
            ticketID: receivedTicket.Ticket_ID, // Correctly use Ticket_ID from the ticket data
            timeOfGeneration: receivedTicket.Time, // Correctly use Time from the ticket data
            description: receivedTicket.Description, // Description from the ticket data
            priority: receivedTicket.Priority || 'P3', // Default priority to P3 if none provided
            ticketData: receivedTicket, // Store the full data for the popup
        };

        console.log("New ticket to be added:", newTicket); // Log the new ticket object

        setActiveTickets((prevTickets) => [...prevTickets, newTicket]);
    };

   

    const handleTicketClick = (ticketData) => {
        setSelectedTicket(ticketData);
    };

    const closePopup = () => {
        setSelectedTicket(null);
    };

    return (
        <div className="incident-list active-incidents">
            <h3>Active Incidents</h3>
            <NewTicketComponent onNewTicket={handleNewTicket} />
            <div className="scroll-class">
                {activeTickets.map((ticket) => (
                    <div
                        key={ticket.id}
                        className={`incident-card priority-${ticket.priority.toLowerCase()}`} // Safe class assignment for priority
                    >
                        <div className="ticket-header">
                            <strong>Node ID: {ticket.nodeID || "Unknown"}</strong> {/* Node ID */}
                            <div className="ticket-header-info">
                                <span
                                    className="ticket-category"
                                    onClick={() => handleTicketClick(ticket.ticketData)} // Handle click to show popup
                                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                >
                                    {ticket.category || "Unknown Category"} (ID: {ticket.ticketID || "Unknown"})
                                </span>
                                <span className="ticket-time">
                                    {new Date(ticket.timeOfGeneration).toString() !== "Invalid Date"
                                        ? new Date(ticket.timeOfGeneration).toLocaleString()
                                        : "Invalid Time"}
                                </span>
                            </div>
                        </div>
                        <p className="ticket-description">{ticket.description || "No description available"}</p>
                    </div>
                ))}
            </div>

            {/* Popup to show ticket details */}
            {selectedTicket && (
    <div className="ticket-popup-overlay">
        <div className="ticket-popup">
            <h4 className="ticket-popup-title">Ticket Details</h4>
            <div className="ticket-popup-content">
                <div className="ticket-detail">
                    <strong>Node ID:</strong> <span>{selectedTicket.Node_ID}</span>
                </div>
                <div className="ticket-detail">
                    <strong>Category:</strong> <span>{selectedTicket.Ticket_created}</span>
                </div>
                <div className="ticket-detail">
                    <strong>Ticket ID:</strong> <span>{selectedTicket.Ticket_ID}</span>
                </div>
                <div className="ticket-detail">
                    <strong>Priority:</strong> <span>{selectedTicket.Priority}</span>
                </div>
                <div className="ticket-detail">
                    <strong>Description:</strong> <span>{selectedTicket.Description}</span>
                </div>
                <div className="ticket-detail">
                    <strong>Time Created:</strong> <span>{new Date(selectedTicket.Time).toLocaleString()}</span>
                </div>
            </div>
            <button className="ticket-close-popup" onClick={closePopup}>Close</button>
        </div>
    </div>
)}

        </div>
    );
}

export default ActiveIncidents;
