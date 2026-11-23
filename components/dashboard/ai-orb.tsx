"use client";

import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type Pointer = { x: number; y: number };

function Scene({ pointer }: { pointer: React.RefObject<Pointer> }) {
  const group = useRef<THREE.Group>(null);
  const wire = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.MeshBasicMaterial>(null);
  const ringA = useRef<THREE.Group>(null);
  const ringB = useRef<THREE.Group>(null);
  const ringC = useRef<THREE.Group>(null);
  const satellites = useRef<THREE.Group>(null);
  const spin = useRef(0);

  useFrame(({ clock }, delta) => {
    spin.current += delta * 0.18;
    const look = pointer.current ?? { x: 0, y: 0 };
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        spin.current + look.x * 0.55,
        2.6,
        delta,
      );
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        look.y * 0.35,
        2.6,
        delta,
      );
    }
    if (wire.current) {
      wire.current.rotation.y -= delta * 0.25;
      wire.current.rotation.x += delta * 0.08;
    }
    if (halo.current) {
      halo.current.opacity = 0.07 + Math.sin(clock.elapsedTime * 1.5) * 0.03;
    }
    if (ringA.current) ringA.current.rotation.z += delta * 0.28;
    if (ringB.current) ringB.current.rotation.z -= delta * 0.18;
    if (ringC.current) ringC.current.rotation.z += delta * 0.12;

    const nodes = satellites.current?.children ?? [];
    const specs = [
      { radius: 1.62, speed: 0.7, lift: 0.16 },
      { radius: 1.95, speed: -0.46, lift: -0.1 },
      { radius: 2.24, speed: 0.34, lift: 0.22 },
    ];
    nodes.forEach((node, index) => {
      const spec = specs[index];
      if (!spec) return;
      const angle = clock.elapsedTime * spec.speed;
      node.position.set(
        Math.cos(angle) * spec.radius,
        Math.sin(angle * 2) * spec.lift,
        Math.sin(angle) * spec.radius,
      );
    });
  });

  return (
    <group ref={group}>
      <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.7}>
        <mesh>
          <sphereGeometry args={[0.68, 80, 80]} />
          <MeshDistortMaterial
            color="#5b21b6"
            emissive="#7c3aed"
            emissiveIntensity={1.15}
            roughness={0.18}
            metalness={0.28}
            distort={0.36}
            speed={1.7}
          />
        </mesh>
        <mesh ref={wire}>
          <icosahedronGeometry args={[1.02, 1]} />
          <meshBasicMaterial color="#e9d5ff" wireframe transparent opacity={0.38} toneMapped={false} />
        </mesh>
        <mesh>
          <sphereGeometry args={[1.16, 40, 40]} />
          <meshBasicMaterial
            ref={halo}
            color="#8b5cf6"
            transparent
            opacity={0.08}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>
      </Float>

      <group ref={ringA} rotation={[Math.PI / 2.35, 0.15, 0]}>
        <mesh>
          <torusGeometry args={[1.58, 0.012, 24, 180]} />
          <meshBasicMaterial color="#c084fc" transparent opacity={0.9} toneMapped={false} />
        </mesh>
      </group>
      <group ref={ringB} rotation={[1.05, 0.5, 0.35]}>
        <mesh>
          <torusGeometry args={[1.92, 0.008, 24, 180]} />
          <meshBasicMaterial color="#818cf8" transparent opacity={0.75} toneMapped={false} />
        </mesh>
      </group>
      <group ref={ringC} rotation={[0.72, 1.15, 0.2]}>
        <mesh>
          <torusGeometry args={[2.24, 0.006, 20, 160]} />
          <meshBasicMaterial color="#ddd6fe" transparent opacity={0.5} toneMapped={false} />
        </mesh>
      </group>

      <group ref={satellites}>
        <mesh>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color="#f5d0fe" toneMapped={false} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.032, 16, 16]} />
          <meshBasicMaterial color="#a5b4fc" toneMapped={false} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.026, 16, 16]} />
          <meshBasicMaterial color="#ffffff" toneMapped={false} />
        </mesh>
      </group>

      <Sparkles count={56} scale={[4.4, 2.8, 2.6]} size={2.4} speed={0.35} color="#e9d5ff" opacity={0.8} />
    </group>
  );
}

export function AiOrb() {
  const pointer = useRef<Pointer>({ x: 0, y: 0 });

  return (
    <div
      className="h-full w-full"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        pointer.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        pointer.current.y = -((event.clientY - rect.top) / rect.height - 0.5) * 2;
      }}
      onPointerLeave={() => {
        pointer.current.x = 0;
        pointer.current.y = 0;
      }}
    >
      <Canvas
        camera={{ position: [0, 0.15, 5.35], fov: 36 }}
        dpr={[1, 1.6]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.55} />
        <pointLight position={[2.6, 2.1, 2.4]} color="#d8b4fe" intensity={28} distance={14} />
        <pointLight position={[-2.4, -1.2, 1.8]} color="#6366f1" intensity={16} distance={14} />
        <pointLight position={[0, -2.2, 1.2]} color="#8b5cf6" intensity={10} distance={10} />
        <Scene pointer={pointer} />
      </Canvas>
    </div>
  );
}
