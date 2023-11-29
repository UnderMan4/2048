import { Position } from "@/types/game";
import { GameBoard } from "@/utils/GameBoard";
import { cls } from "@/utils/styles";
import { FC, RefObject, useEffect, useMemo, useRef, useState } from "react";
import {
   AnimationControls,
   AnimationProps,
   TargetAndTransition,
   Variant,
   Variants,
   motion,
   useAnimation,
} from "framer-motion";

export type CellProps = {
   board: GameBoard;
   cellAddress: Position;
   boardSize: number;
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

const gap = 8;

export const Cell: FC<CellProps> = ({ board, cellAddress, boardSize }) => {
   const cellData = useMemo(
      () => board.getCell(cellAddress),
      [board.cells, cellAddress]
   );

   const cellSize = useMemo(
      () => (boardSize - gap * (board.width - 1)) / board.width,
      [boardSize]
   );

   const animationControls = useAnimation();

   const animateMerge = async () => {
      await animationControls.start({
         scale: 1.2,
         transition: {
            duration: 0.2,
            ease: "easeOut",
         },
      });
      await animationControls.start({
         scale: 1,
         transition: {
            duration: 0.2,
         },
      });
   };

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

   const animateControls: Variants = {
      position: {
         top: cellAddress.row * (cellSize + gap),
         left: cellAddress.column * (cellSize + gap),

         scale: 1,
      },
      initial: {
         scale: 0,
      },
   };

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

   useEffect(() => {
      console.log(boardSize);
   }, [boardSize]);

   return cellData ? (
      <motion.div
         className="absolute"
         variants={animateControls}
         animate={"position"}
         initial={["position", "initial"]}
         transition={{
            duration: 0.2,
            ease: "easeOut",
            type: "spring",
         }}
         onAnimationComplete={() => {
            if (cellData?.mergeWith?.animationEnded) {
               board.mergeCell(cellData.id);
               animateMerge();
            } else {
               cellData.animationEnded = true;
            }
         }}
         style={{
            height: cellSize,
            width: cellSize,
         }}
      >
         <div className="relative isolate h-full w-full rounded-xl">
            <motion.div
               className={cls(
                  "absolute inset-0 z-20 flex h-full w-full items-center justify-center rounded-xl shadow-sm shadow-slate-400/25",
                  colors?.bg
               )}
               transition={transitionProps}
               layout
               animate={animationControls}
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
         </div>
      </motion.div>
   ) : null;
};
