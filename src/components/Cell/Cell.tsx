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
            duration: 0.15,
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
                  "shadow-sm shadow-slate-400/25 transition-colors duration-[100ms]",
                  {
                     "bg-cell-bg-2": cellData.value === 2,
                     "bg-cell-bg-4": cellData.value === 4,
                     "bg-cell-bg-8": cellData.value === 8,
                     "bg-cell-bg-16": cellData.value === 16,
                     "bg-cell-bg-32": cellData.value === 32,
                     "bg-cell-bg-64": cellData.value === 64,
                     "bg-cell-bg-128": cellData.value === 128,
                     "bg-cell-bg-256": cellData.value === 256,
                     "bg-cell-bg-512": cellData.value === 512,
                     "bg-cell-bg-1024": cellData.value === 1024,
                     "bg-cell-bg-2048": cellData.value === 2048,
                     "bg-cell-bg-default": cellData.value > 2048,
                  }
               )}
               transition={transitionProps}
               layout
               animate={animationControls}
               ref={innerCellRef}
            >
               <span
                  className={cls(
                     "select-none font-bold transition-colors duration-[50ms]",
                     {
                        "text-cell-fg-2": cellData.value === 2,
                        "text-cell-fg-4": cellData.value === 4,
                        "text-cell-fg-8": cellData.value === 8,
                        "text-cell-fg-16": cellData.value === 16,
                        "text-cell-fg-32": cellData.value === 32,
                        "text-cell-fg-64": cellData.value === 64,
                        "text-cell-fg-128": cellData.value === 128,
                        "text-cell-fg-256": cellData.value === 256,
                        "text-cell-fg-512": cellData.value === 512,
                        "text-cell-fg-1024": cellData.value === 1024,
                        "text-cell-fg-2048": cellData.value === 2048,
                        "text-cell-fg-default": cellData.value > 2048,
                     }
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
