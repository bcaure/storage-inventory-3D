import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { AnimatedCameraProps } from "./shared/types";
import { PerspectiveCamera as PerspectiveCameraType, Vector3 } from "three";
import { PerspectiveCamera } from "@react-three/drei";

export const AnimatedCamera = ({ position, target }: AnimatedCameraProps) => {
  const cameraRef = useRef<PerspectiveCameraType>(null);
  const vector = new Vector3();

  const [firstRender, setFirstRender] = useState(true);

  // Keep camera looking at the target
  useFrame(() => {
    if (cameraRef.current && position && target) {
      //cameraRef.current?.lookAt(new Vector3(target[0], target[1], target[2]));
      if (firstRender) {
        cameraRef.current?.position.set(position[0], position[1], position[2]);
        setFirstRender(false);
      } else {
        // cameraRef.current?.position.set(position[0], position[1], position[2]);
        cameraRef.current?.position.lerp(vector.set(...position), 0.1);
      }
    }
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={80} // Field of view
      near={0.1} // Near clipping plane
      far={1000} // Far clipping plane
      zoom={1}
    />
  );
}
