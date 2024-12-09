import { PropsWithChildren } from "react";

const COMMON_CLASSES = "hover:text-white border focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2";
type ButtonProps = PropsWithChildren<{ [s: string]: unknown }>;

export const Button = ({ children, ...props }: ButtonProps) => (
  <button type="button" className={`${COMMON_CLASSES} border-blue-500 text-blue-500 hover:text-white focus:ring-blue-800`} {...props}>{children}</button>
);
export const DarkButton = ({ children, ...props }: ButtonProps) => (
  <button type="button" className={`${COMMON_CLASSES} border-gray-600 text-gray-400 hover:text-white focus:ring-gray-800`} {...props}>{children}</button>
);
export const GreenButton = ({ children, ...props }: ButtonProps) => (
  <button type="button" className={`${COMMON_CLASSES} border-green-500 text-green-500 hover:text-white focus:ring-green-800`} {...props}>{children}</button>
);
export const RedButton = ({ children, ...props }: ButtonProps) => (
  <button type="button" className={`${COMMON_CLASSES} border-red-500 text-red-500 hover:text-white focus:ring-red-900`} {...props}>{children}</button>
);
export const YellowButton = ({ children, ...props }: ButtonProps) => (
  <button type="button" className={`${COMMON_CLASSES} border-yellow-300 text-yellow-300 hover:text-white focus:ring-yellow-900`} {...props}>{children}</button>
);
export const PurpleButton = ({ children, ...props }: ButtonProps) => (
  <button type="button" className={`${COMMON_CLASSES} border-purple-400 text-purple-400 hover:text-white focus:ring-purple-900`} {...props}>{children}</button>
);

