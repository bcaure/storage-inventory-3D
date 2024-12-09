import { Geometry, Base, Addition } from "@react-three/csg";
import { useTexture, Text } from "@react-three/drei";
import { AssetItemProps } from "./types";
import { assetSizeHeight, assetSizeDiam } from "./constants";
import { Mesh } from "three";
import { useRef } from "react";

export const AssetItem = (props: AssetItemProps) => {
  const { coords, name, state, onClick } = props;
  const textureRubber = useTexture('rubber.png');
  const textureMetal = useTexture('metal-smooth.png');

  const assetFront = useRef<Mesh>(null);

  const flancWidth = assetSizeHeight / 10;

  const displayName = () => {
    onClick(props);
  };

  return (
    <group onClick={displayName}>
      <mesh ref={assetFront} position={coords} rotation={[Math.PI / 2, 0, 0]}>
        <Geometry>
          <Base position={[0, (assetSizeHeight / 2), 0]}>
            <cylinderGeometry args={[assetSizeDiam, assetSizeDiam, flancWidth]} />
          </Base>
          <Addition position={[0, -(assetSizeHeight / 2), 0]}>
            <cylinderGeometry args={[assetSizeDiam, assetSizeDiam, flancWidth]} />
          </Addition>
        </Geometry>
        
        <meshBasicMaterial
          map={textureMetal}
          color={state === 'error' ? 'red' : state === 'warning' ? 'orange' : undefined }
        />
      </mesh>
      <mesh position={coords} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[assetSizeDiam / 1.5, assetSizeDiam / 1.5, assetSizeHeight]} />
        <meshBasicMaterial map={textureRubber} />
      </mesh>
      <Text
        position={[coords[0], coords[1], coords[2] + (assetSizeHeight / 2) + 0.2]} // Adjust position as needed
        color="black"
        fontSize={0.5}
      >
        {name}
      </Text>
    </group>
  );
  };
