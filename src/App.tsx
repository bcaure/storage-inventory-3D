import './App.css'

import { Canvas } from '@react-three/fiber'
import { useState } from 'react';

import { Asset, BoxCoords, Coords, Rack } from './types';
import { RackBox } from './RackBox';
import { AnimatedCamera } from './AnimatedCamera';
import { Geometry, Base, Ro, Addition } from '@react-three/csg';
import { OrbitControls, useTexture } from '@react-three/drei';

function App() {
  // CAMERA
  const initPosition = [20, 2, 50] as Coords;
  const [position, setPosition] = useState<Coords>(initPosition);

  // RACK
  const boxNumberX = 30;
  const boxNumberY = 5;

  const boxSizeX = 3;
  const boxSizeY = 3;
  const boxSizeZ = 8;

  const rackX = -boxNumberX * boxSizeX / 2;
  const rackZ = 0;

  const numberOfRows = Array.from({ length: boxNumberX }, (_, x) => x);
  const numberOfColumns = Array.from({ length: boxNumberY }, (_, y) => y);

  const rack: Array<Rack> = numberOfRows.flatMap((x) => (
    numberOfColumns.map((y) => (
      { id: `${Math.random()}`, coords: [rackX + (x * boxSizeX), y * boxSizeY, rackZ] }
    ))
  ));

  // ASSETS
  const assetSizeDiam = boxSizeX / 2.1;
  const assetSizeHeight = boxSizeZ / 2.2;

  const assets: Array<Asset> = numberOfRows.flatMap((x) => (
    numberOfColumns.flatMap((y) => (
      [
        { id: `${Math.random()}`, coords: [rackX + (x * boxSizeX), y * boxSizeY, -(assetSizeHeight / 1.9)] },
        { id: `${Math.random()}`, coords: [rackX + (x * boxSizeX), y * boxSizeY, (assetSizeHeight / 1.9)] },
      ]
    ))
  ));


  return (
    <>
      <button onClick={() => setPosition([20, 2, 150])}>Move camera</button>
      <div id="canvas-container" style={{ width: '80vw', height: '80vh' }}>
        <Canvas>
          <ambientLight intensity={0.1} />
          <AnimatedCamera initPosition={initPosition} position={position} />

          <OrbitControls />

          {
            rack.map((rackBox) => (
              <RackBox
                key={rackBox.id}
                coords={rackBox.coords}
                boxSizeX={boxSizeX}
                boxSizeY={boxSizeY}
                boxSizeZ={boxSizeZ}
              />
            ))
          }

          {
            assets.map((asset) => (
                <AssetBox
                  key={asset.id}
                  coords={asset.coords}
                  boxSizeX={assetSizeDiam}
                  boxSizeY={0}
                  boxSizeZ={assetSizeHeight}
                />
              )
            )
          }
          
        </Canvas>
      </div>
    </>
  )
}

export const AssetBox = ({ coords, boxSizeX, boxSizeZ }: BoxCoords) => {
  const textureRubber = useTexture('rubber.png');
  const textureMetal = useTexture('metal-smooth.png');

  const flancWidth = boxSizeZ / 10;  

  return (
    <>
      <mesh position={coords} rotation={[Math.PI / 2, 0, 0]}>
        <Geometry>
          <Base position={[0, (boxSizeZ / 2) , 0]}>
            <cylinderGeometry args={[boxSizeX, boxSizeX, flancWidth]} />
          </Base>
          <Addition position={[0, -(boxSizeZ / 2) , 0]}>
            <cylinderGeometry args={[boxSizeX, boxSizeX, flancWidth]} />
          </Addition>
        </Geometry>
        <meshBasicMaterial map={textureMetal} />
      </mesh>
      <mesh position={coords} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[boxSizeX / 1.5, boxSizeX / 1.5, boxSizeZ]} />
        <meshBasicMaterial map={textureRubber} />
      </mesh>
    </>

  );
};


export default App
