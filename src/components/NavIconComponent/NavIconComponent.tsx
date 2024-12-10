import { Button } from "flowbite-react";
import React from "react";

interface Props {
  icon: React.ReactNode;
  label: string;
}

export const NavIconComponent = ({ icon, label }: Props) => {
  return (
    <Button
      size="icon"
      className="w-12 h-12 rounded-xl text-happyblue-400 hover:text-happyblue-100 hover:bg-happyblue-700 transition-colors relative group flex items-center justify-center"
    >
      {icon}
      <span className="absolute left-full ml-2 px-2 py-1 bg-happyblue-800 text-happyblue-100 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {label}
      </span>
    </Button>
  );
};
