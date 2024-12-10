import './App.css'

import { Canvas } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react';

import { AssetDataType, Coords, TracksphereResponse } from './types';
import { AnimatedCamera } from './AnimatedCamera';
import { Rack } from './Rack';
import { assetPositionZ, boxSizeX, boxSizeY, camMovement, ERRORS, WARNINGS } from './constants';
import { DirectionalLight } from 'three';
import { ButtonsGroup } from './shared/ButtonsGroup';

export const Scene = ({ currentLetter }: { currentLetter: string }) => {
  const [locations, setLocations] = useState<TracksphereResponse>();

  const [boxNumberX, setBoxNumberX] = useState<number>();
  const [boxNumberY, setBoxNumberY] = useState<number>();

  const [assets, setAssets] = useState<Array<AssetDataType>>();

  const [camPosition, setCamPosition] = useState<Coords>();
  const [camTarget, setCamTarget] = useState<Coords>();

  const initCamPosition = (rackSizeX: number | undefined, rackSizeY: number | undefined) => {
    if (rackSizeX && rackSizeY) {
      return [0, (rackSizeY * boxSizeY) / 2, (rackSizeX * boxSizeX / 3.5)] as Coords;
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
      setLocations(responseLocations);
    }
    fetchLocations();
  }, []);

  useEffect(() => {
    if (currentLetter && locations) {
      let maxX: number | undefined = undefined;
      let maxY: number | undefined = undefined;

      const locationAssets = new Array<AssetDataType>();

      for (const location of locations.data.rows) {
        const name = location.name.substring('location '.length);
        const x = parseInt(name.substring(1, 3));
        const y = parseInt(name.substring(3, 4));
    
        if (!Number.isNaN(x) && !Number.isNaN(y)) {
          if (name.startsWith(currentLetter)) {
            const computeState = (coords: Coords): 'error' | 'warning' | 'correct' => {
              const hasCoords = (list: number[][]) => list.some(([x, y, z]) => coords[0] === x && coords[1] === y && coords[2] === z);
              if (hasCoords(ERRORS)) {
                return 'error';
              } else if (hasCoords(WARNINGS)) {
                return 'warning';
              } else {
                return 'correct';
              }
            };

            const coords0: Coords = [x, y, 0];
            locationAssets.push({
              id: `${location.id}-0`,
              name,
              coords: coords0,
              state: computeState(coords0),
            });

            const coords1: Coords = [x, y, 1];
            locationAssets.push({
              id: `${location.id}-1`,
              name,
              coords: coords1,
              state: computeState(coords1),
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
    }
  }, [currentLetter, locations]);

  const directionalLight = useRef<DirectionalLight>(null);

  const [ selectedAsset, setSelectedAsset ] = useState<AssetDataType>();
  const onAssetSelect = (asset: AssetDataType) => {
    setSelectedAsset(asset);

    setCamPosition([asset.coords[0], asset.coords[1], assetPositionZ * 2 + 3]);
    setCamTarget(asset.coords);
    directionalLight.current?.lookAt(asset.coords[0], asset.coords[1], asset.coords[2]);
  };

  const onResetPositionClick = () => {
    setCamPosition(initCamPosition(boxNumberX, boxNumberY));
    setCamTarget(initCamTarget(boxNumberX, boxNumberY));
  };

  const onNavigateClick = (x: number, y: number, z: number) => {
    if (camPosition && camTarget) {
      setCamPosition([camPosition[0] + x, camPosition[1] + y, camPosition[2] + z]);
      setCamTarget([camPosition[0] + x, camPosition[1] + y, camPosition[2] + z]);
    }
  };

  return (
    <div className="my-2 flex flex-col justify-center items-center">
      <ButtonsGroup
        buttonLeft={{
          id: 'reset',
          icon: <svg stroke="white" fill="white" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></svg>,
          onClick: () => onResetPositionClick(),
        }}
        buttonsMiddle={[
          {
            id: 'left',
            icon: <svg stroke="white" fill="white" stroke-width="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M0.5 8l7.5 7.5v-4.5h8v-6h-8v-4.5z"></path></svg>,
            onClick: () => onNavigateClick(-camMovement, 0, 0),
          },
          {
            id: 'up',
            icon: <svg stroke="white" fill="white" stroke-width="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8 0.5l-7.5 7.5h4.5v8h6v-8h4.5z"></path></svg>,
            onClick: () => onNavigateClick(0, 0, -camMovement),
          },
          {
            id: 'down',
            icon: <svg stroke="white" fill="white" stroke-width="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8 15.5l7.5-7.5h-4.5v-8h-6v8h-4.5z"></path></svg>,
            onClick: () => onNavigateClick(0, 0, camMovement),
          },
        ]}
        buttonRight={{
          id: 'right',
          icon: <svg stroke="white" fill="white" stroke-width="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 8l-7.5-7.5v4.5h-8v6h8v4.5z"></path></svg>,
          onClick: () => onNavigateClick(camMovement, 0, 0),
        }}
      />
      <div id="canvas-container" style={{ width: '95vw', height: '50vh' }}>
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
                {/* <OrbitControls /> */}
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
