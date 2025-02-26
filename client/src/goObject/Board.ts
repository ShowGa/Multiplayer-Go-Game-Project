export type Stone = "b" | "w";

export class Board {
  private size: number;
  private state: (Stone | null)[][];

  constructor(size: number) {
    this.size = size;
    this.state = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => null)
    );
  }

  // check if the stone was able to be placed based on position occupied or not
  placeStone(row: number, col: number, color: Stone): boolean {
    // check if placement exceed the board margin
    if (row < 0 || row >= this.size || col < 0 || row >= this.size) {
      return false;
    }

    // check if the target position been occupied
    if (this.state[row][col] !== null) {
      return false;
    }

    // put the stone in data structure
    this.state[row][col] = color;

    return true;
  }

  // restart the board
  cleanTheBoard(): void {
    this.state = Array.from({ length: this.size }, () =>
      Array.from({ length: this.size }, () => null)
    );
  }
}
