import { createContext } from "react";
import { DataContextType, RackType, TimelineDataType } from "./types";

export const DataContext = createContext<DataContextType>({
  timelineData: new Array<TimelineDataType>(),
  setTimelineData: () => {},
  racks: new Array<RackType>(),
  setRacks: () => {},
  currentTimeData: undefined,
  time: undefined,
  setTime: () => {},
  rackLetter: undefined,
  setRackLetter: () => {},
  currentRack: undefined,
});
