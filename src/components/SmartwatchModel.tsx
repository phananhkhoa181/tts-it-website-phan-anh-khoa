"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, PresentationControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// A temporary stylish 3D object to act as the smartwatch
function WatchModel() {
  const group = useRef<THREE.Group>(null);
  const targetRotationY = useRef(0);

  // Sync scroll with target rotation
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress (0 to 1 approx)
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
      const progress = scrollY / maxScroll;
      
      // We want the watch to rotate up to Math.PI * 2 based on scroll
      targetRotationY.current = progress * Math.PI * 2;
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state, delta) => {
    if (group.current) {
      // Smoothly interpolate current rotation to target rotation
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        targetRotationY.current || 0,
        4, // lambda for smoothness
        delta
      );
      
      // Add a slight idle rotation/floating feel
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Watch Body (Main Case) */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[1.5, 1.5, 0.4, 64]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Screen Bezel */}
        <mesh position={[0, 0.21, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.35, 1.5, 64]} />
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Screen Display */}
        <mesh position={[0, 0.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.35, 64]} />
          {/* A glowing cyan material for the screen */}
          <meshStandardMaterial color="#000000" emissive="#06b6d4" emissiveIntensity={0.5} roughness={0.1} />
        </mesh>
        
        {/* Top Strap */}
        <mesh position={[0, 0, -2]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.2, 2]} />
          <meshStandardMaterial color="#1e293b" metalness={0.1} roughness={0.8} />
        </mesh>

        {/* Bottom Strap */}
        <mesh position={[0, 0, 2]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.2, 2]} />
          <meshStandardMaterial color="#1e293b" metalness={0.1} roughness={0.8} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Smartwatch3D() {
  return (
    <div className="w-full h-[600px] relative" style={{ touchAction: 'none' }}>
      <Canvas shadows camera={{ position: [0, 2, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <PresentationControls
          global
          rotation={[0, 0.3, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <WatchModel />
        </PresentationControls>
        
        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
