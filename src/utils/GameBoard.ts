import { Dimensions, Cell, Position } from "@/types/game";
import { getRandomInt, getRandomValueFromArray } from "@/utils/commonUtils";
import { nanoid } from "nanoid";

export class GameBoard {
   readonly height: number;
   readonly width: number;
   readonly cells: Cell[] = [];

   constructor(dimensions: Dimensions | number) {
      const { height, width } =
         typeof dimensions === "number"
            ? { height: dimensions, width: dimensions }
            : dimensions;

      this.height = height;
      this.width = width ?? height;
      this.addRandomCell();
   }

   public getCell = ({ column, row }: Position): Cell | undefined => {
      return this.cells.find(
         (cell) => cell.position.row === row && cell.position.column === column
      );
   };

   public getClone = (): GameBoard => {
      return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
   };

   public getCellById = (id: string): Cell | undefined => {
      return this.cells.find((cell) => cell.id === id);
   };

   private getRow = (row: number): Cell[] => {
      return this.cells.filter((cell) => cell.position.row === row);
   };

   private getColumn = (column: number): Cell[] => {
      return this.cells.filter((cell) => cell.position.column === column);
   };

   public getRowLeftToRight = (row: number): Cell[] => {
      return this.getRow(row).sort(
         (a, b) => a.position.column - b.position.column
      );
   };

   public getRowRightToLeft = (row: number): Cell[] => {
      return this.getRow(row).sort(
         (a, b) => b.position.column - a.position.column
      );
   };

   public getColumnTopToBottom = (column: number): Cell[] => {
      return this.getColumn(column).sort(
         (a, b) => a.position.row - b.position.row
      );
   };

   public getColumnBottomToTop = (column: number): Cell[] => {
      return this.getColumn(column).sort(
         (a, b) => b.position.row - a.position.row
      );
   };

   public getRowsLeftToRight = (): Cell[][] => {
      return Array.from({ length: this.height }, (_, i) =>
         this.getRowLeftToRight(i)
      );
   };

   public getRowsRightToLeft = (): Cell[][] => {
      return Array.from({ length: this.height }, (_, i) =>
         this.getRowRightToLeft(i)
      );
   };

   public getColumnsTopToBottom = (): Cell[][] => {
      return Array.from({ length: this.width }, (_, i) =>
         this.getColumnTopToBottom(i)
      );
   };

   public getColumnsBottomToTop = (): Cell[][] => {
      return Array.from({ length: this.width }, (_, i) =>
         this.getColumnBottomToTop(i)
      );
   };

   public addRandomCell = (): void => {
      let foundEmptyCell = false;
      do {
         const position = {
            row: getRandomInt(0, this.height - 1),
            column: getRandomInt(0, this.width - 1),
         };

         if (this.getCell(position)) continue;

         foundEmptyCell = true;

         this.cells.push({
            id: nanoid(10),
            value: getRandomValueFromArray([2, 2, 2, 2, 2, 2, 2, 2, 2, 4]),
            // value: getRandomValueFromArray([2048]),
            position,
         });
      } while (!foundEmptyCell);
   };

   public merge = (): void => {
      this.cells.forEach((cell, index) => {
         if (!cell.mergeWith) return;
         cell.mergeWith.value *= 2;
         cell.mergeWith.mergeWith = undefined;
         this.cells.splice(index, 1);
      });
   };

   public mergeCell = (id: string): void => {
      const cell = this.getCellById(id);
      if (!cell) return;
      if (!cell.mergeWith) return;
      cell.mergeWith.value *= 2;
      cell.mergeWith.mergeWith = undefined;
      this.cells.splice(this.cells.indexOf(cell), 1);
   };

   public isGameOver = (): boolean => {
      if (this.cells.length < this.height * this.width) return false;

      for (let row = 0; row < this.height; row++) {
         for (let column = 0; column < this.width; column++) {
            const cell = this.getCell({ row, column })!;
            const topCell = this.getCell({ row: row - 1, column });
            const bottomCell = this.getCell({ row: row + 1, column });
            const leftCell = this.getCell({ row, column: column - 1 });
            const rightCell = this.getCell({ row, column: column + 1 });

            if (
               !topCell ||
               !bottomCell ||
               !leftCell ||
               !rightCell ||
               cell.value === topCell.value ||
               cell.value === bottomCell.value ||
               cell.value === leftCell.value ||
               cell.value === rightCell.value
            )
               return false;
         }
      }

      return true;
   };

   private findMerges = (cells: Cell[][]) => {
      cells.forEach((columnOrRow) => {
         if (columnOrRow.length <= 1) return;
         let prevCell: Cell | null = null;

         columnOrRow.forEach((cell) => {
            if (prevCell && cell.value === prevCell.value) {
               cell.mergeWith = prevCell;
               prevCell.mergeWith = cell;

               prevCell = null;
            } else {
               prevCell = cell;
            }
         });
      });
   };

   public moveUp = (): void => {
      this.findMerges(this.getColumnsTopToBottom());

      const columns = this.getColumnsTopToBottom();

      for (const element of columns) {
         const column = element;
         if (column.length === 0) continue;
         let min = 0;

         let j = 0;
         while (j < column.length) {
            const cell = column[j]!;
            if (cell.position.row > min) {
               cell.position.row = min;
            }
            if (cell.mergeWith) {
               cell.mergeWith.position.row = min;
               j++;
            }
            j++;
            min++;
         }
      }
   };

   public moveDown = (): void => {
      this.findMerges(this.getColumnsBottomToTop());

      const columns = this.getColumnsBottomToTop();

      for (const element of columns) {
         const column = element;
         if (column.length === 0) continue;
         let max = this.height - 1;

         let j = 0;
         while (j < column.length) {
            const cell = column[j]!;
            if (cell.position.row < max) {
               cell.position.row = max;
            }
            if (cell.mergeWith) {
               cell.mergeWith.position.row = max;
               j++;
            }
            j++;
            max--;
         }
      }
   };

   public moveLeft = (): void => {
      this.findMerges(this.getRowsLeftToRight());

      const rows = this.getRowsLeftToRight();

      for (const element of rows) {
         const row = element;
         if (row.length === 0) continue;
         let min = 0;

         let j = 0;
         while (j < row.length) {
            const cell = row[j]!;
            if (cell.position.column > min) {
               cell.position.column = min;
            }
            if (cell.mergeWith) {
               cell.mergeWith.position.column = min;
               j++;
            }
            j++;
            min++;
         }
      }
   };

   public moveRight = (): void => {
      this.findMerges(this.getRowsRightToLeft());

      const rows = this.getRowsRightToLeft();

      for (const element of rows) {
         const row = element;
         if (row.length === 0) continue;
         let max = this.width - 1;

         let j = 0;
         while (j < row.length) {
            const cell = row[j]!;
            if (cell.position.column < max) {
               cell.position.column = max;
            }
            if (cell.mergeWith) {
               cell.mergeWith.position.column = max;
               j++;
            }
            j++;
            max--;
         }
      }
   };
}
