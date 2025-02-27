import { Board, Stone } from "./Board";

export class Renderer {
  canvasBoard: HTMLCanvasElement; // Board layer
  canvasStone: HTMLCanvasElement; // Stone layer
  canvasPreviewStone: HTMLCanvasElement; // PreviewStone layer
  canvasHighlight: HTMLCanvasElement; // Highlight layer
  ctxBoard: CanvasRenderingContext2D;
  ctxStone: CanvasRenderingContext2D;
  ctxPreviewStone: CanvasRenderingContext2D;
  ctxHighlight: CanvasRenderingContext2D;
  board: Board;
  margin: number;
  cellSize: number;

  constructor(
    canvasBoard: HTMLCanvasElement,
    canvasStone: HTMLCanvasElement,
    canvasPreviewStone: HTMLCanvasElement,
    canvasHighlight: HTMLCanvasElement,
    board: Board,
    margin: number
  ) {
    this.canvasBoard = canvasBoard;
    this.canvasStone = canvasStone;
    this.canvasPreviewStone = canvasPreviewStone;
    this.canvasHighlight = canvasHighlight;
    this.board = board;
    this.margin = margin;

    const contextBoard = this.canvasBoard.getContext("2d");
    const contextStone = this.canvasStone.getContext("2d");
    const contextPreviewStone = this.canvasPreviewStone.getContext("2d");
    const contextHighlight = this.canvasHighlight.getContext("2d");

    if (
      !contextBoard ||
      !contextStone ||
      !contextPreviewStone ||
      !contextHighlight
    ) {
      throw new Error("Canvas 2D context not available.");
    }

    this.ctxBoard = contextBoard;
    this.ctxStone = contextStone;
    this.ctxPreviewStone = contextPreviewStone;
    this.ctxHighlight = contextHighlight;

    // calculate the cellsize based on the lattice
    this.cellSize =
      (this.canvasBoard.width - this.margin * 2) / (this.board.size - 1);
  }

  // ========== public method ========== //
  drawInit(): void {
    this.cleanCanvas();
    this.drawGrid();
    this.drawAllTheStones();
  }

  cleanCanvas(): void {
    this.ctxBoard.clearRect(
      0,
      0,
      this.canvasBoard.width,
      this.canvasBoard.height
    );
    this.ctxStone.clearRect(
      0,
      0,
      this.canvasBoard.width,
      this.canvasBoard.height
    );
    this.ctxHighlight.clearRect(
      0,
      0,
      this.canvasBoard.width,
      this.canvasBoard.height
    );
  }

  drawGrid(): void {
    this.ctxBoard.strokeStyle = "#000"; // color

    for (let i = 0; i < this.board.size; i++) {
      const position = this.margin + i * this.cellSize; // vertical and horizontal

      // horizontal
      this.ctxBoard.beginPath();
      this.ctxBoard.moveTo(this.margin, position); // start point
      this.ctxBoard.lineTo(this.canvasBoard.width - this.margin, position); // end point
      this.ctxBoard.stroke(); // draw the line

      // vertical
      this.ctxBoard.beginPath();
      this.ctxBoard.moveTo(position, this.margin);
      this.ctxBoard.lineTo(position, this.canvasBoard.height - this.margin);
      this.ctxBoard.stroke();
    }
  }

  drawStone(row: number, col: number, color: Stone): void {
    const x = this.margin + col * this.cellSize;
    const y = this.margin + row * this.cellSize;
    const radius = (this.cellSize / 2) * 0.8; // custom when the device is defferent

    this.ctxStone.beginPath();
    this.ctxStone.arc(x, y, radius, 0, Math.PI * 2); // angle => Radian
    this.ctxStone.fillStyle = color; // the color of the stone
    this.ctxStone.fill(); // fill up the circle
  }

  drawAllTheStones(): void {
    for (let row = 0; row < this.board.size; row++) {
      for (let col = 0; col < this.board.size; col++) {
        const stone = this.board.state[row][col];
        if (stone !== null) {
          this.drawStone(row, col, stone);
        }
      }
    }
  }

  drawPreviewStone(row: number, col: number, color: Stone): void {
    // clean the PreviewStone canvas
    this.ctxPreviewStone.clearRect(
      0,
      0,
      this.canvasBoard.width,
      this.canvasBoard.height
    );

    // no need to draw when the position was occupied
    if (this.board.state[row][col] !== null) return;

    // draw
    const x = this.margin + col * this.cellSize;
    const y = this.margin + row * this.cellSize;
    const radius = (this.cellSize / 2) * 0.8;

    this.ctxPreviewStone.beginPath();
    this.ctxPreviewStone.arc(x, y, radius, 0, Math.PI * 2); // angle => Radian
    this.ctxPreviewStone.fillStyle = color; // the color of the stone
    this.ctxPreviewStone.fill(); // fill up the circle
  }
  cleanPreviewStone() {}

  drawHighlight(row: number, col: number, color: Stone): void {
    const x = this.margin + col * this.cellSize;
    const y = this.margin + row * this.cellSize;
    const radius = (this.cellSize / 2) * 0.8;

    // clear the previous hightlight
    this.ctxHighlight.clearRect(
      0,
      0,
      this.canvasBoard.width,
      this.canvasBoard.height
    );

    this.ctxHighlight.beginPath();
    this.ctxHighlight.arc(x, y, radius, 0, Math.PI * 2);
    this.ctxHighlight.strokeStyle = color;
    this.ctxHighlight.globalAlpha = 0.6; // opacity
    this.ctxHighlight.stroke();
  }
}
