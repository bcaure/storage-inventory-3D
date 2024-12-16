import { TracksphereEvent } from "./types";

  // RACK
export const boxSizeX = 6;
export const boxSizeY = 3;
export const boxSizeZ = 3;
export const frameSideWidth = 0.1;
export const camMovement = 6;

// ASSETS
export const assetSizeDiam = 1.4;
export const assetSizeHeight = 2;
export const assetPositionZ = assetSizeHeight / 1.9;

// DATA
export const ERRORS = [
  'A134-1',
  'A012-0',
];
export const WARNINGS = [
  'A53-1',
  'A72-0',
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
