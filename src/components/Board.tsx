import { Cell } from "@/components/Cell";
import { GameBoard } from "@/utils/GameBoard";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "usehooks-ts";
export type BoardProps = {
   dimensions: number;
};

export const Board: FC<BoardProps> = ({ dimensions }) => {
   const [board, setBoard] = useState(new GameBoard(dimensions));
   const { height, width } = board;
   const parentRef = useRef<HTMLDivElement>(null);
   const bgCellsRef = useRef<HTMLDivElement>(null);
   const cellsRef = useRef<HTMLDivElement>(null);

   const blockedRef = useRef(false);
   const pressedRef = useRef(false);

   const [boardSize, setBoardSize] = useState(0);
   const debouncedBoardSize = useDebounce(boardSize, 100);

   const updateBoard = useCallback(
      () => setBoard(board.getClone()),
      [setBoard]
   );

   const addCell = useCallback(() => {
      setTimeout(() => {
         board.addRandomCell();
         updateBoard();
      }, 150);
   }, [board]);

   const handleKeyPress = useCallback((e: KeyboardEvent) => {
      if (blockedRef.current || pressedRef.current) return;

      blockedRef.current = true;
      pressedRef.current = true;
      switch (e.key) {
         case "ArrowUp":
         case "w":
            board.moveUp();
            updateBoard();
            addCell();
            break;
         case "ArrowDown":
         case "s":
            board.moveDown();
            updateBoard();
            addCell();
            break;
         case "ArrowLeft":
         case "a":
            board.moveLeft();
            updateBoard();
            addCell();
            break;
         case "ArrowRight":
         case "d":
            board.moveRight();
            updateBoard();
            addCell();
            break;
      }
      setTimeout(() => {
         updateBoard();
         blockedRef.current = false;
      }, 150);
   }, []);

   const handleKeyUp = useCallback(() => {
      pressedRef.current = false;
   }, []);

   useEffect(() => {
      window.addEventListener("keydown", handleKeyPress);
      window.addEventListener("keyup", handleKeyUp);
      return () => {
         window.removeEventListener("keydown", handleKeyPress);
         window.removeEventListener("keyup", handleKeyUp);
      };
   }, []);

   useEffect(() => {
      const resizeObserver = new ResizeObserver((entries) => {
         const parent = entries[0];
         if (!parent) return;
         const { width, height } = parent.contentRect;
         const boardSize = Math.min(width, height);
         setBoardSize(boardSize);
         if (bgCellsRef.current) {
            bgCellsRef.current.style.width = `${boardSize}px`;
            bgCellsRef.current.style.height = `${boardSize}px`;
         }
         if (cellsRef.current) {
            cellsRef.current.style.width = `${boardSize}px`;
            cellsRef.current.style.height = `${boardSize}px`;
         }
      });

      if (parentRef.current) {
         resizeObserver.observe(parentRef.current);
      }

      return () => {
         resizeObserver.disconnect();
      };
   }, []);

   return (
      <div
         className="relative flex h-full w-full items-center justify-center p-8"
         ref={parentRef}
      >
         <div className="absolute flex flex-col gap-2" ref={bgCellsRef}>
            {Array.from({ length: height }, (_, i) => (
               <div key={i} className="flex flex-grow gap-2">
                  {Array.from({ length: width }, (_, j) => (
                     <div
                        key={`bg-${j}`}
                        className="bg-cell-bg-empty aspect-square flex-grow rounded-xl"
                     />
                  ))}
               </div>
            ))}
         </div>
         <div className="absolute flex flex-col gap-2" ref={cellsRef}>
            {board.cells.map((cell) => {
               return (
                  <Cell
                     key={cell.id}
                     board={board}
                     cellAddress={cell.position}
                     boardSize={debouncedBoardSize}
                     updateBoard={updateBoard}
                  />
               );
            })}
         </div>
      </div>
   );
};
