
import { useTexture } from '@react-three/drei';
tasdadzadaz

function Earth() {
  const texture = useTexture(
    'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg'
  );

  return (
    <mesh>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export default Earth;
