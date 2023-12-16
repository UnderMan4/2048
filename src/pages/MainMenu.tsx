import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "../components/Button";

export type MainMenuProps = {
   className?: string;
};

export const MainMenu: FC<MainMenuProps> = ({ className }) => {
   return (
      <div className={twMerge("flex flex-col gap-2", className)}>
         <Button>Select Game</Button>
         <Button>Settings</Button>
         <Button>Export save</Button>
         <Button>Import save</Button>
      </div>
   );
};
