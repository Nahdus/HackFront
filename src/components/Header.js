import React, { useState } from 'react';

function Header({ onButtonClick }) {
    return (
      <div className="header">
        <h1>Ticket App</h1>
        <div className="header-right">
          <button onClick={() => onButtonClick('newTicket')}>New Ticket</button>
          <button onClick={() => onButtonClick('dashboard')}>Dashboard</button>
          <button onClick={() => onButtonClick('settings')}>Settings</button>
        </div>
      </div>
    );
  }

export default Header;
