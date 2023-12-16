import { GameBoard } from "@/utils/GameBoard";
import { RefObject, useMemo } from "react";

const MAX_WIDTH = 0.8 as const;
const MIN_WIDTH = 0.6 as const;
const MAX_HEIGHT = 0.5 as const;

export const useFontScale = (
   referenceRef: RefObject<HTMLSpanElement>,
   cellSize: number,
   board: GameBoard
) =>
   useMemo(() => {
      if (referenceRef.current) {
         const width = referenceRef.current.offsetWidth;
         const height = referenceRef.current.offsetHeight;

         let scale = 1;

         if (width > cellSize * MAX_WIDTH) {
            scale = (cellSize / width) * MAX_WIDTH;
         }

         if (width < cellSize * MIN_WIDTH) {
            scale = (cellSize / width) * MIN_WIDTH;
         }

         if (height * scale > cellSize * MAX_HEIGHT) {
            scale = Math.min(scale, (cellSize / height) * MAX_HEIGHT);
         }

         return scale;
      }
      return 1;
   }, [
      cellSize,
      board,
      referenceRef.current?.offsetWidth,
      referenceRef.current?.offsetHeight,
   ]);
