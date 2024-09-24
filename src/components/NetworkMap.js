import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

function Node({ position, color, size }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function Edge({ start, end }) {
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  return <Line points={points} color="green" lineWidth={1} />;
}

function Traffic({ path, count }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <TrafficBall key={index} path={path} index={index} totalCount={count} />
      ))}
    </>
  );
}

function TrafficBall({ path, index, totalCount }) {
  const meshRef = useRef();
  const [progress, setProgress] = useState(index / totalCount); // Stagger start based on index

  useFrame(() => {
    const speed = 0.005; // Adjust speed as necessary
    setProgress((prev) => (prev + speed) % 1); // Update progress continuously
    const point = new THREE.Vector3().lerpVectors(
      new THREE.Vector3(...path[0]),
      new THREE.Vector3(...path[1]),
      progress
    );
    meshRef.current.position.copy(point);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshBasicMaterial color="purple" />
    </mesh>
  );
}



function NetworkMap({ nodesData, edgesData, trafficCount }) {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef();

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const coordLimits = (
    <div className="coordinate-limits">
      <h2 className= "card-title">Network Map</h2>
    </div>
  );

  return (
    <div>
      <div className="header-container">
        <h2 className="card-title">Network Map</h2>
        <div className="network-map" onClick={handleClick}>
          <p>{isOpen ? "Collapse Network Map" : "Expand Network Map"}</p>
        </div>
      </div>
      
      {/* Always visible Canvas */}
      <div className="canvas-container">
        <Canvas>
          {nodesData.map((node) => (
            <Node key={node.id} position={node.position} size={node.size} color={node.color} />
          ))}
          {edgesData.map((edge, index) => (
            <Edge key={index} start={edge.start} end={edge.end} />
          ))}
          {edgesData.map((edge, index) => (
            <Traffic key={index} path={[edge.start, edge.end]} count={trafficCount} />
          ))}
        </Canvas>
      </div>

      {isOpen && (
        <div className="popup" ref={popupRef}>
          <button className="close-button" onClick={handleClick}>X</button>
          {coordLimits}
          <div className="expanded-canvas-container">
            <Canvas>
              {nodesData.map((node) => (
                <Node key={node.id} position={node.position} size={node.size} color={node.color} />
              ))}
              {edgesData.map((edge, index) => (
                <Edge key={index} start={edge.start} end={edge.end} />
              ))}
              {edgesData.map((edge, index) => (
                <Traffic key={index} path={[edge.start, edge.end]} count={trafficCount} />
              ))}
            </Canvas>
          </div>
        </div>
      )}
    </div>
  );
}


export default NetworkMap;
