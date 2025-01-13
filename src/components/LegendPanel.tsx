import { Card, CustomFlowbiteTheme, Flowbite } from "flowbite-react";

const customTheme: CustomFlowbiteTheme = {
    card: {
      root: {
        children: "p-2",
      }
    }
};

export const LegendPanel = ({ className }: { className: string }) => {
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <div className={ ['flex', 'justify-end', className].join(' ') }>
        <Card href="#" className={ ['max-w-sm ', className].join(' ') }>
          <ul className="space-y-2 text-left text-gray-500 dark:text-gray-400">
            <li className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="flex w-5 h-5 me-3 bg-[#22755b] rounded-full"></span>
              <span>Conforme à FYT</span>
            </li>
            <li className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="flex w-5 h-5 me-3 bg-[#985700] rounded-full"></span>
              <span>Code produit différent</span>
            </li>
            <li className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="flex w-5 h-5 me-3 bg-[#760001] rounded-full"></span>
              <span>Statut incorrect (vide / occupé)</span>
            </li>
          </ul>
        </Card>
      </div>
    </Flowbite>
  );
};
