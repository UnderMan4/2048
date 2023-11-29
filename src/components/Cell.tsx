import { Position } from "@/types/game";
import { GameBoard } from "@/utils/GameBoard";
import { cls } from "@/utils/styles";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { AnimationProps, motion } from "framer-motion";

export type CellProps = {
   board: GameBoard;
   cellAddress: Position;
};

type CellColors = {
   bg: string;
   text: string;
};

const cellColors: Record<number, CellColors> = {
   2: {
      bg: "bg-slate-200",
      text: "text-slate-800",
   },
   4: {
      bg: "bg-slate-300",
      text: "text-slate-600",
   },
   8: {
      bg: "bg-slate-400",
      text: "text-slate-300",
   },
   16: {
      bg: "bg-slate-500",
      text: "text-slate-300",
   },
   32: {
      bg: "bg-slate-600",
      text: "text-slate-300",
   },
   64: {
      bg: "bg-slate-700",
      text: "text-slate-300",
   },
   128: {
      bg: "bg-slate-800",
      text: "text-slate-300",
   },
};

const transitionProps: AnimationProps["transition"] = {
   duration: 0.1,
   ease: "easeOut",
};

export const Cell: FC<CellProps> = ({ board, cellAddress }) => {
   const cellData = useMemo(
      () => board.getCell(cellAddress),
      [board.fields, cellAddress]
   );

   // const mainCellRef = useRef<HTMLDivElement>(null);

   // const [mainCell, setMainCell] = useState<HTMLDivElement | null>(null);

   // const mainTextRef = useRef<HTMLSpanElement>(null);
   // const mergeTextRef = useRef<HTMLSpanElement>(null);

   const colors = useMemo(() => {
      if (!cellData)
         return {
            bg: "bg-black",
            text: "text-slate-200",
         };
      return (
         cellColors[cellData.value] ?? {
            bg: "bg-black",
            text: "text-slate-200",
         }
      );
   }, [cellData?.value]);

   // useEffect(() => {
   //    const resizeObserver = new ResizeObserver((entries) => {
   //       console.log(entries);
   //       const [entry] = entries;

   //       if (!entry) return;

   //       const { width: mainWidth } = entry.contentRect;

   //       if (mainTextRef.current) {
   //          const mergeTextSize = mainTextRef.current.getBoundingClientRect();
   //          console.log(mergeTextSize);
   //          console.log(mergeTextSize.width, mainWidth);
   //          if (mergeTextSize.width > mainWidth) {
   //             const proportion = mainWidth / mergeTextSize.width;
   //             mainTextRef.current.style.scale = proportion.toString();
   //          }
   //       }
   //    });

   //    if (mainCell) {
   //       resizeObserver.observe(mainCell);
   //    }

   //    return () => {
   //       console.log("unmounting");
   //       if (mainCellRef.current) {
   //          resizeObserver.unobserve(mainCellRef.current);
   //       }
   //    };
   // }, [mainCell, cellData?.value]);

   return (
      <div className="relative isolate h-full w-full rounded-xl">
         {cellData ? (
            <>
               <motion.div
                  className={cls(
                     "absolute inset-0 z-20 flex h-full w-full items-center justify-center rounded-xl",
                     colors?.bg
                  )}
                  // layoutId={cellData.id}
                  transition={transitionProps}
                  layout
                  // ref={mainCellRef}
                  // ref={(ref) => setMainCell(ref)}
               >
                  <span
                     className={cls(
                        "select-none text-2xl font-bold",
                        colors?.text
                     )}
                     // ref={mainTextRef}
                  >
                     {cellData.value}
                  </span>
               </motion.div>
               {cellData.mergeWith ? (
                  <motion.div
                     className={cls(
                        "absolute inset-0 z-10 flex h-full w-full items-center justify-center rounded-xl",
                        colors.bg
                     )}
                     // layoutId={cellData.mergeWith.id}
                     layout
                     transition={transitionProps}
                  >
                     <span
                        className={cls(
                           "select-none text-2xl font-bold",
                           colors.text
                        )}
                        // ref={mergeTextRef}
                     >
                        {cellData.mergeWith.value}
                     </span>
                  </motion.div>
               ) : null}
            </>
         ) : null}
      </div>
   );
};
