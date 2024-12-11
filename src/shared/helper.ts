import { boxSizeX, boxSizeY, ERRORS, WARNINGS } from "./constants";
import { AssetStateType } from "./types";

export const computeState = (code: string, codeBehind?: string): AssetStateType => {
  const stateBehind = codeBehind ? computeState(codeBehind) : undefined;
  const isTransparent = stateBehind && ['error', 'warning'].includes(stateBehind);

  if (ERRORS.includes(code)) {
    return isTransparent ? 'transparent-error' : 'error';
  } else if (WARNINGS.includes(code)) {
    return isTransparent ? 'transparent-warning' : 'warning';
  } else {
    return isTransparent ? 'transparent-correct' : 'correct';
  }
};

export const rackXY = (x: number, y: number, boxNumberX: number): [number, number] => [-boxNumberX * boxSizeX / 2 + (x * boxSizeX), y * boxSizeY];

