"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";

function Model() {
  // Placeholder for a box
  return (
    <mesh rotation={[0.4, 0.2, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function ThreeDModel() {
  return (
    <Canvas style={{ width: "100%", height: "400px" }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Model />
      <OrbitControls />
      <Environment preset="sunset" background={false} />
    </Canvas>
  );
}
