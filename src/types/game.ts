export type Cell = {
   id: string;
   value: number;
   position: Position;
   mergeWith?: Cell;
   animationEnded?: boolean;
};

export type Position = {
   row: number;
   column: number;
};

export type BoardData = {
   fields: Cell[];
   height: number;
   width: number;
};

export type Dimensions = {
   height: number;
   width: number;
};
