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
  const [selectedSatellite, setSelectedSatellite] = useState(null);
  let [slicedSatList, setSlicedSatList] = useState([]);

  function handleSelectSatellite(satellite) { // On donne cette fonction à List.jsx pour qu'elle puisse mettre à jour le satellite sélectionné
    setSelectedSatellite(satellite);
    setSlicedSatList([...slicedSatList, satellite]);
    console.log('Liste des satellites à afficher : ', slicedSatList);
  } 

  function select1000Random() {
    setSlicedSatList([]);
    let tempList = [];
    for (let i=0; i<=3000;i++) {
      const randomInt = Math.floor(Math.random() * 5) + 1;
      if (sat[i * randomInt] != undefined) {
        tempList.push(sat[i * randomInt]);
        setClass(tempList[i], i * randomInt);
      } else {
        continue
      }
    }
    setSlicedSatList(tempList);
  }

  function setClass(satellite, index) {
    // Logique pour sélectionner un satellite et le mettre en surbrillance dans la scène 3D
    console.log('Satellite sélectionné :', satellite.OBJECT_NAME);
    if (document.getElementsByClassName("list-group-item")[index].classList.contains("active")) {
      document.getElementsByClassName("list-group-item")[index].classList.remove("active");
    } else {

    document.getElementsByClassName("list-group-item")[index].classList.add("active");
    }
    
  } 

 // let slicedSatList = SatList.slice(0, 999); // Affiche seulement les 10 premiers satellites

  let SatList = [];
  for (let i = 0; i < sat.length; i++) {
      SatList.push(sat[i]);
  }

 
  return (
    

    // On utilise THree JS pour afficher la Terre et les satellites en 3D
    <div className="container">
        <div className="btn-list-container" style={{ backgroundImage: "url('satlist/public/voielactee.jpg')", color: 'white' }}>
        <button
          className="btn"
          onClick={select1000Random}
        >
          Select 1000 Random
        </button>

        <List className="sat-list" satellites={sat} onSelectSatellite={handleSelectSatellite} />
        </div>
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 7], fov: 70 }} style={{ backgroundColor: "black" }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 3, 5]} intensity={2} />

          <Earth />
          <Satellites satellites={slicedSatList} />
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
