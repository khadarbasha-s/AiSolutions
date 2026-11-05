import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles, Icosahedron, Torus } from "@react-three/drei";
import type { Group, Mesh } from "three";

function Core() {
  const group = useRef<Group>(null);
  const wire = useRef<Mesh>(null);
  const ringA = useRef<Mesh>(null);
  const ringB = useRef<Mesh>(null);

  useFrame((state, delta) => {
    const { pointer } = state;
    if (group.current) {
      group.current.rotation.y += (pointer.x * 0.6 - group.current.rotation.y) * 0.04;
      group.current.rotation.x += (-pointer.y * 0.4 - group.current.rotation.x) * 0.04;
    }
    if (wire.current) {
      wire.current.rotation.y -= delta * 0.15;
      wire.current.rotation.z += delta * 0.05;
    }
    if (ringA.current) ringA.current.rotation.z += delta * 0.35;
    if (ringB.current) ringB.current.rotation.z -= delta * 0.22;
  });

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.6} floatIntensity={1.2}>
        <Icosahedron args={[1.25, 24]}>
          <MeshDistortMaterial color="#6D28D9" emissive="#3B0D99" emissiveIntensity={0.6} roughness={0.15} metalness={0.6} distort={0.38} speed={2.2} />
        </Icosahedron>
        <Icosahedron ref={wire} args={[1.75, 1]}>
          <meshBasicMaterial color="#22D3EE" wireframe transparent opacity={0.28} />
        </Icosahedron>
      </Float>
      <Torus ref={ringA} args={[2.45, 0.012, 16, 160]} rotation={[Math.PI / 2.4, 0.2, 0]}>
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.7} />
      </Torus>
      <Torus ref={ringB} args={[2.9, 0.008, 16, 160]} rotation={[Math.PI / 1.8, -0.4, 0]}>
        <meshBasicMaterial color="#22D3EE" transparent opacity={0.5} />
      </Torus>
      <Sparkles count={90} scale={7} size={2.4} speed={0.45} color="#A78BFA" />
      <Sparkles count={50} scale={5} size={1.6} speed={0.3} color="#67E8F9" />
    </group>
  );
}

/** Interactive 3D AI core: distorting orb, wireframe shell, orbit rings and sparkles. Follows the pointer. */
export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6.2], fov: 45 }} dpr={[1, 1.8]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 3, 4]} intensity={60} color="#22D3EE" />
      <pointLight position={[-4, -2, 3]} intensity={50} color="#8B5CF6" />
      <directionalLight position={[0, 5, 5]} intensity={0.8} />
      <Core />
    </Canvas>
  );
}
