import './App.css'


import { AssetDataType, RackBoxProps, RackProps } from './shared/types';
import { RackBox } from './RackBox';
import { AssetItem } from './AssetItem';
import { assetPositionZ, assetSizeHeight } from './shared/constants';
import { Text } from '@react-three/drei';
import { rackXY } from './shared/helper';

export const Rack = ({ boxNumberX, boxNumberY, assets, selectedAsset, setSelectedAsset }: RackProps) => {
  const rackZ = 0;

  const columns = Array.from({ length: boxNumberX }, (_, x) => x + 1);
  const rows = Array.from({ length: boxNumberY }, (_, y) => y + 1);

  const rackBoxes: Array<RackBoxProps> = columns.flatMap((x) => (
    rows.map((y) => (
      { id: `${Math.random()}`, coords: [...rackXY(x, y, boxNumberX), rackZ] }
    ))
  ));


  const assetItems: Array<AssetDataType> = assets.map((asset) => {
    const [ x, y, z ]  = asset.coords;
    return {
      ...asset,
      coords: [...rackXY(x, y, boxNumberX), z === 1 ? -(assetPositionZ) : (assetPositionZ)]
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

      { /* Columns and rows number */ }
      {
        columns.map((column) => (
          <Text
            key={column}
            position={[...rackXY(column, 0, boxNumberX), assetSizeHeight + 0.2]}
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
            key={row}
            position={[...rackXY(0, row, boxNumberX), assetSizeHeight + 0.2]}
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


