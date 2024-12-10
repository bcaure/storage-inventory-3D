import { useEffect, useMemo, useState } from "react";
import { Dropdown } from "flowbite-react";
import { Scene } from "./Scene";

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
    <main className="bg-gray-900 w-screen h-screen truncate">
      <section className="mt-5 mb-3 w-full flex justify-center">
        <Dropdown label={`RACK ${currentLetter}`} size="xl">
          { rackLetters.map((rackLetter) => <Dropdown.Item key={rackLetter} onClick={() => onChangeLetterClick(rackLetter)}>{rackLetter}</Dropdown.Item>) }
        </Dropdown>
      </section>
      { currentLetter && <Scene currentLetter={currentLetter} /> }
    </main>
  );
};
