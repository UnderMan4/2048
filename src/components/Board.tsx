import { Cell } from "@/components/Cell";
import { GameBoard } from "@/utils/GameBoard";
import { FC, useCallback, useEffect, useRef, useState } from "react";

export type BoardProps = {
   dimensions: number;
};

export const Board: FC<BoardProps> = ({ dimensions }) => {
   const [board, setBoard] = useState(new GameBoard(dimensions));
   const [isBlocked, setIsBlocked] = useState(false);
   const { height, width } = board;
   const parentRef = useRef<HTMLDivElement>(null);
   const bgCellsRef = useRef<HTMLDivElement>(null);
   const cellsRef = useRef<HTMLDivElement>(null);
   const handleKeyPress = useCallback((e: KeyboardEvent) => {
      if (isBlocked) return;

      setIsBlocked(true);
      switch (e.key) {
         case "ArrowUp":
         case "w":
            board.moveUp();
            setBoard(board.getClone());
            break;
         case "ArrowDown":
         case "s":
            board.moveDown();
            setBoard(board.getClone());
            break;
         case "ArrowLeft":
         case "a":
            board.moveLeft();
            setBoard(board.getClone());
            break;
         case "ArrowRight":
         case "d":
            board.moveRight();
            setBoard(board.getClone());
            break;
      }
      setTimeout(() => {
         board.merge();
         setBoard(board.getClone());
      }, 0);
      setTimeout(() => {
         board.addRandomCell();
         setBoard(board.getClone());
         setIsBlocked(false);
      }, 200);
   }, []);

   useEffect(() => {
      window.addEventListener("keydown", handleKeyPress);
      return () => {
         window.removeEventListener("keydown", handleKeyPress);
      };
   }, []);

   useEffect(() => {
      const resizeObserver = new ResizeObserver((entries) => {
         const parent = entries[0];
         if (!parent) return;
         const { width, height } = parent.contentRect;
         const boardSize = Math.min(width, height);
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
                        className="aspect-square flex-grow rounded-xl bg-slate-600"
                     />
                  ))}
               </div>
            ))}
         </div>
         <div className="absolute flex flex-col gap-2" ref={cellsRef}>
            {Array.from({ length: height }, (_, i) => (
               <div key={i} className="flex flex-grow gap-2">
                  {Array.from({ length: width }, (_, j) => (
                     <div
                        key={`cell-${j}`}
                        className="aspect-square flex-grow rounded-xl"
                     >
                        <Cell
                           // key={j}
                           board={board}
                           cellAddress={{
                              row: i,
                              column: j,
                           }}
                        />
                     </div>
                  ))}
               </div>
            ))}
         </div>
      </div>
   );
};
