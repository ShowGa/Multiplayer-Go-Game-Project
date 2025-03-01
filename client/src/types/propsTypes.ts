import { socketDropData, Stone } from "./types";

export type GoBoardProps = {
  boardSize: number;
  boardState: (Stone | null)[][];
  currentTurn: Stone;
  newStoneData: socketDropData | null;
  onStoneDrop: (row: number, col: number) => boolean;
};
