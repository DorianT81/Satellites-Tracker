
import { useTexture } from '@react-three/drei';
import { json2satrec, propagate } from 'satellite.js';

function Earth() {
  const texture = useTexture(
    'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg'
  );

  return (
    <mesh>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export default Earth;
