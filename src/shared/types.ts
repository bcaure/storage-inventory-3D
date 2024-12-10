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

export type AssetDataType = {
  id: string;
  name: string;
  coords: Coords;
  state: 'error' | 'warning' | 'correct';
};

export type AssetItemProps = AssetDataType & {
  onClick: (asset: AssetDataType) => void;
  selected: boolean;
};

export type RackProps = {
  boxNumberX: number;
  boxNumberY: number;
  assets: Array<AssetDataType>;
  selectedAsset: AssetDataType | undefined;
  setSelectedAsset: (asset: AssetDataType) => void;
};

export type AnimatedCameraProps = {
  position: Coords | undefined;
  target: Coords | undefined;
};

/// TRACKSPHERE

export type TracksphereResponse = {
  data: {
    count: number;
    rows: Array<{
      id: string;
      name: string;
      code: string; 
      elementType: {
        name: string;
      };
    }>;
  }
};

export type TracksphereEvent = {
  id: string;
  locationCode: string;
  type: "out" | "in";
  assetCode: string;
  productCode: string;
  date: Date;
};


