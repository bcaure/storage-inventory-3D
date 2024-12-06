import { useFrame } from "@react-three/fiber";
import { useRef, Ref } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import * as three from 'three';
import { Coords } from "./types";

export const AnimatedCamera = ({ initPosition, position }: { initPosition: Coords, position: Coords }) => {
  const cameraRef = useRef<three.PerspectiveCamera>();
  const vector = new three.Vector3();

  // Keep camera looking at the origin
  useFrame(() => {
    if (cameraRef.current) {
      const camera = (cameraRef.current as three.PerspectiveCamera);
      camera.position.lerp(vector.set(...position), 0.01);
    }
  });

  return (
    <PerspectiveCamera
      ref={cameraRef as unknown as Ref<three.PerspectiveCamera>}
      makeDefault // This sets the camera as the default camera for the scene
      fov={20} // Field of view
      near={0.1} // Near clipping plane
      far={1000} // Far clipping plane
      position={initPosition}
    />
  );
}
