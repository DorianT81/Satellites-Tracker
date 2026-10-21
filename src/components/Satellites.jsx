
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { json2satrec, propagate } from 'satellite.js';

function Satellites({ satellites }) {
  const SCALE = 1 / 6371; // Rayon de la terre, facteur 2 pour éloigner les satellites dans la planète
  const meshRef = useRef();

  useEffect(() => {
  if (!meshRef.current) return;

  console.log('Nombre de satellites reçus :', satellites.length);

  const dummy = new THREE.Object3D();
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < satellites.length; i++) {
    const satellite = satellites[i];

    try {
      const satrec = json2satrec(satellite);
      const state = propagate(satrec, new Date());

      if (!state || !state.position) {
        console.error(
          'Propagation échouée :',
          satellite.OBJECT_NAME,
          state,
          satrec.error
        );
        errorCount++;
        continue;
      }

      const { x, y, z } = state.position;

      if (![x, y, z].every(Number.isFinite)) {
        console.error(
          'Coordonnées invalides :',
          satellite.OBJECT_NAME,
          state.position
        );
        errorCount++;
        continue;
      }

      dummy.position.set(x * SCALE, y * SCALE, z * SCALE);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      successCount++;
    } catch (error) {
      console.error(
        'Erreur satellite :',
        satellite.OBJECT_NAME,
        error
      );
      errorCount++;
    }
  }

  meshRef.current.instanceMatrix.needsUpdate = true;

  console.log('Satellites traités avec succès :', successCount);
  console.log('Satellites en erreur :', errorCount);
}, [satellites]);
  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, satellites.length]}
    >
      <sphereGeometry args={[0.02, 16, 16]} />
      <meshBasicMaterial color="white" />
    </instancedMesh>
  );
}

export default Satellites;
