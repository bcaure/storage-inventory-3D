import { createContext, Dispatch } from "react";
import { AssetDataType, TracksphereEvent } from "./types";

export const DataContext = createContext<{
  events: TracksphereEvent[];
  setEvents: Dispatch<React.SetStateAction<TracksphereEvent[]>> | undefined;
  assets: AssetDataType[];
  setAssets: Dispatch<React.SetStateAction<AssetDataType[]>> | undefined;
}>({
  events: new Array<TracksphereEvent>(),
  setEvents: undefined,
  assets: new Array<AssetDataType>(),
  setAssets: undefined,
});
