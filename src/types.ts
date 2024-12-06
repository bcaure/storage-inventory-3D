export type Coords = [number, number, number];
export type ShapeProps = {
  coords: Coords;
  boxSizeX: number;
  boxSizeY: number;
  boxSizeZ: number;
};

export type RackBoxProps = {
  coords: Coords;
  id: string;
};

export type AssetItemProps = {
  coords: Coords;
  id: string;
};
