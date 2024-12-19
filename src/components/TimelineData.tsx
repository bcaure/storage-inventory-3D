import { useContext } from "react";
import { Card, Timeline } from "flowbite-react";
import { DataContext } from "../shared/DataContext";

export const TimelineData = () => {
  const { timelineData } = useContext(DataContext);
  return (
    <Card className="min-w-[500px] max-w-full h-[30vh] overflow-auto">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Event Logs
      </h5>
      <Timeline className="flex-1">
        { 
          timelineData.map((e) => (
              <Timeline.Item key={e.date.toISOString()}>
                <Timeline.Point />
                <Timeline.Content>
                  <Timeline.Time>{e.date.toISOString().substring(11, 19)}</Timeline.Time>
                  <Timeline.Title>Number of alerts: {e.data.reduce((cumul, current) => (cumul + (current.state !== 'correct' ? 1 : 0)), 0)}</Timeline.Title>
                </Timeline.Content>
              </Timeline.Item>
          ))
        }
      </Timeline>
    </Card>
  );
}

