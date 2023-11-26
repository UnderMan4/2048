import { Cell } from "@/components/Cell";
import { Dimensions } from "@/types/game";
import { GameBoard } from "@/utils/GameBoard";
import { FC, useCallback, useEffect, useMemo, useState } from "react";

export type BoardProps = {
   dimensions: Dimensions | number;
};

export const Board: FC<BoardProps> = ({ dimensions }) => {
   const [board, setBoard] = useState(new GameBoard(dimensions));
   const { height, width } = board;
   const handleKeyPress = useCallback((e: KeyboardEvent) => {
      switch (e.key) {
         case "ArrowUp":
         case "w":
            board.moveUp();
            board.clearMerges();
            setBoard(board.getClone());
            break;
         case "ArrowDown":
         case "s":
            board.moveDown();
            board.clearMerges();
            setBoard(board.getClone());
            break;
         case "ArrowLeft":
         case "a":
            board.moveLeft();
            board.clearMerges();
            setBoard(board.getClone());
            break;
         case "ArrowRight":
         case "d":
            board.moveRight();
            board.clearMerges();
            setBoard(board.getClone());
            break;
      }
      console.table(
         board.fields.map((cell) => ({
            ...cell,
            column: cell.position.column,
            row: cell.position.row,
         }))
      );
   }, []);

   useEffect(() => {
      window.addEventListener("keydown", handleKeyPress);
      return () => {
         window.removeEventListener("keydown", handleKeyPress);
      };
   }, []);

   return (
      <div className={"flex flex-col gap-2"}>
         {Array.from({ length: height }, (_, i) => (
            <div key={i} className="flex gap-2">
               {Array.from({ length: width }, (_, j) => (
                  <Cell
                     key={j}
                     board={board}
                     cellAddress={{
                        row: i,
                        column: j,
                     }}
                  />
               ))}
            </div>
         ))}
      </div>
   );
};
