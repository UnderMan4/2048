import React, { FC } from "react";
import { twMerge } from "tailwind-merge";

export type SettingsProps = {
   className?: string;
};

export const Settings: FC<SettingsProps> = ({ className }) => {
   return <div className={twMerge("", className)}>Settings</div>;
};
