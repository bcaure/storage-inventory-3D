export type Coords = [number, number, number];
export type ShapeProps = {
  coords: Coords;
  boxSizeX: number;
  boxSizeY: number;
  boxSizeZ: number;
};

export type RackFrameProps = {
  coords: Coords;
  type: 'horizontal' | 'vertical' | 'transversal';
  id: string;
  boxNumberX: number;
  boxNumberY: number;
};

export type AssetStateType = 'correct' | 'missing-fyt' | 'missing-ts' | 'product-fyt' | 'product-ts';

export type AssetDataType = {
  id: string;
  name: string;
  coords: Coords;
  state: AssetStateType;
  productCodeTracsphere?: string;
  productCodeFyt?: string;
  assetCodeTracksphere?: string;
  assetCodeFyt?: string;
};

export type AssetItemProps = AssetDataType & {
  onClick: (asset: AssetDataType) => void;
  selected: boolean;
};

export type RackType = {
  letter: string;
  x: number;
  y: number;
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
  startDate: Date;
};

/// TIMELINE

export type TimelineDataType = {
  date: Date;
  data: Array<AssetDataType>;
};

export type DataContextType = {
  timelineData: Array<TimelineDataType>;
  setTimelineData: (a: Array<TimelineDataType>) => void;
  racks: Array<RackType>;
  setRacks: (a: Array<RackType>) => void;
  time: Date | undefined;
  setTime: ((a: Date) => void);
  currentTimeData: Array<AssetDataType> | undefined;
  rackLetter: string | undefined;
  setRackLetter: (a: string) => void;
  currentRack: RackType | undefined;
};
