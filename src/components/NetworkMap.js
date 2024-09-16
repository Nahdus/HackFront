import React, { useState, useRef, useEffect } from 'react';

function NetworkMap() {
  return (
    <div className="card">
      <h2 className="card-title">Network Map</h2>
      <div className="network-map">
        {/* <div className="network-node node-green"></div>
        <div className="network-node node-yellow"></div>
        <div className="network-node node-red"></div> */}
        <img src='react-vis-force.gif'></img>
      </div>
    </div>
  );
}
  
export default NetworkMap;
