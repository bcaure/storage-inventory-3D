import { Geometry, Base, Addition } from "@react-three/csg";
import { useTexture, Text } from "@react-three/drei";
import { AssetItemProps, Coords } from "./shared/types";
import { assetSizeHeight, assetSizeDiam } from "./shared/constants";
import { Mesh } from "three";
import { useRef } from "react";

export const AssetItem = (props: AssetItemProps) => {
  const { coords, name, state, onClick } = props;
  const textureRubber = useTexture('rubber.png');
  const textureMetal = useTexture('metal-smooth.png');

  const assetFront = useRef<Mesh>(null);

  const flancWidth = 0.05;

  const displayName = () => {
    onClick(props);
  };

  let color: string | undefined = "gray";
  let transparency: boolean | undefined = false;
  let opacity: number | undefined = 1;

  const frontCoords: Coords = [coords[0], coords[1], assetSizeHeight + 0.2];

  const reactAreaLight = <pointLight position={frontCoords} intensity={1000} color="#fff" castShadow />;
  let light = <></>;
  const errorText = <Text position={frontCoords} color="white" fontSize={0.5}>{name}</Text>;
  let text = <></>;

  switch(state) {
    case 'error':
      color = 'red';
      light = reactAreaLight;
      text = errorText;
      break;
    case 'transparent-error':
      color = 'red';
      transparency = true;
      opacity = 0.6;
      light = reactAreaLight;
      text = errorText;
      break;
    case 'warning':
      color = 'orange';
      light = reactAreaLight;
      text = errorText;
      break;
    case 'transparent-warning':
      color = 'orange';
      transparency = true;
      opacity = 0.6;
      light = reactAreaLight;
      text = errorText;
      break;
    case 'transparent-correct':
      transparency = true;
      opacity = 0.6;
      break;
  }

  return (
    <group onClick={displayName} receiveShadow>
      <mesh ref={assetFront} position={coords} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <Geometry>
          <Base position={[0, (assetSizeHeight / 2), 0]} receiveShadow>
            <cylinderGeometry args={[assetSizeDiam, assetSizeDiam, flancWidth]} />
          </Base>
          <Addition position={[0, -(assetSizeHeight / 2), 0]} receiveShadow>
            <cylinderGeometry args={[assetSizeDiam, assetSizeDiam, flancWidth]} />
          </Addition>
        </Geometry>
        
        <meshBasicMaterial
          map={textureMetal}
          color={color}
          transparent={transparency}
          opacity={opacity}
        />
      </mesh>
      <mesh position={coords} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <cylinderGeometry args={[assetSizeDiam / 1.5, assetSizeDiam / 1.5, assetSizeHeight]} />
        <meshBasicMaterial
          map={textureRubber}
          color={color}
          transparent={transparency}
          opacity={opacity}
        />
      </mesh>
      
      {text}

      {light}
    </group>
  );
  };
