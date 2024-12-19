import { AssetDataType, RackFrameProps, RackProps } from '../shared/types';
import { RackFrame } from './RackFrame';
import { AssetItem } from './AssetItem';
import { assetPositionZ, assetSizeHeight, boxSizeX, boxSizeZ, frameSideWidth, boxSizeY } from '../shared/constants';
import { Text } from '@react-three/drei';
import { rackXY } from '../shared/helper';
import { useMemo } from 'react';

export const Rack = ({ boxNumberX, boxNumberY, assets, selectedAsset, setSelectedAsset }: RackProps) => {
  const rackZ = useMemo(() => -boxSizeZ / 2, []);

  const columns = useMemo(() => Array.from({ length: boxNumberX + 1 }, (_, x) => x), [boxNumberX]);;
  const rows = useMemo(() => Array.from({ length: boxNumberY + 1 }, (_, y) => y), [boxNumberY]);;

  const verticalFrames: Array<RackFrameProps> = useMemo(() => columns.flatMap((x) => [
    { id: `${Math.random()}`, coords: [rackXY(x, 0, boxNumberX)[0], 0, rackZ], type: 'vertical', boxNumberX, boxNumberY },
    { id: `${Math.random()}`, coords: [rackXY(x, 0, boxNumberX)[0], 0, rackZ + (boxSizeZ)], type: 'vertical', boxNumberX, boxNumberY }
  ]), [boxNumberX, boxNumberY, columns, rackZ]);

  const horizontalFrames: Array<RackFrameProps> = useMemo(() => rows.flatMap((y) => [
    { id: `${Math.random()}`, coords: [0, rackXY(0, y, 0)[1], rackZ], type: 'horizontal', boxNumberX, boxNumberY },
    { id: `${Math.random()}`, coords: [0, rackXY(0, y, 0)[1], rackZ + boxSizeZ], type: 'horizontal', boxNumberX, boxNumberY }
  ]), [boxNumberX, boxNumberY, rackZ, rows]);

  const transversalFrames: Array<RackFrameProps> = useMemo(() => columns.flatMap((x) => rows.map((y) => (
    { id: `${Math.random()}`, coords: [rackXY(x, y, boxNumberX)[0], rackXY(x, y, boxNumberX)[1], rackZ], type: 'transversal', boxNumberX, boxNumberY }
  ))), [boxNumberX, boxNumberY, columns, rackZ, rows]);

  const assetItems: Array<AssetDataType> = useMemo(() => assets.map((asset) => {
    const [ x, y, z ]  = asset.coords;
    return {
      ...asset,
      coords: [...rackXY(x, y, boxNumberX), z === 1 ? -(assetPositionZ) : (assetPositionZ)],
    };
  }), [assets, boxNumberX]);;

  return (
    <>
      {
        verticalFrames.map((verticalFrame) => (
          <RackFrame key={verticalFrame.id} { ...verticalFrame } />
        ))
      }

      {
        horizontalFrames.map((horizontalFrame) => (
          <RackFrame key={horizontalFrame.id} { ...horizontalFrame } />
        ))
      }

      {
        transversalFrames.map((transversalFrame) => (
          <RackFrame key={transversalFrame.id} { ...transversalFrame } />
        ))
      }

      {
        assetItems.map((asset) => (
            <AssetItem
              key={asset.id}
              { ...asset }
              selected={selectedAsset?.id === asset.id}
              onClick={setSelectedAsset}
            />
          )
        )
      }

      { /* Columns and rows number */ }
      {
        columns.slice(1).map((column) => {
          const xy = rackXY(column, -0.2, boxNumberX);
          return (
            <Text
              key={column}
              position={[xy[0] - boxSizeX / 2, xy[1], assetSizeHeight + 0.2 + 2 * frameSideWidth]}
              color="white"
              fontSize={1}
            >
              {column}
            </Text>
          );
        })
      }
      {
        rows.slice(1).map((row) => {
          const xy = rackXY(-0.2, row, boxNumberX);
          return (
            <Text
              key={row}
              position={[xy[0], xy[1] - boxSizeY / 2, assetSizeHeight + 0.2 + 2 * frameSideWidth]}
              color="white"
              fontSize={1}
            >
              {row}
            </Text>
          );
        })
      }
    </>
  )
}


