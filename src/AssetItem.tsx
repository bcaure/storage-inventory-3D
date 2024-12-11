import { Geometry, Base, Addition, Subtraction } from "@react-three/csg";
import { useTexture, Text } from "@react-three/drei";
import { AssetItemProps, Coords } from "./shared/types";
import { assetSizeHeight, assetSizeDiam, boxSizeX, boxSizeY } from "./shared/constants";
import { Mesh, TextureLoader } from "three";
import { useMemo, useRef } from "react";
import { useLoader } from "@react-three/fiber";

export const AssetItem = (props: AssetItemProps) => {
  const { coords, name, state, onClick } = props;
  const textureRubber = useLoader(TextureLoader, 'rubber.png');
  const textureMetal = useLoader(TextureLoader, 'metal-smooth.png');

  const assetFront = useRef<Mesh>(null);

  const flancWidth = 0.08;

  const displayName = () => {
    onClick(props);
  };

  let color: string | undefined = "gray";
  let transparency: boolean | undefined = false;
  let opacity: number | undefined = 1;

  const frontCoords: Coords = [-boxSizeX / 2, -boxSizeY / 2, assetSizeHeight + 0.2];

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

  const wheel = useMemo(() => (
    <>
      <Geometry>
        <Base position={[0, 0, 0]} receiveShadow>
          <torusGeometry args={[assetSizeDiam, flancWidth]} />
        </Base>
        <Addition position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[assetSizeDiam * 2, assetSizeDiam / 3, flancWidth]} />
        </Addition>
        <Addition position={[0, 0, 0]} rotation={[0, 0, Math.PI / 3]} receiveShadow>
          <boxGeometry args={[assetSizeDiam * 2, assetSizeDiam / 3, flancWidth]} />
        </Addition>
        <Addition position={[0, 0, 0]} rotation={[0, 0, Math.PI * 2 / 3]} receiveShadow>
          <boxGeometry args={[assetSizeDiam * 2, assetSizeDiam / 3, flancWidth]} />
        </Addition>
        <Addition position={[0, 0, 0.01]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
          <cylinderGeometry args={[assetSizeDiam / 2, assetSizeDiam / 2, flancWidth]} />
        </Addition>
      </Geometry>
      <meshBasicMaterial
        map={textureMetal}
        color={color}
        transparent={transparency}
        opacity={opacity}
      />
    </>
  ), [color, opacity, textureMetal, transparency]);

  return (
    <group position={[coords[0], coords[1], coords[2]]} onClick={displayName} receiveShadow>
      <mesh ref={assetFront} position={[-boxSizeX / 2, -boxSizeY / 2, coords[2]]} receiveShadow>
        { wheel }
      </mesh>

      <mesh ref={assetFront} position={[-boxSizeX / 2, -boxSizeY / 2, -coords[2]]} receiveShadow>
        { wheel }
      </mesh>

      <mesh position={[-boxSizeX / 2, -boxSizeY / 2, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
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
