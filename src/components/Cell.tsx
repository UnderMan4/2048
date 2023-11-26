import { Position } from "@/types/game";
import { GameBoard } from "@/utils/GameBoard";
import { FC, useMemo } from "react";

export type CellProps = {
   board: GameBoard;
   className?: string;
   cellAddress: Position;
};

export const Cell: FC<CellProps> = ({ board, cellAddress }) => {
   const cellData = useMemo(
      () => board.getCell(cellAddress),
      [board.fields, cellAddress]
   );
   return (
      <div className="h-20 w-20 rounded-xl bg-slate-600">
         {cellData ? (
            <div className="flex h-full w-full items-center justify-center">
               <span className="select-none text-2xl font-bold">
                  {cellData.value}
               </span>
            </div>
         ) : null}
      </div>
   );
};
