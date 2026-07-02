"use client";

import * as THREE from "three";
import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.MeshStandardMaterial>;
};

// 3 screen states corresponding to scroll sections
const SCREEN_COLORS = [
  new THREE.Color("#0d1b2a"), // Dark navy — default watch face
  new THREE.Color("#052e16"), // Dark green — activity/fitness
  new THREE.Color("#450a0a"), // Dark red — heart rate
];

interface AppleWatchProps extends React.ComponentProps<"group"> {
  scrollProgressRef: React.MutableRefObject<number>;
}

export function AppleWatch({ scrollProgressRef, ...props }: AppleWatchProps) {
  const { nodes, materials } = useGLTF(
    "/models/apple_watch_series_5.glb"
  ) as unknown as GLTFResult;

  // Create one material instance owned by this component
  const screenMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#000000"),
        emissive: SCREEN_COLORS[0].clone(),
        emissiveIntensity: 1.5,
        roughness: 0.1,
        metalness: 0.2,
      }),
    []
  );

  // Read scroll progress every frame and lerp emissive color smoothly
  useFrame(() => {
    const p = scrollProgressRef.current;
    const target =
      p < 0.33
        ? SCREEN_COLORS[0]
        : p < 0.66
        ? SCREEN_COLORS[1]
        : SCREEN_COLORS[2];
    screenMaterial.emissive.lerp(target, 0.05);
  });

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={45}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <mesh geometry={nodes.ToJTXgljlhhqitR.geometry} material={materials.LiBdTcnHkZvFfBu} />
          <mesh geometry={nodes.MKkqtRcjcYdQNza.geometry} material={materials.LiBdTcnHkZvFfBu} />
          <mesh geometry={nodes.fWLGcfnLpXnhehz.geometry} material={materials.GdUNwQJEkZeKMrn} />
          <mesh geometry={nodes.aEQvkfzeWvwzYAe.geometry} material={materials.JbkKnNDeFOFjmsi} />
          <mesh geometry={nodes.dwwWsLxRsdeWNuY.geometry} material={materials.JbkKnNDeFOFjmsi} />
          <mesh geometry={nodes.uzbwArIObdMRDiX.geometry} material={materials.JbkKnNDeFOFjmsi} />
          <mesh geometry={nodes.IKFNZjXnJPkRlsj.geometry} material={materials.JbkKnNDeFOFjmsi} />
          <mesh geometry={nodes.sEZkXDXAzFzaCpi.geometry} material={materials.JAXIvIljFWpqimH} />
          <mesh geometry={nodes.NIYNwKgmPYCkzpx.geometry} material={materials.RfziScXwNjFOjTf} />
          <mesh geometry={nodes.BrmhLaxyDmhbhXA.geometry} material={materials.KwQHVIjAaOBvYOl} />
          <mesh geometry={nodes.tqQTKXmBvXiXuUi.geometry} material={materials.iDKPrezlRKAMsXJ} />
          <mesh geometry={nodes.yTjoxDvwbAPZygY.geometry} material={materials.QGhrBgCXrJDNcrC} />
          <mesh geometry={nodes.yHafeexXAiPytbW.geometry} material={materials.FqtwwTANGDActcI} />
          <mesh geometry={nodes.KeqqEyvZchDDdlP.geometry} material={materials.AjFlTFrWzhywymA} />
          {/* Screen meshes — driven by scrollProgressRef */}
          <mesh geometry={nodes.skbFGMQxPawHdOT.geometry} material={screenMaterial} />
          <mesh geometry={nodes.ErOVeLWOcyHrdoT.geometry} material={screenMaterial} />
          <mesh geometry={nodes.ajDgJcjsZTQAtOL.geometry} material={materials.rcZoXGfqfnZjYLv} />
          <mesh geometry={nodes.wflxnmxxYXvnLxp.geometry} material={materials.YRNmAgRITIuwDMU} />
          <mesh geometry={nodes.ePnvfhsUgYTHLdP.geometry} material={materials.iVwMRUBqdpoOFmg} />
          <mesh geometry={nodes.aynleugQGbyNYsa.geometry} material={materials.kFNgmsjtRAxVPtH} />
          <mesh geometry={nodes.HyRzdvVQMwELnwT.geometry} material={materials.upTfEpgNFxflqtf} />
          <mesh geometry={nodes.bvsBShDTmaTjbXM.geometry} material={materials.YpOtGMmrQbktABJ} />
          <mesh geometry={nodes.lnDzpNAJfMDjFms.geometry} material={materials.qxhxiJVpuwSrYLW} />
          <mesh geometry={nodes.lrTNGAQkeHccJph.geometry} material={materials.ycVxkCIsnetKUsw} />
          <mesh geometry={nodes.jChLaKiiqDISJhc.geometry} material={materials.sSZvqgMuWCuMkAr} />
          <mesh geometry={nodes.DzgfJtxUfpgExsF.geometry} material={materials.mUXcyUQCxEEJdiO} />
          <mesh geometry={nodes.MBrZKZXWsvHIcZQ.geometry} material={materials.JBuGosClPcYrSry} />
          <mesh geometry={nodes.acJwQeGdNxQWEyd.geometry} material={materials.OEDmdMOTgdNMXOP} />
          <mesh geometry={nodes.mcMtSAOyQxOEEfl.geometry} material={materials.sJrbBWzziZrNyXB} />
          <mesh geometry={nodes.qbgXzfcPGFYiUnN.geometry} material={materials.FBAtOQrXrgOoPNd} />
          <mesh geometry={nodes.dXSXlyOaLTQHAnn.geometry} material={materials.gMZhwegVXLXWOLd} />
          <mesh geometry={nodes.QpBpNnkHikCzRXn.geometry} material={materials.JUrNntQLbxHnFtO} />
          <mesh geometry={nodes.JcqbcJEVwcScYbo.geometry} material={materials.JUrNntQLbxHnFtO} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/apple_watch_series_5.glb");
