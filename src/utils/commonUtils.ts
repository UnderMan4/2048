export const getRandomInt = (min: number, max: number): number => {
   return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomValueFromArray = <T>(array: T[]): T => {
   return array[getRandomInt(0, array.length - 1)]!;
};
