import './App.css'


import { AssetDataType, RackBoxProps, RackProps } from './types';
import { RackBox } from './RackBox';
import { AssetItem } from './AssetItem';
import { assetPositionZ, assetSizeHeight, boxSizeX, boxSizeY } from './constants';
import { Text } from '@react-three/drei';

export const Rack = ({ boxNumberX, boxNumberY, assets, selectedAsset, setSelectedAsset }: RackProps) => {
  const rackXY = (x: number, y: number): [number, number] => [-boxNumberX * boxSizeX / 2 + (x * boxSizeX), y * boxSizeY];
  const rackZ = 0;

  const columns = Array.from({ length: boxNumberX }, (_, x) => x + 1);
  const rows = Array.from({ length: boxNumberY }, (_, y) => y + 1);

  const rackBoxes: Array<RackBoxProps> = columns.flatMap((x) => (
    rows.map((y) => (
      { id: `${Math.random()}`, coords: [...rackXY(x, y), rackZ] }
    ))
  ));


  const assetItems: Array<AssetDataType> = assets.map((asset) => {
    const [ x, y, z ]  = asset.coords;
    return {
      ...asset,
      coords: [...rackXY(x, y), z === 1 ? -(assetPositionZ) : (assetPositionZ)]
    };
  });

  return (
    <>
      {
        rackBoxes.map((rackBox) => (
          <RackBox
            key={rackBox.id}
            { ...rackBox }
          />
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
      {
        columns.map((column) => (
          <Text
            position={[...rackXY(column, boxNumberY + 1), assetSizeHeight + 0.2]}
            color="white"
            fontSize={1}
          >
            {column}
          </Text>
        ))
      }
      {
        rows.map((row) => (
          <Text
            position={[...rackXY(0, row), assetSizeHeight + 0.2]}
            color="white"
            fontSize={1}
          >
            {row}
          </Text>
        ))
      }
    </>
  )
}


