import { Text } from "@react-three/drei";
import { AssetItemProps, Coords } from "./shared/types";
import { assetSizeHeight, assetSizeDiam, boxSizeX, boxSizeY, boxSizeZ } from "./shared/constants";
import { Mesh, TextureLoader } from "three";
import { useMemo, useRef } from "react";
import { useLoader } from "@react-three/fiber";

export const AssetItem = (props: AssetItemProps) => {
  const { coords, name, state, onClick } = props;
  const textureRubber = useLoader(TextureLoader, 'rubber.png');
  const textureMetal = useLoader(TextureLoader, 'metal-smooth.png');

  const assetFront = useRef<Mesh>(null);

  const flancWidth = 0.08;

  const click = () => {
    onClick(props);
  };

  let color: string | undefined = "gray";

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
    case 'warning':
      color = 'orange';
      light = reactAreaLight;
      text = errorText;
      break;
  }

  const wheel = useMemo(() => (
    <cylinderGeometry args={[assetSizeDiam, assetSizeDiam, flancWidth]} />
  ), []);

  return (
    <group position={[coords[0] - assetSizeDiam, coords[1] - 0.2, coords[2] - boxSizeZ]} rotation={[0, 0, 0]} onClick={click} receiveShadow>
      <mesh ref={assetFront} position={[-boxSizeX / 2, -boxSizeY / 2, coords[2]]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        { wheel }
        <meshBasicMaterial
          map={textureMetal}
          color={color}
        />
      </mesh>

      <mesh ref={assetFront} position={[-boxSizeX / 2, -boxSizeY / 2, -coords[2]]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        { wheel }
        <meshBasicMaterial
          map={textureMetal}
          color={color}
        />
      </mesh>
      <mesh position={[-boxSizeX / 2, -boxSizeY / 2, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <cylinderGeometry args={[assetSizeDiam / 1.5, assetSizeDiam / 1.5, assetSizeHeight]} />
        <meshBasicMaterial
          map={textureRubber}
          color={color}
        />
      </mesh>
      
      {text}

      {light}
    </group>
  );
};
