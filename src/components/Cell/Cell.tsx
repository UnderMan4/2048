import { useFontScale } from "@/components/Cell/Cell.hooks";
import { Position } from "@/types/game";
import { GameBoard } from "@/utils/GameBoard";
import { cls } from "@/utils/styles";
import { AnimationProps, Variants, motion, useAnimation } from "framer-motion";
import { FC, useMemo, useRef } from "react";

export type CellProps = {
   board: GameBoard;
   cellAddress: Position;
   boardSize: number;
   updateBoard: () => void;
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

const GAP = 8 as const;

export const Cell: FC<CellProps> = ({
   board,
   cellAddress,
   boardSize,
   updateBoard,
}) => {
   const cellData = useMemo(
      () => board.getCell(cellAddress),
      [board.cells, cellAddress]
   );

   const cellSize = useMemo(
      () => (boardSize - GAP * (board.width - 1)) / board.width,
      [boardSize]
   );

   const animationControls = useAnimation();

   const animateMerge = async () => {
      if (innerCellRef.current) {
         await animationControls.start({
            scale: 1.2,
            transition: {
               duration: 0.1,
               ease: "easeOut",
            },
         });
      }
      if (innerCellRef.current) {
         await animationControls.start({
            scale: 1,
            transition: {
               duration: 0.1,
            },
         });
      }
   };

   const innerCellRef = useRef<HTMLDivElement>(null);
   const outerCellRef = useRef<HTMLDivElement>(null);
   const valueRef = useRef<HTMLSpanElement>(null);

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
         top: cellAddress.row * (cellSize + GAP),
         left: cellAddress.column * (cellSize + GAP),

         scale: 1,
      },
      initial: {
         scale: 0,
      },
   };

   const fontScale = useFontScale(valueRef, cellSize, board);

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
         onAnimationComplete={async () => {
            if (cellData?.mergeWith?.animationEnded) {
               await animateMerge();
               board.mergeCell(cellData.id);
               updateBoard();
            } else {
               cellData.animationEnded = true;
            }
         }}
         style={{
            height: cellSize,
            width: cellSize,
         }}
         ref={outerCellRef}
      >
         <div className="relative isolate h-full w-full rounded-xl">
            <motion.div
               className={cls(
                  "absolute inset-0 z-20 flex h-full w-full items-center justify-center rounded-xl",
                  "shadow-sm shadow-slate-400/25 transition-colors duration-[50ms]",
                  colors?.bg
               )}
               transition={transitionProps}
               layout
               animate={animationControls}
               ref={innerCellRef}
            >
               <span
                  className={cls(
                     "select-none font-bold transition-colors duration-[50ms]",
                     colors?.text
                  )}
                  style={{
                     fontSize: `${1.5 * (fontScale ?? 1)}rem`,
                     lineHeight: `${1.5 * (fontScale ?? 1)}rem`,
                  }}
               >
                  {cellData.value}
               </span>
               <span
                  ref={valueRef}
                  className="invisible absolute text-2xl font-bold"
               >
                  {cellData.value}
               </span>
            </motion.div>
         </div>
      </motion.div>
   ) : null;
};
