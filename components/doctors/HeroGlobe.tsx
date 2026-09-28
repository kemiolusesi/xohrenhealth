"use client";

import { Canvas, type ThreeElements, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

type MousePosition = { x: number; y: number };
type NodeData = { id: number; x: number; y: number; z: number; size: number; speed: number; phase: number; interval: number };

function isLandMass(latitude: number, longitude: number) {
  const africa = latitude >= -35 && latitude <= 37 && longitude >= -18 && longitude <= 52;
  const europe = latitude >= 36 && latitude <= 71 && longitude >= -10 && longitude <= 40;
  const asia = latitude >= 0 && latitude <= 75 && longitude >= 40 && longitude <= 145;
  const northAmerica = latitude >= 15 && latitude <= 72 && longitude >= -168 && longitude <= -52;
  const southAmerica = latitude >= -56 && latitude <= 12 && longitude >= -82 && longitude <= -34;
  const australia = latitude >= -44 && latitude <= -10 && longitude >= 112 && longitude <= 154;
  if (!(africa || europe || asia || northAmerica || southAmerica || australia)) return false;
  return Math.sin(latitude * 1.93 + longitude * 2.71) > -0.28;
}

function Globe({ mouse }: { mouse: MousePosition }) {
  const group = useRef<THREE.Group>(null);
  const dots = useMemo(() => {
    const positions: number[] = [];
    const radius = 2.6;
    for (let latitude = -90; latitude <= 90; latitude += 2.2) {
      for (let longitude = -180; longitude <= 180; longitude += 2.2) {
        if (!isLandMass(latitude, longitude)) continue;
        const phi = (90 - latitude) * Math.PI / 180;
        const theta = (longitude + 180) * Math.PI / 180;
        positions.push(radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta));
      }
    }
    return new Float32Array(positions);
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.08;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, mouse.y * 0.3, 0.05);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -mouse.x * 0.1, 0.05);
  });

  return <group ref={group} position={[0, -1.2, 0]}>
    <mesh><sphereGeometry args={[2.6, 64, 64]} /><meshPhongMaterial color="#020d1f" emissive="#0a1a3a" emissiveIntensity={0.4} transparent opacity={0.95} /></mesh>
    <mesh><sphereGeometry args={[2.61, 24, 24]} /><meshBasicMaterial color="#0a3060" wireframe transparent opacity={0.16} /></mesh>
    <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[dots, 3]} /></bufferGeometry><pointsMaterial color="#4ab8e8" size={0.022} transparent opacity={0.74} sizeAttenuation /></points>
    <mesh><sphereGeometry args={[2.9, 64, 64]} /><meshPhongMaterial color="#0066cc" emissive="#0044aa" emissiveIntensity={0.3} transparent opacity={0.1} side={THREE.BackSide} /></mesh>
    <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[2.65, 0.02, 8, 120]} /><meshBasicMaterial color="#00aaff" transparent opacity={0.45} /></mesh>
  </group>;
}

function ShootingNode({ node }: { node: NodeData }) {
  const mesh = useRef<THREE.Mesh>(null);
  const shooting = useRef(false);
  const progress = useRef(0);
  const timer = useRef((node.id % 8) * 0.65 + node.interval * 0.35);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    const material = mesh.current.material as THREE.MeshBasicMaterial;
    timer.current -= delta;
    if (timer.current <= 0 && !shooting.current) { shooting.current = true; progress.current = 0; timer.current = node.interval; }
    if (shooting.current) {
      progress.current += delta * 0.6;
      const amount = Math.min(progress.current, 1);
      mesh.current.position.set(node.x, node.y + amount * 0.5, node.z + amount * 5);
      mesh.current.scale.setScalar(1 + amount * 3);
      material.opacity = 1 - amount;
      if (amount >= 1) { shooting.current = false; mesh.current.scale.setScalar(1); material.opacity = 1; mesh.current.position.set(node.x, node.y, node.z); }
      return;
    }
    mesh.current.position.set(node.x + Math.sin(state.clock.elapsedTime * node.speed + node.phase) * 0.15, node.y + Math.cos(state.clock.elapsedTime * node.speed * 0.7 + node.phase) * 0.1, node.z + Math.sin(state.clock.elapsedTime * node.speed * 0.5 + node.phase) * 0.12);
  });

  return <mesh ref={mesh} position={[node.x, node.y, node.z]}><sphereGeometry args={[node.size, 8, 8]} /><meshBasicMaterial color="#ffffff" transparent opacity={1} /></mesh>;
}

function Constellations({ mouse }: { mouse: MousePosition }) {
  const group = useRef<THREE.Group>(null);
  const nodes = useMemo<NodeData[]>(() => Array.from({ length: 28 }, (_, id) => {
    const theta = id / 28 * Math.PI * 2;
    const radius = 3.2 + (id * 1.13 % 2.8);
    return { id, x: Math.cos(theta) * radius * (0.8 + (id % 4) * 0.13), y: 0.5 + (id * 0.41 % 3.5), z: Math.sin(theta) * radius * (0.82 + (id % 5) * 0.1), size: 0.04 + (id % 4) * 0.015, speed: 0.3 + (id % 5) * 0.08, phase: id * 0.73, interval: 3 + (id % 6) * 0.8 };
  }), []);
  const lines = useMemo(() => {
    const points: number[] = [];
    nodes.forEach((node, index) => nodes.slice(index + 1).forEach((other) => {
      const distance = Math.hypot(node.x - other.x, node.y - other.y, node.z - other.z);
      if (distance < 3.5) points.push(node.x, node.y, node.z, other.x, other.y, other.z);
    }));
    return new Float32Array(points);
  }, [nodes]);

  useFrame((state) => {
    if (!group.current) return;
    const time = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(time * 0.05) * 0.2 + mouse.x * 0.15;
    group.current.rotation.x = Math.sin(time * 0.04) * 0.1 - mouse.y * 0.1;
  });

  return <group ref={group} position={[0, 0.8, 0]}><lineSegments><bufferGeometry><bufferAttribute attach="attributes-position" args={[lines, 3]} /></bufferGeometry><lineBasicMaterial color="#2288cc" transparent opacity={0.35} /></lineSegments>{nodes.map((node) => <ShootingNode key={node.id} node={node} />)}</group>;
}

function Lights() {
  return <><ambientLight intensity={0.1} /><pointLight position={[8, 8, 8]} intensity={2} color="#0066ff" /><pointLight position={[-6, 4, -4]} intensity={1.2} color="#0044aa" /><pointLight position={[0, -4, 6]} intensity={0.8} color="#002288" /><pointLight position={[3, 2, 5]} intensity={1.5} color="#44aaff" /></>;
}

export default function HeroGlobe() {
  const [mouse, setMouse] = useState<MousePosition>({ x: 0, y: 0 });
  useEffect(() => {
    const update = (event: MouseEvent) => setMouse({ x: (event.clientX / window.innerWidth - 0.5) * 2, y: -(event.clientY / window.innerHeight - 0.5) * 2 });
    window.addEventListener("mousemove", update);
    return () => window.removeEventListener("mousemove", update);
  }, []);
  return <div className="absolute inset-0 h-full w-full bg-[radial-gradient(ellipse_80%_70%_at_50%_80%,#0a2050_0%,#040d1f_50%,#010408_100%)]"><Canvas camera={{ position: [0, 2, 9], fov: 50 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }} className="h-full w-full"><Lights /><Globe mouse={mouse} /><Constellations mouse={mouse} /></Canvas></div>;
}
