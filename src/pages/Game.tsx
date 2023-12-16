import React, { FC } from "react";
import { twMerge } from "tailwind-merge";

export type GameProps = {
   className?: string;
};

export const Game: FC<GameProps> = ({ className }) => {
   return <div className={twMerge("", className)}>Game</div>;
};
