"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PresentationControls } from "@react-three/drei";
import * as THREE from "three";
import { AppleWatch } from "./AppleWatch";

function WatchWrapper() {
  const group = useRef<THREE.Group>(null);
  const targetRotationY = useRef(0);
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = Math.max(
        1,
        document.body.scrollHeight - window.innerHeight
      );
      const progress = window.scrollY / maxScroll;
      targetRotationY.current = progress * Math.PI * 2;
      scrollProgressRef.current = progress;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        targetRotationY.current,
        4,
        delta
      );
      group.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
      group.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
        <AppleWatch
          position={[0, 0, 0]}
          scrollProgressRef={scrollProgressRef}
        />
      </Float>
    </group>
  );
}

export default function Smartwatch3D() {
  return (
    <div
      className="w-full h-[600px] relative"
      style={{ touchAction: "none" }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{
          antialias: true,
          powerPreference: "default",
          failIfMajorPerformanceCaveat: false,
        }}
        dpr={[1, 1.5]}
      >
        {/* Simple lighting — no shadows, no heavy environment maps */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight
          position={[-3, -3, -3]}
          intensity={0.3}
          color="#a5b4fc"
        />

        <React.Suspense fallback={null}>
          <PresentationControls
            global
            rotation={[0, 0.2, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 2, Math.PI / 2]}
          >
            <WatchWrapper />
          </PresentationControls>
        </React.Suspense>
      </Canvas>
    </div>
  );
}
