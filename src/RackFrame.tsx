import { Coords, RackFrameProps as RackFrameProps } from "./shared/types";
import { boxSizeX, boxSizeY, boxSizeZ, frameSideWidth } from "./shared/constants";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export const RackFrame = ({ coords, boxNumberX, boxNumberY, type }: RackFrameProps) => {
  const texture = useLoader(TextureLoader, 'metal-tread-1.png');

  let frameSizeX: number | undefined;
  let frameSizeY: number | undefined;
  let frameSizeZ: number | undefined;

  let frameX: number | undefined;
  let frameY: number | undefined;
  let frameZ: number | undefined;

  switch(type) {
    case 'horizontal':
      frameSizeX = boxNumberX * boxSizeX;
      frameSizeY = frameSideWidth;
      frameSizeZ = frameSideWidth;
      frameX = coords[0];
      frameY = coords[1];
      frameZ = coords[2];
      break;
    case 'vertical':
      frameSizeX = frameSideWidth;
      frameSizeY = boxNumberY * boxSizeY;
      frameSizeZ = frameSideWidth;
      frameX = coords[0];
      frameY = coords[1] + frameSizeY / 2;
      frameZ = coords[2];
      break;
    case 'transversal':
      frameSizeX = frameSideWidth;
      frameSizeY = frameSideWidth;
      frameSizeZ = boxSizeZ;
      frameX = coords[0];
      frameY = coords[1];
      frameZ = coords[2] + boxSizeZ / 2;
      break;
  }

  const position: Coords = [frameX, frameY, frameZ];

  return (
    <mesh position={position} receiveShadow>
      <boxGeometry args={[frameSizeX, frameSizeY, frameSizeZ]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};
