import { Dropdown } from "flowbite-react";
import { useContext } from "react";

import { DataContext } from "../shared/DataContext";
import { Scene } from "./Scene";
import { TimelineData } from "./TimelineData";

export const Dashboard = () => {
  const { racks, rackLetter, setRackLetter, setResetTrigger: setPlayTrigger } = useContext(DataContext);

  const onChangeLetterClick = (rackLetter: string) => {
    setRackLetter(rackLetter);
    setPlayTrigger(false);
  };

  return (
    <main className="bg-gray-900 w-screen h-screen truncate dark relative flex flex-col">
      <h1 className="absolute left-8 top-5 text-2xl font-extrabold text-gray-400">
        TIR ALERTING
        <div className="ms-2 text-5xl font-semibold text-white">[CHO - RACK {rackLetter}]</div>
      </h1>
      <section className="mt-8 mb-3 w-full flex justify-center items-center flex-0">
        <Dropdown label={`RACK ${rackLetter}`} size="xl">
          {racks.map((rack) => <Dropdown.Item key={rack.letter} onClick={() => onChangeLetterClick(rack.letter)}>{rack.letter}</Dropdown.Item>)}
        </Dropdown>
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
