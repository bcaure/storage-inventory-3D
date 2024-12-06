export type Coords = [number, number, number];
export type BoxCoords = {
  coords: Coords;
  boxSizeX: number;
  boxSizeY: number;
  boxSizeZ: number;
};

export type Rack = {
  coords: Coords;
  id: string;
};

export type Asset = {
  coords: Coords;
  id: string;
};
