import './App.css'

import { Canvas } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react';

import { AssetDataType, Coords, TracksphereResponse } from './types';
import { AnimatedCamera } from './AnimatedCamera';
import { OrbitControls } from '@react-three/drei';
import { Rack } from './Rack';
import { assetPositionZ, assetSizeHeight, boxSizeX, boxSizeY, ERRORS, WARNINGS } from './constants';
import { DirectionalLight } from 'three';
import { Button } from './shared/buttons';

export const Scene = ({ rackLetter }: { rackLetter: string }) => {
  const [boxNumberX, setBoxNumberX] = useState<number>();
  const [boxNumberY, setBoxNumberY] = useState<number>();

  const [assets, setAssets] = useState<Array<AssetDataType>>();

  const [camPosition, setCamPosition] = useState<Coords>();
  const [camTarget, setCamTarget] = useState<Coords>();

  const initCamPosition = (rackSizeX: number | undefined, rackSizeY: number | undefined) => {
    if (rackSizeX && rackSizeY) {
      return [0, (rackSizeY * boxSizeY) / 2, (rackSizeX * boxSizeX / 4)] as Coords;
    } else {
      throw new Error('Impossible to position camera without rack size');
    }
  };
  
  const initCamTarget = (rackSizeX: number | undefined, rackSizeY: number | undefined) => {
    if (rackSizeX && rackSizeY) {
      return [0, (rackSizeY * boxSizeY) / 2, 0] as Coords;
    } else {
      throw new Error('Impossible to position camera without rack size');
    }
  };

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await fetch('/locations-tracksphere-cho.json');
      const responseLocations = await response.json() as TracksphereResponse;

      let maxX: number | undefined = undefined;
      let maxY: number | undefined = undefined;

      const locationAssets = new Array<AssetDataType>();

      for (const location of responseLocations.data.rows) {
        const name = location.name.substring('location '.length);
        const x = parseInt(name.substring(1, 3));
        const y = parseInt(name.substring(3, 4));
    
        if (!Number.isNaN(x) && !Number.isNaN(y)) {
          if (name.startsWith(rackLetter)) {
            locationAssets.push({
              id: `${location.id}-0`,
              name,
              coords: [x, y, 0],
              state: ERRORS.includes([x, y, 0]) ? 'error' : WARNINGS.includes([x, y, 0]) ? 'warning' : 'correct',
            });
            locationAssets.push({
              id: `${location.id}-1`,
              name,
              coords: [x, y, 1],
              state: ERRORS.includes([x, y, 1]) ? 'error' : WARNINGS.includes([x, y, 1]) ? 'warning' : 'correct',
            });

            maxX = !maxX || x > maxX ? x : maxX;
            maxY = !maxY || y > maxY ? y : maxY;
          }
        }
      }

      // LOAD ASSETS DATA
      if (maxX && maxY) {
        setBoxNumberX(maxX);
        setBoxNumberY(maxY);
        setAssets(locationAssets);

        // CAMERA
        setCamPosition(initCamPosition(maxX, maxY));
        setCamTarget(initCamTarget(maxX, maxY));
      }
    };
    
    fetchLocations();
  }, [rackLetter]);

  const directionalLight = useRef<DirectionalLight>(null);

  const [ selectedAsset, setSelectedAsset ] = useState<AssetDataType>();
  const onAssetSelect = (asset: AssetDataType) => {
    setSelectedAsset(asset);

    setCamPosition([asset.coords[0], asset.coords[1], assetPositionZ * 2 + 3]);
    setCamTarget(asset.coords);
    directionalLight.current?.lookAt(asset.coords[0], asset.coords[1], asset.coords[2]);
  };

  const onGoBackClick = () => {
    setCamPosition(initCamPosition(boxNumberX, boxNumberY));
    setCamTarget(initCamTarget(boxNumberX, boxNumberY));
  };

  return (
    <div className="my-2 flex flex-col justify-center items-center">
      <Button onClick={onGoBackClick}>Go back</Button>
      <div id="canvas-container" style={{ width: '95vw', height: '30vh' }}>
        <Canvas>
          <ambientLight intensity={0.1} />
          {
            (camPosition && camTarget && directionalLight) && (
              <directionalLight
                ref={directionalLight}
                position={camPosition}
                color={'red'}
                intensity={100}
              />
            )
          }

          {
            camPosition && camTarget && (
              <>
                <AnimatedCamera position={camPosition} target={camTarget} />
                <OrbitControls />
              </>
            )
          }

          {
            (boxNumberX && boxNumberY && assets) && (
              <Rack
                boxNumberX={boxNumberX}
                boxNumberY={boxNumberY}
                assets={assets}
                selectedAsset={selectedAsset}
                setSelectedAsset={onAssetSelect}
              />
            )
          }
          
        </Canvas>
      </div>
    </div>
  );
};
