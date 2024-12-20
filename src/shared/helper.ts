import { boxSizeX, boxSizeY } from "./constants";


export const rackXY = (x: number, y: number, boxNumberX: number): [number, number] => [
  -boxNumberX * boxSizeX / 2 + (x * boxSizeX),
  y * boxSizeY
];

