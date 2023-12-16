import { cls } from "@/utils/styles";
import { FC } from "react";

export type ButtonProps = {
   className?: string;
   children?: string;
};

export const Button: FC<ButtonProps> = ({ className, children }) => {
   return (
      <button
         className={cls(
            "bg-primary rounded-lg p-2 font-bold uppercase text-gray-950",
            className
         )}
      >
         Button
      </button>
   );
};
