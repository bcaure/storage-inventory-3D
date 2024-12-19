import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Card, Timeline } from "flowbite-react";
import { DataContext } from "../shared/DataContext";
import { TimelineDataType } from "../shared/types";
import { GoDot } from "react-icons/go";
import { FaPlay, FaStop } from "react-icons/fa";

export const TimelineData = () => {
  const { timelineData, rackLetter, time, setTime } = useContext(DataContext);
  const dateString = useMemo(() => time?.toISOString().substring(0, 10), [time]);

  const selectTime = (e: TimelineDataType) => {
    setTime(e.date);
  };

  const [playTrigger, setPlayTrigger] = useState(false);
  const interval = useRef<number>();
  useEffect(() => {
    const findCurrentIndex = () => timelineData.findIndex((e) => {
      return e.date.getTime() === time?.getTime();
    });

    const handleTimer = () => {
      interval.current = setInterval(() => {
        const currentIndex = findCurrentIndex();
        if (currentIndex >= 0 && currentIndex < timelineData.length - 1) {
          setTime(timelineData[currentIndex + 1].date);
        } else {
          stopTimeline();
        }
      }, 1000);
    };

    const currentIndex = findCurrentIndex();
    if ((currentIndex >= 0 && currentIndex > timelineData.length - 1 || !playTrigger) && interval.current) {
      clearInterval(interval.current);
    }
    if (playTrigger && !interval.current) {
      handleTimer();
    }
  }, [playTrigger, setTime, time, timelineData]);

  const playTimeline = () => {
    setPlayTrigger(true);
  };

  const stopTimeline = () => {
    setPlayTrigger(false);
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
          timelineData.map((e) => {
            const nbAlerts = rackLetter ?
              e.data
                .filter((e) => e.name.startsWith(rackLetter))
                .reduce((cumul, current) => (cumul + (current.state !== 'correct' ? 1 : 0)), 0)
              :
              0;

            return (
              <Timeline.Item key={e.date.toISOString()} onClick={() => selectTime(e)} className="cursor-pointer">
                <Timeline.Point icon={e.date === time ? GoDot : undefined} />
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

