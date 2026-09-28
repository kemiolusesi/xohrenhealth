"use client";

import { Line, PointMaterial, Points } from "@react-three/drei";
import { Canvas, type ThreeElements, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

type Constellation = { x: number; y: number; z: number; link: [number, number, number] };

function sphericalPoints(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  for (let index = 0; index < count; index += 1) {
    const y = 1 - (index / (count - 1)) * 2;
    const ring = Math.sqrt(1 - y * y);
    const theta = index * Math.PI * (3 - Math.sqrt(5));
    positions[index * 3] = Math.cos(theta) * ring * radius;
    positions[index * 3 + 1] = y * radius;
    positions[index * 3 + 2] = Math.sin(theta) * ring * radius;
  }
  return positions;
}

function UpperConstellations() {
  const nodes = useMemo<Constellation[]>(() => Array.from({ length: 96 }, (_, index) => {
    const angle = index * 1.73;
    const radius = 3.2 + (index % 7) * 0.38;
    const y = 1.2 + (index % 14) * 0.32;
    const x = Math.cos(angle) * radius;
    const z = -5 + (index % 10) * 0.48;
    return { x, y, z, link: [Math.cos(angle + 0.5) * radius * 0.72, y - 0.22, z - 0.32] };
  }), []);
  const groups = useRef<(THREE.Group | null)[]>([]);
  const dots = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(() => {
    groups.current.forEach((group, index) => {
      const dot = dots.current[index];
      if (!group || !dot) return;
      group.position.z += 0.02;
      if (group.position.z > 2) group.position.z = -5;
      const progress = THREE.MathUtils.clamp((group.position.z + 5) / 7, 0, 1);
      const material = dot.material as THREE.MeshBasicMaterial;
      material.opacity = Math.pow(1 - progress, 1.8) * 0.85;
      const scale = 0.7 + progress * 2.4;
      dot.scale.setScalar(scale);
    });
  });

  return <group>{nodes.map((node, index) => <group key={index} ref={(value) => { groups.current[index] = value; }} position={[node.x, node.y, node.z]}>
    <Line points={[[0, 0, 0], [node.link[0] - node.x, node.link[1] - node.y, node.link[2] - node.z]]} color={index % 5 === 0 ? "#C9A84C" : "#00f3ff"} transparent opacity={0.3} lineWidth={0.5} />
    <mesh ref={(value) => { dots.current[index] = value; }}><sphereGeometry args={[0.025, 8, 8]} /><meshBasicMaterial color={index % 5 === 0 ? "#C9A84C" : "#00f3ff"} transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} /></mesh>
  </group>)}</group>;
}

function LivingGlobe() {
  const globe = useRef<THREE.Group>(null);
  const rotationVelocity = useRef(0.002);
  const [isHovered, setIsHovered] = useState(false);
  const continentPoints = useMemo(() => sphericalPoints(4000, 1.62), []);
  const nodePoints = useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(1.84, 3);
    return new Float32Array(geometry.getAttribute("position").array);
  }, []);

  useFrame((state) => {
    if (!globe.current) return;
    const targetSpeed = isHovered ? 0.015 : 0.002;
    rotationVelocity.current = THREE.MathUtils.lerp(rotationVelocity.current, targetSpeed, 0.06);
    globe.current.rotation.y += rotationVelocity.current;
    globe.current.rotation.x = THREE.MathUtils.lerp(globe.current.rotation.x, -state.pointer.y * 0.25, 0.045);
    globe.current.rotation.z = THREE.MathUtils.lerp(globe.current.rotation.z, state.pointer.x * 0.14, 0.045);
  });

  return <group ref={globe} position={[0, -12.8, -1.15]} scale={8} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
    <mesh onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
      <sphereGeometry args={[1.38, 64, 64]} />
      <meshStandardMaterial color="#061322" emissive="#0d75aa" emissiveIntensity={0.32} transparent opacity={0.82} roughness={0.35} metalness={0.75} />
    </mesh>
    <Points positions={continentPoints} stride={3} frustumCulled={false}>
      <PointMaterial color="#00f3ff" size={0.015} sizeAttenuation transparent opacity={0.66} blending={THREE.AdditiveBlending} depthWrite={false} />
    </Points>
    <mesh>
      <icosahedronGeometry args={[1.84, 3]} />
      <meshBasicMaterial color="#4A9EDB" wireframe transparent opacity={0.32} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
    <Points positions={nodePoints} stride={3} frustumCulled={false}>
      <PointMaterial color="#d7fbff" size={0.046} sizeAttenuation transparent opacity={0.98} blending={THREE.AdditiveBlending} depthWrite={false} />
    </Points>
  </group>;
}

function Scene() {
  const sky = useMemo(() => {
    const values = new Float32Array(480 * 3);
    for (let index = 0; index < 480; index += 1) {
      values[index * 3] = ((index * 37) % 100) / 100 * 17 - 8.5;
      values[index * 3 + 1] = ((index * 61) % 100) / 100 * 5.5 - 0.3;
      values[index * 3 + 2] = -2.8 + ((index * 23) % 100) / 100 * 3.2;
    }
    return values;
  }, []);
  return <>
    <ambientLight intensity={0.4} />
    <pointLight position={[-3, 2, 3]} color="#00f3ff" intensity={8} distance={8} />
    <pointLight position={[2, 1, 2]} color="#4A9EDB" intensity={4} distance={7} />
    <Points positions={sky} stride={3} frustumCulled={false}><PointMaterial color="#8eeaff" size={0.023} sizeAttenuation transparent opacity={0.52} blending={THREE.AdditiveBlending} depthWrite={false} /></Points>
    <LivingGlobe />
    <UpperConstellations />
  </>;
}

export default function HeroScene() {
  return <Canvas className="absolute inset-0 h-full w-full" camera={{ position: [0, 0, 8.2], fov: 43 }} dpr={[1, 1.75]} gl={{ alpha: true, antialias: true }}>
    <color attach="background" args={["#030712"]} />
    <fog attach="fog" args={["#030712", 3.8, 9]} />
    <Scene />
  </Canvas>;
}
