import React, { FC } from "react";
import { twMerge } from "tailwind-merge";

export type GameSelectProps = {
   className?: string;
};

export const GameSelect: FC<GameSelectProps> = ({ className }) => {
   return <div className={twMerge("", className)}>GameSelect</div>;
};
