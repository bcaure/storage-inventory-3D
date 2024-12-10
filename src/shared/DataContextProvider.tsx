import { PropsWithChildren, useEffect, useState } from "react";
import { ERRORS, WARNINGS } from "./constants";
import { AssetDataType, TracksphereResponse, Coords, TracksphereEvent } from "./types";
import { DataContext } from "./DataContext";

export const DataContextProvider = ({ children }: PropsWithChildren) => {
  const [assets, setAssets] = useState<Array<AssetDataType>>(new Array<AssetDataType>());
  const [events, setEvents] = useState<Array<TracksphereEvent>>(new Array<TracksphereEvent>());

  const fromLocationCode = (code: string) => {
    const x = parseInt(code.substring(1, 3));
    const y = parseInt(code.substring(3, 4));
    return [x, y];
  }; 

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await fetch('/locations-tracksphere-cho.json');
      const responseLocations = await response.json() as TracksphereResponse;
      const locationAssets = new Array<AssetDataType>();
      const locationCodes = new Set<string>();

      for (const location of responseLocations.data.rows) {
        const code = location.name.substring('location '.length);

        if (!locationCodes.has(code)) {
          locationCodes.add(code);
        
          const [x, y] = fromLocationCode(code);
      
          if (!Number.isNaN(x) && !Number.isNaN(y)) {
            const computeState = (coords: Coords): 'error' | 'warning' | 'correct' => {
              const hasCoords = (list: number[][]) => list.some(([x, y, z]) => coords[0] === x && coords[1] === y && coords[2] === z);
              if (hasCoords(ERRORS)) {
                return 'error';
              } else if (hasCoords(WARNINGS)) {
                return 'warning';
              } else {
                return 'correct';
              }
            };

            const coords0: Coords = [x, y, 0];
            locationAssets.push({
              id: `${location.id}-0`,
              name: code,
              coords: coords0,
              state: computeState(coords0),
            });

            const coords1: Coords = [x, y, 1];
            locationAssets.push({
              id: `${location.id}-1`,
              name: code,
              coords: coords1,
              state: computeState(coords1),
            });
          }
        }
      }

      setAssets(locationAssets);
    }
    fetchLocations();
  }, []);

  const [processedEvents, setProcessedEvents] = useState<Array<TracksphereEvent>>([]);
  useEffect(() => { 
    // remove events already processed
    const newEvents = events.filter((e) => !processedEvents.some((pe) => pe.id === e.id));

    if (newEvents.length > 0) {
      const newAssets = [...(assets || [])];
      for (const newEvent of newEvents) {
        if (newEvent.type === 'in') {
          const [x, y] = fromLocationCode(newEvent.locationCode);
          newAssets.push({
            id: `${newEvent.locationCode}-1`,
            name: newEvent.locationCode,
            coords: [x, y, 1],
            state: 'correct',
          });
        } else if (newEvent.type === 'out' && assets) {
          const index = assets?.findIndex((a) => a.name === newEvent.locationCode);
          if (index >= 0) {
            assets?.splice(index, 1);
          }
        }
      }

      setAssets(newAssets);
      setProcessedEvents([...processedEvents, ...newEvents]);
    }
  }, [assets, events, processedEvents]);

  return (
    <DataContext.Provider value={{ events, setEvents, assets, setAssets }}>
      {children}
    </DataContext.Provider>
  );
};
