import { useEffect, useMemo, useState } from "react";
import { Dropdown } from "flowbite-react";
import { Scene } from "./Scene";
import { AlertLog } from "./AlertLog";
import { DataContextProvider } from "./shared/DataContextProvider";
import { EventForm } from "./EventForm";

export const App = () => {
  const rackLetters = useMemo(() => ['A', 'B', 'F', 'G', 'S', 'W'], []);
  const [currentLetter, setCurrentLetter] = useState<string>();

  useEffect(() => {
    setCurrentLetter(rackLetters[0]);
  }, [rackLetters]);

  const onChangeLetterClick = (rackLetter: string) => {
    setCurrentLetter(rackLetter);
  };

  return (
    <DataContextProvider>
      <main className="bg-gray-900 w-screen h-screen truncate dark relative flex flex-col">
        <h1 className="absolute left-8 top-5 text-5xl font-extrabold text-white">
          TIR ALERTING
          <div className="ms-2 font-semibold text-gray-400">[Usine de Cholet]</div>
        </h1>
        <section className="mt-8 mb-3 w-full flex justify-center items-center flex-0">
          <Dropdown label={`RACK ${currentLetter}`} size="xl">
            { rackLetters.map((rackLetter) => <Dropdown.Item key={rackLetter} onClick={() => onChangeLetterClick(rackLetter)}>{rackLetter}</Dropdown.Item>) }
          </Dropdown>
        </section>

        { currentLetter && <div className="flex-1 max-h-full truncate"><Scene currentLetter={currentLetter} /></div> }

        <section className="w-full flex justify-evenly flex-0">
          <AlertLog />
          <EventForm />
        </section>
      </main>
    </DataContextProvider>
  );
};
