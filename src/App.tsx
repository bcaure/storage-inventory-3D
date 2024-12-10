import { useEffect, useMemo, useState } from "react";
import { Dropdown } from "flowbite-react";
import { Scene } from "./Scene";
import { AlertLog } from "./AlertLog";
import { DataContextProvider } from "./shared/DataContextProvider";

export const App = () => {
  const rackLetters = useMemo(() => ['A', 'B', 'E', 'F', 'G', 'S', 'W'], []);
  const [currentLetter, setCurrentLetter] = useState<string>();

  useEffect(() => {
    setCurrentLetter(rackLetters[0]);
  }, [rackLetters]);

  const onChangeLetterClick = (rackLetter: string) => {
    setCurrentLetter(rackLetter);
  };

  return (
    <DataContextProvider>
      <main className="bg-gray-900 w-screen h-screen truncate">
        <h1 className="ml-8 mt-5 text-5xl font-extrabold text-white">
          TIR ALERTING <small className="ms-2 font-semibold text-gray-400">[Usine de Cholet]</small>
        </h1>
        <section className="my-3 w-full flex justify-center">
          <Dropdown label={`RACK ${currentLetter}`} size="xl">
            { rackLetters.map((rackLetter) => <Dropdown.Item key={rackLetter} onClick={() => onChangeLetterClick(rackLetter)}>{rackLetter}</Dropdown.Item>) }
          </Dropdown>
        </section>
        { currentLetter && <Scene currentLetter={currentLetter} /> }
        <section className="w-full flex justify-center">
          <AlertLog />
        </section>
      </main>
    </DataContextProvider>
  );
};
