import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import NewTicketComponent from './components/NewTicketComponent'; // Ensure correct path
import SettingsComponent from './components/SettingsComponent'; 
import React, { useState } from 'react';
import Header from './components/Header';

function App() {
  const [activeComponent, setActiveComponent] = useState('dashboard'); // Default to 'dashboard'

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="app">
      <Header onButtonClick={handleButtonClick} />
      <main>
        {activeComponent === 'dashboard' && <Dashboard />}
        {activeComponent === 'newTicket' && <NewTicketComponent />}
        {activeComponent === 'settings' && <SettingsComponent />}
      </main>
    </div>
  );
}


export default App;
