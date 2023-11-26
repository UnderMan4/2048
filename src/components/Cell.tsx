import { Position } from "@/types/game";
import { GameBoard } from "@/utils/GameBoard";
import { cls } from "@/utils/styles";
import { FC, useMemo } from "react";
import { motion } from "framer-motion";

export type CellProps = {
   board: GameBoard;
   className?: string;
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

export const Cell: FC<CellProps> = ({ board, cellAddress }) => {
   const cellData = useMemo(
      () => board.getCell(cellAddress),
      [board.fields, cellAddress]
   );

   const colors = useMemo(() => {
      if (!cellData)
         return {
            bg: "bg-black",
            text: "text-slate-200",
         };
      return cellColors[cellData.value];
   }, [cellData?.value]);
   return (
      <div className="relative isolate h-20 w-20 rounded-xl bg-slate-600">
         {/* <span className="absolute left-1 top-1 text-xs text-slate-400 opacity-50">{`${cellAddress.column}, ${cellAddress.row}`}</span> */}
         {cellData ? (
            <>
               <motion.div
                  className={cls(
                     "z-20 flex h-full w-full items-center justify-center rounded-xl",
                     colors?.bg
                  )}
                  layoutId={cellData.id}
               >
                  <span
                     className={cls(
                        "select-none text-2xl font-bold",
                        colors?.text
                     )}
                  >
                     {cellData.value}
                  </span>
               </motion.div>
               {cellData.mergeWith ? (
                  <motion.div className="z-10" layoutId={cellData.mergeWith.id}>
                     <span className="absolute left-1 top-1 text-xs text-slate-400">{`${cellAddress.column}, ${cellAddress.row}`}</span>
                  </motion.div>
               ) : null}
            </>
         ) : null}
      </div>
   );
};
