import { Dimensions, Field, Position } from "@/types/game";
import { getRandomInt, getRandomValueFromArray } from "@/utils/commonUtils";
import { nanoid } from "nanoid";

export class GameBoard {
   readonly height: number;
   readonly width: number;
   readonly fields: Field[] = [];

   constructor(dimensions: Dimensions | number) {
      const { height, width } =
         typeof dimensions === "number"
            ? { height: dimensions, width: dimensions }
            : dimensions;

      this.height = height;
      this.width = width ?? height;
      this.addRandomCell();
   }

   public getCell = ({ column, row }: Position): Field | undefined => {
      return this.fields.find(
         (field) =>
            field.position.row === row && field.position.column === column
      );
   };

   public getClone = (): GameBoard => {
      return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
   };

   public getCellById = (id: string): Field | undefined => {
      return this.fields.find((field) => field.id === id);
   };

   private getRow = (row: number): Field[] => {
      return this.fields.filter((field) => field.position.row === row);
   };

   private getColumn = (column: number): Field[] => {
      return this.fields.filter((field) => field.position.column === column);
   };

   public getRowLeftToRight = (row: number): Field[] => {
      return this.getRow(row).sort(
         (a, b) => a.position.column - b.position.column
      );
   };

   public getRowRightToLeft = (row: number): Field[] => {
      return this.getRow(row).sort(
         (a, b) => b.position.column - a.position.column
      );
   };

   public getColumnTopToBottom = (column: number): Field[] => {
      return this.getColumn(column).sort(
         (a, b) => a.position.row - b.position.row
      );
   };

   public getColumnBottomToTop = (column: number): Field[] => {
      return this.getColumn(column).sort(
         (a, b) => b.position.row - a.position.row
      );
   };

   public getRowsLeftToRight = (): Field[][] => {
      return Array.from({ length: this.height }, (_, i) =>
         this.getRowLeftToRight(i)
      );
   };

   public getRowsRightToLeft = (): Field[][] => {
      return Array.from({ length: this.height }, (_, i) =>
         this.getRowRightToLeft(i)
      );
   };

   public getColumnsTopToBottom = (): Field[][] => {
      return Array.from({ length: this.width }, (_, i) =>
         this.getColumnTopToBottom(i)
      );
   };

   public getColumnsBottomToTop = (): Field[][] => {
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

         this.fields.push({
            id: nanoid(10),
            // value: getRandomValueFromArray([2, 2, 2, 4]),
            value: getRandomValueFromArray([16]),
            position,
         });
      } while (!foundEmptyCell);
   };

   public merge = (): void => {
      this.fields.forEach((field) => {
         if (!field.mergeWith) return;
         field.value *= 2;
         field.mergeWith = undefined;
      });
   };

   public isGameOver = (): boolean => {
      if (this.fields.length < this.height * this.width) return false;

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

   private findMerges = (fields: Field[][]) => {
      fields.forEach((columnOrRow) => {
         if (columnOrRow.length <= 1) return;
         let prevCell: Field | null = null;
         columnOrRow.forEach((cell) => {
            if (prevCell && cell.value === prevCell.value) {
               cell.mergeWith = prevCell;
               this.fields.splice(this.fields.indexOf(prevCell), 1);
               prevCell = null;
            } else {
               prevCell = cell;
            }
         });
      });
   };

   public moveUp = (): void => {
      this.findMerges(this.getColumnsTopToBottom());
      this.getColumnsTopToBottom().forEach((column) => {
         if (column.length === 0) return;
         let min = 0;
         column.forEach((cell) => {
            if (cell.position.row > min) {
               cell.position.row = min;
            }
            min++;
         });
      });
   };

   public moveDown = (): void => {
      this.findMerges(this.getColumnsBottomToTop());
      this.getColumnsBottomToTop().forEach((column) => {
         if (column.length === 0) return;
         let max = this.height - 1;
         column.forEach((cell) => {
            if (cell.position.row < max) {
               cell.position.row = max;
            }
            max--;
         });
      });
   };

   public moveLeft = (): void => {
      this.findMerges(this.getRowsLeftToRight());
      this.getRowsLeftToRight().forEach((row) => {
         if (row.length === 0) return;
         let min = 0;
         row.forEach((cell) => {
            if (cell.position.column > min) {
               cell.position.column = min;
            }
            min++;
         });
      });
   };

   public moveRight = (): void => {
      this.findMerges(this.getRowsRightToLeft());
      this.getRowsRightToLeft().forEach((row) => {
         if (row.length === 0) return;
         let max = this.width - 1;
         row.forEach((cell) => {
            if (cell.position.column < max) {
               cell.position.column = max;
            }
            max--;
         });
      });
   };
}
