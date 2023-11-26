export type Field = {
   id: string;
   value: number;
   position: Position;
   mergeWith?: Field;
};

export type Position = {
   row: number;
   column: number;
};

export type BoardData = {
   fields: Field[];
   height: number;
   width: number;
};

export type Dimensions = {
   height: number;
   width: number;
};
