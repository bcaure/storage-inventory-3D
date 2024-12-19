import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { TimelineDataType, RackType, DataContextType } from "./types";
import { DataContext } from "./DataContext";

export const DataContextProvider = ({ children }: PropsWithChildren) => {
  const [timelineData, setTimelineData] = useState<Array<TimelineDataType>>(new Array<TimelineDataType>());
  const [racks, setRacks] = useState<Array<RackType>>(new Array<RackType>());
  const [time, setTime] = useState<Date>();
  const [rackLetter, setRackLetter] = useState<string>();

  // Transform locations from Tracksphere to assets
  useEffect(() => {
    const fetchTimelineData = async () => {
      const response = await fetch('/timeMap-cho.json');
      const responseLocations = await response.json() as Array<TimelineDataType>;
      setTimelineData(responseLocations);
      setTime(responseLocations[0].date);
    }

    const fetchRacksData = async () => {
      const response = await fetch('/racks-cho.json');
      const responseRacks = await response.json() as Array<RackType>;
      setRacks(responseRacks);
      setRackLetter(responseRacks[0].letter);
    }

    fetchTimelineData();
    fetchRacksData();
  }, []);

  const currentTimeData = useMemo(() => {
    return rackLetter ? timelineData.find((data) => data.date === time)?.data?.filter((asset) => {
      return asset.name.startsWith(rackLetter);
    }) : [];
  }, [timelineData, time, rackLetter]);

  const currentRack = useMemo(() => {
    return racks.find((rack) => rack.letter === rackLetter);
  }, [racks, rackLetter]);


  const dataContextValue: DataContextType = useMemo(() => ({
    timelineData,
    setTimelineData,
    racks,
    setRacks,
    time, 
    setTime,
    currentTimeData,
    rackLetter,
    setRackLetter,
    currentRack,
  }), [timelineData, racks, time, currentTimeData, rackLetter, currentRack]);

  return (
    <DataContext.Provider value={dataContextValue}>
      {children}
    </DataContext.Provider>
  );
};
