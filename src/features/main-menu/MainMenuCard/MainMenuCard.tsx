import { Icon } from "@iconify/react";
import {
   m as motion,
   useMotionValue,
   useSpring,
   useTransform,
} from "framer-motion";
import { FC } from "react";
import { twMerge } from "tailwind-merge";
import styles from "./MainMenuCard.module.css";

export type MainMenuCardProps = {
   className?: string;
   icon: string;
   label: string;
};

const CONTENT_CLASS_NAME =
   "absolute inset-0 flex flex-col items-center justify-between rounded-3xl p-7 pb-10";
const ICON_SIZE = 155;
const NUM_LAYERS = 6;
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
            {Array.from({ length: NUM_LAYERS }).map((_, i) => {
               const colorValue = `${255 - (NUM_LAYERS - i) * 20}`;
               const color = `rgb(${Array(3).fill(colorValue).join(" ")})`;
               return (
                  <div
                     style={{ transformStyle: "preserve-3d" }}
                     className="absolute inset-0 flex flex-col items-center justify-between p-7 pb-10"
                     key={i}
                  >
                     <Icon
                        style={{
                           transform: `translateZ(${i * 3}px)`,
                           color,
                        }}
                        className=""
                        icon={icon}
                        height={ICON_SIZE}
                     />
                     <p
                        style={{
                           transform: `translateZ(${i * 1.2 + 20}px)`,
                           color,
                        }}
                        className="text-2xl font-bold tracking-wide"
                     >
                        {label}
                     </p>
                  </div>
               );
            })}
         </div>
         <div
            className={twMerge(
               CONTENT_CLASS_NAME,
               "text-secondary  opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-80"
            )}
         >
            <Icon icon={icon} height={ICON_SIZE} className="blur-[3px]" />
            <p className="text-2xl font-bold blur-[4px]">{label}</p>
         </div>
      </motion.button>
   );
};
