import { Dropdown } from "flowbite-react";
import { useContext } from "react";

import { DataContext } from "../shared/DataContext";
import { Scene } from "./Scene";
import { TimelineData } from "./TimelineData";
import { LegendPanel } from "./LegendPanel";

export const Dashboard = () => {
  const { racks, rackLetter, setRackLetter, setResetTrigger: setPlayTrigger } = useContext(DataContext);

  const onChangeLetterClick = (rackLetter: string) => {
    setRackLetter(rackLetter);
    setPlayTrigger(false);
  };

  return (
    <main className="bg-gray-900 w-screen h-screen truncate dark flex flex-col">
      <section className="mt-8 px-10 w-full flex justify-between items-start flex-0">
        <h1 className="text-2xl font-extrabold text-gray-400 flex-1">
          TIR ALERTING
          <div className="ms-2 text-5xl font-semibold text-white">[CHO - RACK {rackLetter}]</div>
        </h1>
        <div className="flex-1 flex justify-center">
          <Dropdown label={`RACK ${rackLetter}`} size="xl">
            {racks.map((rack) => <Dropdown.Item key={rack.letter} onClick={() => onChangeLetterClick(rack.letter)}>{rack.letter}</Dropdown.Item>)}
          </Dropdown>
        </div>
        <LegendPanel className="flex-1" />
      </section>

      {rackLetter && (
        <div className="flex-1 max-h-full truncate">
          <Scene />
        </div>
      )}

      <section className="mt-3 w-full flex-0">
        <TimelineData />
      </section>
    </main>
  );
};
