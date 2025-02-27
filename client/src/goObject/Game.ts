import { Board, Stone } from "./Board";

export class Game {
  board: Board;
  turn: Stone;

  constructor(boardSize: number) {
    this.board = new Board(boardSize);
    this.turn = "black";
  }

  initGame(): void {
    this.board.cleanTheBoard();
    this.turn = "black";
  }

  handleMove(row: number, col: number): boolean {
    if (this.board.placeStone(row, col, this.turn)) {
      this.turn = this.turn === "black" ? "white" : "black";
      return true;
    }

    return false;
  }
}
