import { ReactNode } from "react";

const COMMON_CLASSES = "inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700";
type ButtonGroup = {
  id: string;
  icon?: ReactNode;
  label?: string;
  onClick: () => void;
};
type ButtonsGroupProps = {
  buttonLeft: ButtonGroup;
  buttonsMiddle: Array<ButtonGroup>;
  buttonRight: ButtonGroup;
};

export const ButtonsGroup = ({ buttonLeft, buttonsMiddle, buttonRight }: ButtonsGroupProps) => (
  <div className="inline-flex rounded-md shadow-sm" role="group">
    <button type="button" className={[COMMON_CLASSES, "rounded-s-lg"].join(' ')} onClick={buttonLeft.onClick}>
      { buttonLeft.icon }
      { buttonLeft.label }
    </button>
    {
      buttonsMiddle.map((centerButton) => (
        <button key={centerButton.id} type="button" className={COMMON_CLASSES} onClick={centerButton.onClick}>
          { centerButton.icon }
          { centerButton.label }
        </button>
      ))
    }
    <button type="button" className={[COMMON_CLASSES, "rounded-e-lg"].join(' ')} onClick={buttonRight.onClick}>
      { buttonRight.icon }
      { buttonRight.label }
    </button>
  </div>
);
