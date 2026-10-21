
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { json2satrec, propagate } from 'satellite.js';

function Satellites({ satellites }) {
  const SCALE = 1 / 6371;
  const meshRef = useRef();

  useEffect(() => {
    if (!meshRef.current) return;

    const dummy = new THREE.Object3D();



    for (let i = 0; i < satellites.length; i++) {
      try {
        const satrec = json2satrec(satellites[i]); 
        const date = new Date();
        const state = propagate(satrec, date);
    
        console.log('Satellite state:', state);
        let {x, y, z} = state.position;
      
        dummy.position.set(x * SCALE, y * SCALE, z * SCALE);

        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      } catch (error) {
        console.error(`Error occurred while processing satellite ${satellites[i].name}:`, error);
      }

    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [satellites]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, satellites.length]}
    >
      <sphereGeometry args={[0.01, 16, 16]} />
      <meshBasicMaterial color="white" />
    </instancedMesh>
  );
}

export default Satellites;
