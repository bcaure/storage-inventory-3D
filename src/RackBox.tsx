import { Geometry, Base, Subtraction } from "@react-three/csg";
import { useTexture } from "@react-three/drei";
import { RackBoxProps } from "./shared/types";
import { boxSizeX, boxSizeY, boxSizeZ } from "./shared/constants";

export const RackBox = ({ coords }: RackBoxProps) => {
  const texture = useTexture('metal-tread-1.png');

  const boxSideWidth = 0.2;

  const boxSideWidthX = boxSizeX - boxSideWidth;
  const boxSideWidthY = boxSizeY - boxSideWidth;
  const boxSideWidthZ = boxSizeZ - boxSideWidth;

  const substrWidth = 2;

  const boxSubstrX = boxSizeX + substrWidth;
  const boxSubstrY = boxSizeY + substrWidth;
  const boxSubstrZ = boxSizeZ + substrWidth;

  return (
    <mesh position={coords} receiveShadow>
      <Geometry>
        <Base>
          <boxGeometry args={[boxSizeX, boxSizeY, boxSizeZ]} />
        </Base>
        <Subtraction position={[1, 0, 0]}>
          <boxGeometry args={[boxSubstrX, boxSideWidthY, boxSideWidthZ]} />
        </Subtraction>
        <Subtraction position={[0, 1, 0]}>
          <boxGeometry args={[boxSideWidthX, boxSubstrY, boxSideWidthZ]} />
        </Subtraction>
        <Subtraction position={[0, 0, 1]}>
          <boxGeometry args={[boxSideWidthX, boxSideWidthY, boxSubstrZ]} />
        </Subtraction>
      </Geometry>
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};
