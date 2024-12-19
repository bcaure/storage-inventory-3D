import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { TimelineDataType, RackType, DataContextType } from "./types";
import { DataContext } from "./DataContext";

export const DataContextProvider = ({ children }: PropsWithChildren) => {
  const [timelineData, setTimelineData] = useState<Array<TimelineDataType>>(new Array<TimelineDataType>());
  const [racks, setRacks] = useState<Array<RackType>>(new Array<RackType>());
  const [time, setTime] = useState<Date>();
  const [rackLetter, setRackLetter] = useState<string>();


  console.log("time", time);

  // Transform locations from Tracksphere to assets
  useEffect(() => {
    const fetchTimelineData = async () => {
      const response = await fetch('/timeMap-cho.json');
      const responseLocations = await response.json() as Array<TimelineDataType>;
      setTimelineData(responseLocations.map((r) => ({...r, date: new Date(r.date)})));
      setTime(new Date(responseLocations[0].date));
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
    if (rackLetter && time) {
      const timedData = timelineData.find((data) => data.date.getTime() === time?.getTime());
      if (timedData) {
        return timedData?.data.filter((asset) => {
          return asset.name.startsWith(rackLetter);
        });
      } else {
        throw new Error(`No data found for this time ${time?.getTime()}`);
      }
    } else {
      return [];
    }
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
