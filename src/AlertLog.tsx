import { useContext } from "react";
import { Card, Timeline } from "flowbite-react";
import { DataContext } from "./shared/DataContext";

export const AlertLog = () => {
  const events = useContext(DataContext).events;
  return (
    <Card className="min-w-[500px] max-w-full h-[30vh] overflow-auto">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Event Logs
      </h5>
      <Timeline className="flex-1">
        { 
          events.map((e) => (
              <Timeline.Item key={e.id}>
                <Timeline.Point />
                <Timeline.Content>
                  <Timeline.Time>{e.date.toISOString().substring(11, 19)}</Timeline.Time>
                  <Timeline.Title>Tracksphere reading in {e.locationCode}</Timeline.Title>
                  <Timeline.Body>
                    {e.type === 'in' ? `Asset ${e.assetCode} detected` : `Asset ${e.assetCode} removed`} with product {e.productCode}
                  </Timeline.Body>
                </Timeline.Content>
              </Timeline.Item>
          ))
        }
      </Timeline>
    </Card>
  );
}

