import { Icon } from "@iconify/react";
import {
   m as motion,
   useMotionValue,
   useSpring,
   useTransform,
} from "framer-motion";
import { FC, useRef } from "react";
import { twMerge } from "tailwind-merge";
import styles from "./MainMenuCard.module.css";
import { useHover } from "usehooks-ts";

export type MainMenuCardProps = {
   className?: string;
   icon: string;
   label: string;
};

const CONTENT_CLASS_NAME =
   "absolute inset-0 flex flex-col items-center justify-between rounded-3xl p-7 pb-10";
const ICON_SIZE = 155;
export const MainMenuCard: FC<MainMenuCardProps> = ({
   className,
   icon,
   label,
}) => {
   const x = useMotionValue(0);
   const y = useMotionValue(0);

   const xSpring = useSpring(x);
   const ySpring = useSpring(y);

   const rotateX = useTransform(ySpring, [-0.5, 0.5], ["16deg", "-16deg"]);
   const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-16deg", "16deg"]);

   return (
      <motion.button
         onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();

            const width = rect.width;
            const height = rect.height;

            const xMouse = e.clientX - rect.left;
            const yMouse = e.clientY - rect.top;

            const xPercent = xMouse / width - 0.5;
            const yPercent = yMouse / height - 0.5;

            x.set(xPercent);
            y.set(yPercent);
         }}
         onMouseLeave={() => {
            x.set(0);
            y.set(0);
         }}
         style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
         }}
         className={twMerge(
            styles.menuCard,
            "group relative h-80 w-56",
            className
         )}
      >
         <div
            style={{
               transformStyle: "preserve-3d",
            }}
            className={twMerge(
               styles.cardGradient,
               "bg ease-in-out group-hover:scale-105",
               CONTENT_CLASS_NAME
            )}
         >
            <Icon
               style={{
                  transform: "translateZ(24px)",
               }}
               icon={icon}
               height={ICON_SIZE}
            />
            <p
               style={{
                  transform: "translateZ(32px)",
               }}
               className="text-2xl font-bold tracking-wide"
            >
               {label}
            </p>
         </div>
         <div
            className={twMerge(
               CONTENT_CLASS_NAME,
               "text-secondary  opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-80"
            )}
         >
            <Icon
               style={{
                  transform: "translateZ(24px)",
               }}
               icon={icon}
               height={ICON_SIZE}
               className="blur-[3px]"
            />
            <p
               style={{
                  transform: "translateZ(32px)",
               }}
               className="text-2xl font-bold blur-[4px]"
            >
               {label}
            </p>
         </div>
      </motion.button>
   );
};
