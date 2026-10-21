
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { json2satrec, propagate } from 'satellite.js';

function Satellites({ satellites }) {
  const meshRef = useRef();

  useEffect(() => {
    if (!meshRef.current) return;

    const dummy = new THREE.Object3D();

    for (let i = 0; i < satellites.length; i++) {
      // Disposer les satellites en cercle pour le test
      const theta = (i / satellites.length) * 2 * Math.PI;
      const phi = (i / satellites.length) * Math.PI;
      const radius = satellites[i].radius || 5; // Utiliser la propriété radius du satellite ou une valeur par défaut

      dummy.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [satellites]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, satellites.length]}
    >
      <sphereGeometry args={[0.01, 16, 16]} />
      <meshBasicMaterial color="lime" />
    </instancedMesh>
  );
}

export default Satellites;
