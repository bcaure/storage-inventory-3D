import { PropsWithChildren, useEffect, useState } from "react";
import { AssetDataType, TracksphereResponse, Coords, TracksphereEvent } from "./types";
import { DataContext } from "./DataContext";
import { computeState } from "./helper";

export const DataContextProvider = ({ children }: PropsWithChildren) => {
  const [assets, setAssets] = useState<Array<AssetDataType>>(new Array<AssetDataType>());
  const [events, setEvents] = useState<Array<TracksphereEvent>>(new Array<TracksphereEvent>());

  const fromLocationCode = (code: string): Coords => {
    const x = parseInt(code.substring(1, 3));
    const y = parseInt(code.substring(3, 4));
    const z = code.length === 6 ? parseInt(code.substring(5, 6)) : 0;
    return [x, y, z];
  }; 

  // Transform locations from Tracksphere to assets
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
        
          // Tracksphere code is like A031, there's no z index
          const [x, y] = fromLocationCode(code);
      
          if (!Number.isNaN(x) && !Number.isNaN(y)) {

            // We add 1 or 2 assets: one behind and one in front.
            // The front one has z index 0 and the back one has z index 1
            const rand = Math.random();
            let whichAssets: 'front' | 'back' | 'both' = 'both'; 
            if (rand < 0.3) {
              whichAssets = 'front';
            } else if (rand > 0.7) {
              whichAssets = 'back';
            }

            const coords1: Coords = [x, y, 1];
            const code1 = `${code}-1`;
            const state1 = computeState(code1);

            if (whichAssets !== 'front') {
              locationAssets.push({
                id: `${location.id}-1`,
                name: `${code}-1`,
                coords: coords1,
                state: state1,
              });
            }

            const coords0: Coords = [x, y, 0];
            const code0 = `${code}-0`;
            const state0 = whichAssets === 'both' ? computeState(code0, code1) : computeState(code0);

            if (whichAssets !== 'back') {
              locationAssets.push({
                id: `${location.id}-0`,
                name: code0,
                coords: coords0,
                state: state0,
              });
            }
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
          newAssets.push({
            id: newEvent.locationCode,
            name: newEvent.locationCode,
            coords: fromLocationCode(newEvent.locationCode),
            state: 'correct',
          });
        } else if (newEvent.type === 'out') {
          const index = newAssets.findIndex((a) => a.name.toLowerCase() === newEvent.locationCode.trim().toLowerCase());
          if (index >= 0) {
            newAssets.splice(index, 1);
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
