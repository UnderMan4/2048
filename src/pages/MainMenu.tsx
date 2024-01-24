import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { MainMenuCard } from "../features/main-menu/MainMenuCard/MainMenuCard";

export type MainMenuProps = {
   className?: string;
};

export const MainMenu: FC<MainMenuProps> = ({ className }) => {
   return (
      <div className={twMerge("flex flex-row gap-8", className)}>
         <MainMenuCard icon="arcticons:games-2" label="Select game" />
         <MainMenuCard icon="arcticons:hidden-settings" label="Settings" />
      </div>
   );
};
