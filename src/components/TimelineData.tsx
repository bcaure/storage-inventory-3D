import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Card, Timeline } from "flowbite-react";
import { DataContext } from "../shared/DataContext";
import { TimelineDataType } from "../shared/types";
import { GoDot } from "react-icons/go";
import { FaPlay, FaStop } from "react-icons/fa";

export const TimelineData = () => {
  const { timelineData, rackLetter, time, setTime } = useContext(DataContext);
  const dateString = useMemo(() => time?.toISOString().substring(0, 10), [time]);

  const timeIndex = useRef<number>(0);
  const selectTime = useCallback((e: TimelineDataType) => {
    setTime(e.date);
    timeIndex.current = timelineData.findIndex((e1) => e1.date.getTime() === e.date.getTime());
  }, [setTime, timelineData]);

  console.log("time component", time?.getHours());

  const [playTrigger, setPlayTrigger] = useState(false);

  const interval = useRef<number>();
  useEffect(() => {
    if (playTrigger && !interval.current) {
      interval.current = setInterval(() => {
        if (timeIndex.current < timelineData.length - 1) {
          console.log("selectTime", timeIndex.current);
          timeIndex.current += 1;
          selectTime(timelineData[timeIndex.current]);
        } else {
          console.log("stopTimeline");
          stopTimeline();
        }
      }, 2500);
    }

    return () => {
      console.log("stopTimeline2");
      //clearInterval(interval.current);
    }
  }, [playTrigger, selectTime, timelineData]);

  const playTimeline = () => {
    setPlayTrigger(true);
  };

  const stopTimeline = () => {
    setPlayTrigger(false);
    clearInterval(interval.current);
    interval.current = undefined;
  };

  return (
    <Card className="min-w-[500px] max-w-full h-[30vh] overflow-auto">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex gap-x-3">
        {dateString}
        { !playTrigger && (
          <button className="text-gray-800 bg-gray-50 text-3xl flex items-center justify-center rounded-md w-7 h-7" onClick={playTimeline}>
            <FaPlay className="w-4 h-4" />
          </button>
        )}
        { playTrigger && (
          <button className="text-gray-800 bg-gray-50 -text-3xl flex items-center justify-center rounded-md w-7 h-7" onClick={stopTimeline}>
            <FaStop className="w-4 h-4" />
          </button>
        )}
      </h5>
      <Timeline horizontal className="flex-1">
        { 
          timelineData.map((e, index) => {
            const nbAlerts = rackLetter ?
              e.data
                .filter((e) => e.name.startsWith(rackLetter))
                .reduce((cumul, current) => (cumul + (current.state !== 'correct' ? 1 : 0)), 0)
              :
              0;

            return (
              <Timeline.Item key={e.date.toISOString()} onClick={() => selectTime(e)} className="cursor-pointer">
                <Timeline.Point icon={index === timeIndex.current ? GoDot : undefined} />
                <Timeline.Content>
                  <Timeline.Time>{e.date.toISOString().substring(11, 19)}</Timeline.Time>
                  <Timeline.Body>{nbAlerts} alert(s)</Timeline.Body>
                </Timeline.Content>
              </Timeline.Item>
            );
          })
        }
      </Timeline>
    </Card>
  );
}

