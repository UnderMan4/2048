import { Cell } from "@/components/Cell";
import { Dimensions } from "@/types/game";
import { GameBoard } from "@/utils/GameBoard";
import { FC, useCallback, useEffect, useMemo } from "react";

export type BoardProps = {
   dimensions: Dimensions | number;
};

export const Board: FC<BoardProps> = ({ dimensions }) => {
   const board = useMemo(() => new GameBoard(dimensions), [dimensions]);
   const { height, width } = board;
   const handleKeyPress = useCallback((e: KeyboardEvent) => {
      switch (e.key) {
         case "ArrowUp":
         case "w":
            console.log("up");
            board.moveUp();
            board.clearMerges();
            break;
         case "ArrowDown":
         case "s":
            console.log("down");
            board.moveDown();
            board.clearMerges();
            break;
         case "ArrowLeft":
         case "a":
            console.log("left");
            board.moveLeft();
            board.clearMerges();
            break;
         case "ArrowRight":
         case "d":
            console.log("right");
            board.moveRight();
            board.clearMerges();
            break;
      }
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
