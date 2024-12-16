import { boxSizeX, boxSizeY, ERRORS, WARNINGS } from "./constants";
import { AssetStateType } from "./types";

export const computeState = (code: string): AssetStateType => {

  if (ERRORS.includes(code)) {
    return 'error';
  } else if (WARNINGS.includes(code)) {
    return 'warning';
  } else {
    return 'correct';
  }
};

export const rackXY = (x: number, y: number, boxNumberX: number): [number, number] => [
  -boxNumberX * boxSizeX / 2 + (x * boxSizeX),
  y * boxSizeY
];

