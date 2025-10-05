import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { useRef } from 'react';
import { Mesh } from 'three';
import { Points } from '@react-three/drei';
import * as THREE from 'three';

const Globe = () => {
  const globeRef = useRef<Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Create points for the network traffic visualization
  const count = 2000;
  const positions = new Float32Array(count * 3);
  const radius = 2;

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }

  useFrame(({ clock }) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group>
      <Sphere ref={globeRef} args={[2, 64, 64]}>
        <meshPhongMaterial
          color="#004488"
          emissive="#001133"
          specular="#002266"
          shininess={10}
          wireframe
          transparent
          opacity={0.8}
        />
      </Sphere>
      <Points
        ref={pointsRef}
        positions={positions}
        stride={3}
        frustumCulled={false}
      >
        <pointsMaterial
          size={0.02}
          color="#00ff88"
          sizeAttenuation
          transparent
          opacity={0.8}
        />
      </Points>
    </group>
  );
};

export default Globe;