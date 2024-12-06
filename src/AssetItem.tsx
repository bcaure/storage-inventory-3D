import { Geometry, Base, Addition } from "@react-three/csg";
import { useTexture } from "@react-three/drei";
import { AssetItemProps } from "./types";
import { assetSizeHeight, assetSizeDiam } from "./constants";

export const AssetItem = ({ coords }: AssetItemProps) => {
  const textureRubber = useTexture('rubber.png');
  const textureMetal = useTexture('metal-smooth.png');

  const flancWidth = assetSizeHeight / 10;  

  return (
    <>
      <mesh position={coords} rotation={[Math.PI / 2, 0, 0]}>
        <Geometry>
          <Base position={[0, (assetSizeHeight / 2) , 0]}>
            <cylinderGeometry args={[assetSizeDiam, assetSizeDiam, flancWidth]} />
          </Base>
          <Addition position={[0, -(assetSizeHeight / 2) , 0]}>
            <cylinderGeometry args={[assetSizeDiam, assetSizeDiam, flancWidth]} />
          </Addition>
        </Geometry>
        <meshBasicMaterial map={textureMetal} />
      </mesh>
      <mesh position={coords} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[assetSizeDiam / 1.5, assetSizeDiam / 1.5, assetSizeHeight]} />
        <meshBasicMaterial map={textureRubber} />
      </mesh>
    </>

  );
};
