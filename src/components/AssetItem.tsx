import { Text } from "@react-three/drei";
import { AssetItemProps, Coords } from "../shared/types";
import { assetSizeHeight, assetSizeDiam, boxSizeX, boxSizeY, boxSizeZ } from "../shared/constants";
import { Mesh, TextureLoader, TorusGeometry } from "three";
import { useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";

export const AssetItem = (props: AssetItemProps) => {
  const { coords: initCoords, name, state, change, onClick } = props;
  const textureRubber = useLoader(TextureLoader, 'rubber.png');
  const textureMetal = useLoader(TextureLoader, 'metal-smooth.png');

  const coords = useMemo(() => {
    const result = [...initCoords];
    if (name.endsWith('-1')) {
      result[0] += boxSizeX / 2;
    }
    return result;
  }, [initCoords, name]);

  const assetFront = useRef<Mesh>(null);

  const flancWidth = 0.08;

  const click = () => {
    onClick(props);
  };

  let color: string | undefined = "gray";

  const frontCoords: Coords = [-boxSizeX / 2, -boxSizeY / 2, assetSizeHeight + 0.2];

  const reactAreaLight = <pointLight position={frontCoords} intensity={1000} color="#fff" castShadow />;
  let light = <></>;
  const errorText = <Text position={frontCoords} color="white" fontSize={0.75}>{name}</Text>;
  let text = <></>;

  switch(state) {
    case 'missing-fyt':
    case 'missing-ts':
      color = 'red';
      light = reactAreaLight;
      text = errorText;
      break;
    case 'product':
      color = 'orange';
      light = reactAreaLight;
      text = errorText;
      break;
  }

  if (props.selected) {
    text = <Text position={frontCoords} color="white" fontSize={0.5}>{name}</Text>;
  }

  const torusGeo = useRef<TorusGeometry>(null);
  const torusAnim = useRef<boolean>(true);
  const torusAnimFirstDelay = useRef<number>(0);
  const torusAnimSecondDelay = useRef<number>(0);

  useFrame((state, delta) => {
    torusAnimFirstDelay.current += delta;
    if (torusAnimFirstDelay.current > 1) {
      torusAnim.current = !torusAnim.current;
      torusAnimFirstDelay.current = 0;
      torusAnimSecondDelay.current = 0;
      return;
    } else {
      torusAnimFirstDelay.current += delta;
    }

    if (torusGeo.current && torusAnimFirstDelay.current > 0.1) {
      torusAnimSecondDelay.current = 0;
      const coef = 1.005;
      if (torusAnim.current) {
        torusGeo.current.scale(coef, coef, 1);
      } else {
        torusGeo.current.scale(1/coef, 1/coef, 1);
      }
    } else {
      torusAnimSecondDelay.current += delta;
    }
  });

  const arrow = useMemo(() => change ? (
    <mesh position={frontCoords}>
      <torusGeometry ref={torusGeo} args={[boxSizeX / 4 + 0.05, 0.1, 16, 48, Math.PI * 2]} />
      <meshBasicMaterial color="#55F" />
    </mesh>
  ) : <></>, [change, frontCoords]);	

  const wheel = useMemo(() => (
    <cylinderGeometry args={[assetSizeDiam, assetSizeDiam, flancWidth]} />
  ), []);

  return (
    <group position={[coords[0] - assetSizeDiam, coords[1], coords[2] - boxSizeZ]} rotation={[0, 0, 0]} onClick={click} receiveShadow>
      <mesh ref={assetFront} position={[-boxSizeX / 2, -boxSizeY / 2, coords[2]]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        { wheel }
        <meshBasicMaterial
          map={textureMetal}
          color={color}
        />
      </mesh>

      {/* <mesh ref={assetFront} position={[-boxSizeX / 2, -boxSizeY / 2, -coords[2]]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        { wheel }
        <meshBasicMaterial
          map={textureMetal}
          color={color}
        />
      </mesh> */}
      {/* <mesh position={[-boxSizeX / 2, -boxSizeY / 2, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <cylinderGeometry args={[assetSizeDiam / 1.5, assetSizeDiam / 1.5, assetSizeHeight]} />
        <meshBasicMaterial
          map={textureRubber}
          color={color}
        />
      </mesh> */}
      
      {text}

      {light}

      {arrow}
    </group>
  );
};
