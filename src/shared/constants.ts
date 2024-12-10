import { TracksphereEvent } from "./types";

  // RACK
export const boxSizeX = 3;
export const boxSizeY = 3;
export const boxSizeZ = 3;
export const camMovement = 6;

// ASSETS
export const assetSizeDiam = boxSizeX / 2.1;
export const assetSizeHeight = boxSizeZ / 2.2;
export const assetPositionZ = assetSizeHeight / 1.9;

// DATA
export const ERRORS = [
  [13, 4, 1],
  [1, 2, 0],
];
export const WARNINGS = [
  [5, 3, 1],
  [7, 2, 0],
];

export const EVENTS: Array<TracksphereEvent> = [
  {
    id: '1',
    locationCode: 'A083',
    type: 'out',
    productCode: '30185',
    assetCode: '331854AAC000060000000034',
    date: new Date(),
  },
  {
    id: '2',
    locationCode: 'A153',
    type: 'out',
    productCode: '30185',
    assetCode: '331854AAC000060000000035',
    date: new Date(),
  },
  {
    id: '3',
    locationCode: 'A102',
    type: 'in',
    productCode: '30185',
    assetCode: '331854AAC000060000000036',
    date: new Date(),
  },
  {
    id: '4',
    locationCode: 'A083',
    type: 'in',
    productCode: '30185',
    assetCode: '331854AAC000060000000037',
    date: new Date(),
  }
];
