import { useContext } from "react";
import { Timeline } from "flowbite-react";
import { DataContext } from "./shared/DataContext";

export const AlertLog = () => {
  const events = useContext(DataContext).events;
  return (
    <Timeline>
      { 
        events.map((e) => (
          <Timeline.Item key={e.id}>
            <Timeline.Point />
            <Timeline.Content>
              <Timeline.Time>{e.date.toTimeString()}</Timeline.Time>
              <Timeline.Title>Tracksphere reading in {e.locationCode}</Timeline.Title>
              <Timeline.Body>
                {e.type === 'in' ? `Asset ${e.assetCode} detected` : `Asset ${e.assetCode} removed`} with product {e.productCode}
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
        ))
      }
    </Timeline>
  );
}

