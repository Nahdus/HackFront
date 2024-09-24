import React, { useState, useEffect } from 'react';

const WebSocketComponent = ({ onMessage }) => {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const webSocket = new WebSocket('ws://localhost:8080');
    setWs(webSocket);

    webSocket.onmessage = (event) => {
      console.log('WebSocket message received:', event.data);
      if (onMessage) {
        onMessage(event.data); 
      }
    };

    return () => {
      if (webSocket) {
        webSocket.close();
      }
    };
  }, [onMessage]);

  return null; 
};

export default WebSocketComponent;
