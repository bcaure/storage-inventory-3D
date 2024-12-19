import { DirectionalLight } from 'three';
import { Canvas } from '@react-three/fiber'
import { useContext, useEffect, useRef, useState } from 'react';

import { AnimatedCamera } from './AnimatedCamera';
import { Rack } from './Rack';
import { DataContext } from '../shared/DataContext';
import { ButtonsGroup } from '../shared/ButtonsGroup';
import { boxSizeY, assetPositionZ, camMovementXY, boxSizeX, camMovementZ } from '../shared/constants';
import { AssetDataType, Coords } from '../shared/types';

export const Scene = () => {
  const dataContext = useContext(DataContext);

  const { x: boxNumberX, y: boxNumberY } = dataContext.currentRack ?? { x: 0, y: 0 };

  const [camPosition, setCamPosition] = useState<Coords>();
  const [camTarget, setCamTarget] = useState<Coords>();

  const initCamPosition = (rackSizeX: number | undefined, rackSizeY: number | undefined, canvasWidth: number, canvasHeight: number) => {
    if (rackSizeX && rackSizeY) {
      // Position the camera so it can show the whole rack
      const canvaRatio = canvasWidth / canvasHeight;
      const rackRatio = rackSizeX / rackSizeY;
      if (rackRatio > canvaRatio) {
        // rack width is the limiter
        return [0, (rackSizeY * boxSizeY) / 2, (rackSizeX / canvaRatio) * 40] as Coords;
      } else {
        // rack height is the limiter
        return [0, (rackSizeY * boxSizeY) / 2, (rackSizeY / canvaRatio) * 200] as Coords;
      }
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

  const canvasContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (boxNumberX && boxNumberY && canvasContainerRef.current) {
      // CAMERA
      setCamPosition(initCamPosition(boxNumberX, boxNumberY, canvasContainerRef.current.offsetWidth, canvasContainerRef.current.offsetHeight));
      setCamTarget(initCamTarget(boxNumberX, boxNumberY));
    }
  }, [boxNumberX, boxNumberY]);


  const directionalLight = useRef<DirectionalLight>(null);

  const [ selectedAsset, setSelectedAsset ] = useState<AssetDataType>();
  const onAssetSelect = (asset: AssetDataType) => {
    setSelectedAsset(asset);

    setCamPosition([asset.coords[0] - boxSizeX / 2, asset.coords[1] - boxSizeY / 2, assetPositionZ + 50]);
    setCamTarget(asset.coords);
    directionalLight.current?.lookAt(asset.coords[0], asset.coords[1], asset.coords[2]);
  };

  const onResetPositionClick = () => {
    setCamPosition(initCamPosition(boxNumberX, boxNumberY, canvasContainerRef.current?.offsetWidth ?? 0, canvasContainerRef.current?.offsetHeight ?? 0));
    setCamTarget(initCamTarget(boxNumberX, boxNumberY));
  };

  const onNavigateClick = (x: number, y: number, z: number) => {
    if (camPosition && camTarget) {
      const camZ = camPosition[2] + z < 1 ? camPosition[2] : camPosition[2] + z;

      setCamPosition([camPosition[0] + x, camPosition[1] + y, camZ]);
      setCamTarget([camPosition[0] + x, camPosition[1] + y, camZ]);
    }
  };

  return (
    <div className="my-2 flex flex-col justify-center items-center h-full w-full max-h-full truncate">
      <ButtonsGroup
        buttonLeft={{
          id: 'reset',
          icon: <svg stroke="white" fill="white" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></svg>,
          onClick: () => onResetPositionClick(),
        }}
        buttonsMiddle={[
          {
            id: 'left',
            icon: <svg stroke="white" fill="white" strokeWidth="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M0.5 8l7.5 7.5v-4.5h8v-6h-8v-4.5z"></path></svg>,
            onClick: () => onNavigateClick(-camMovementXY, 0, 0),
          },
          {
            id: 'up',
            icon: <svg stroke="white" fill="white" strokeWidth="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8 0.5l-7.5 7.5h4.5v8h6v-8h4.5z"></path></svg>,
            onClick: () => onNavigateClick(0, 0, -camMovementZ),
          },
          {
            id: 'down',
            icon: <svg stroke="white" fill="white" strokeWidth="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8 15.5l7.5-7.5h-4.5v-8h-6v8h-4.5z"></path></svg>,
            onClick: () => onNavigateClick(0, 0, camMovementZ),
          },
        ]}
        buttonRight={{
          id: 'right',
          icon: <svg stroke="white" fill="white" strokeWidth="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 8l-7.5-7.5v4.5h-8v6h8v4.5z"></path></svg>,
          onClick: () => onNavigateClick(camMovementXY, 0, 0),
        }}
      />
      <div ref={canvasContainerRef} id="canvas-container" className="my-2 w-full flex-1 max-h-[calc(100vh-30rem)]">
        <Canvas>
          <ambientLight intensity={0.1} />
          {
            camPosition && camTarget && (
              <>
                <AnimatedCamera position={camPosition} target={camTarget} />
                {/* <OrbitControls /> */}
              </>
            )
          }

          {
            (!!boxNumberX && !!boxNumberY && dataContext.currentTimeData) && (
              <Rack
                boxNumberX={boxNumberX}
                boxNumberY={boxNumberY}
                assets={dataContext.currentTimeData}
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
