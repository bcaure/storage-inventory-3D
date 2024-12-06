import './App.css'


import { AssetItemProps, RackBoxProps } from './types';
import { RackBox } from './RackBox';
import { AssetItem } from './AssetItem';
import { assetSizeHeight, boxSizeX, boxSizeY } from './constants';

export const Rack = ({ boxNumberX, boxNumberY }: { boxNumberX: number; boxNumberY: number; }) => {
  const rackX = -boxNumberX * boxSizeX / 2;
  const rackZ = 0;

  const numberOfRows = Array.from({ length: boxNumberX }, (_, x) => x);
  const numberOfColumns = Array.from({ length: boxNumberY }, (_, y) => y);

  const rack: Array<RackBoxProps> = numberOfRows.flatMap((x) => (
    numberOfColumns.map((y) => (
      { id: `${Math.random()}`, coords: [rackX + (x * boxSizeX), y * boxSizeY, rackZ] }
    ))
  ));


  const assets: Array<AssetItemProps> = numberOfRows.flatMap((x) => (
    numberOfColumns.flatMap((y) => (
      [
        { id: `${Math.random()}`, coords: [rackX + (x * boxSizeX), y * boxSizeY, -(assetSizeHeight / 1.9)] },
        { id: `${Math.random()}`, coords: [rackX + (x * boxSizeX), y * boxSizeY, (assetSizeHeight / 1.9)] },
      ]
    ))
  ));


  return (
    <>
      {
        rack.map((rackBox) => (
          <RackBox
            key={rackBox.id}
            { ...rackBox }
          />
        ))
      }

      {
        assets.map((asset) => (
            <AssetItem
              key={asset.id}
              { ...asset }
            />
          )
        )
      }
    </>
  )
}


