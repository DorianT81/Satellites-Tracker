import logo from './logo.svg';
import './App.css';
import sat from './data/sat.json';
import Earth from './components/Earth';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useState } from 'react';
import Satellites from './components/Satellites';
import List from './components/List';

function App() {
  let [showSat, SetShowSat] = useState(false);
  let SatList = [];
  for (let i = 0; i < sat.length; i++) {
      SatList.push(sat[i]);
  }

  let slicedSatList = SatList.slice(0, SatList.length / 50); // Affiche seulement les 10 premiers satellites

  return (
    

    // On utilise THree JS pour afficher la Terre et les satellites en 3D
    <div className="container">
        <div className="btn-list-container" style={{ backgroundColor: "#fff", color: 'white'}}>
        <button
          onClick={() => {
            SetShowSat(!showSat);
            console.log('showSat', showSat);
          }}
          className="btn"
        >
          Toggle Satellites
        </button>

        <List className="sat-list" satellites={slicedSatList} />
        </div>
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 3, 5]} intensity={2} />

          <Earth />
          {showSat && <Satellites satellites={slicedSatList} />}
          <OrbitControls
            enablePan={false}
            minDistance={3}
            maxDistance={15}
          />
        </Canvas>
      </div>
      </div>
  );
}

function getPosition(t, satellite, height = 5) {
  const angle = satellite.initialAngle + satellite.angularVelocity * t;

  return {
    x: satellite.radius * Math.cos(angle),
    y: satellite.radius * Math.sin(angle),
    z: height
  };
}



export default App;
