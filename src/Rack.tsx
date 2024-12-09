import './App.css'


import { AssetDataType, RackBoxProps, RackProps } from './types';
import { RackBox } from './RackBox';
import { AssetItem } from './AssetItem';
import { assetPositionZ, assetSizeHeight, boxSizeX, boxSizeY } from './constants';

export const Rack = ({ boxNumberX, boxNumberY, assets, selectedAsset, setSelectedAsset }: RackProps) => {
  const rackX = -boxNumberX * boxSizeX / 2;
  const rackZ = 0;

  const numberOfRows = Array.from({ length: boxNumberX }, (_, x) => x + 1);
  const numberOfColumns = Array.from({ length: boxNumberY }, (_, y) => y + 1);

  const rackBoxes: Array<RackBoxProps> = numberOfRows.flatMap((x) => (
    numberOfColumns.map((y) => (
      { id: `${Math.random()}`, coords: [rackX + (x * boxSizeX), y * boxSizeY, rackZ] }
    ))
  ));


  const assetItems: Array<AssetDataType> = assets.map((asset) => {
    const [ x, y, z ]  = asset.coords;
    return {
      ...asset,
      coords: [rackX + (x * boxSizeX), y * boxSizeY, z === 1 ? -(assetPositionZ) : (assetPositionZ)]
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
    </>
  )
}


