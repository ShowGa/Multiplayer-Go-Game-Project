import React, { useEffect, useRef } from "react";

import { Renderer } from "../goObject/Renderer";
import { Game } from "../goObject/Game";

type GoBoardProps = {
  game: Game;
  onStoneDrop: (row: number, col: number) => boolean;
};

const GoBoard: React.FC<GoBoardProps> = ({
  game,
  onStoneDrop,
}: GoBoardProps) => {
  const canvasBoardRef = useRef(null);
  const canvasStoneRef = useRef(null);
  const canvasPreviewStoneRef = useRef(null);
  const canvasHighlightRef = useRef(null);

  const rendererRef = useRef<Renderer | null>(null);

  // function
  function handleDropStone(e: React.MouseEvent) {
    if (!rendererRef.current) return;

    const margin = rendererRef.current.margin;
    const cellSize = rendererRef.current.cellSize;
    const boardSize = rendererRef.current.board.size;

    const turn = game.turn;

    // calculate the position
    const [row, col] = getRowColFromMouseEvent(
      e,
      rendererRef.current.canvasHighlight,
      margin,
      cellSize,
      boardSize
    );

    // drop the stone
    const result = onStoneDrop(row, col);

    // check if droping is illegal
    if (!result) return;

    // render
    rendererRef.current.drawStone(row, col, turn);

    // draw hightlight on the last drop stone
    rendererRef.current.drawHighlight(row, col);
  }

  function handleShowPreviewStone(e: React.MouseEvent) {
    if (!rendererRef.current) return;

    const margin = rendererRef.current.margin;
    const cellSize = rendererRef.current.cellSize;
    const boardSize = rendererRef.current.board.size;

    const turn = game.turn;

    // calculate the position
    const [row, col] = getRowColFromMouseEvent(
      e,
      rendererRef.current.canvasHighlight,
      margin,
      cellSize,
      boardSize
    );

    // draw preview
    rendererRef.current.drawPreviewStone(row, col, turn);
  }

  function getRowColFromMouseEvent(
    e: MouseEvent | React.MouseEvent,
    canvas: HTMLCanvasElement,
    margin: number,
    cellSize: number,
    boardSize: number
  ): [number, number] {
    // get the position based on the position of canvas
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // transfer the position to row, col
    let col = Math.round((x - margin) / cellSize);
    let row = Math.round((y - margin) / cellSize);

    // fix the postion exceed the board
    if (col < 0) col = 0;
    if (col >= boardSize) col = boardSize - 1;
    if (row < 0) row = 0;
    if (row >= boardSize) row = boardSize - 1;

    return [row, col];
  }

  useEffect(() => {
    if (
      canvasBoardRef.current &&
      canvasStoneRef.current &&
      canvasPreviewStoneRef.current &&
      canvasHighlightRef.current
    ) {
      const renderer = new Renderer(
        canvasBoardRef.current,
        canvasStoneRef.current,
        canvasPreviewStoneRef.current,
        canvasHighlightRef.current,
        game.board,
        20
      );

      // drawinit
      renderer.drawInit();
      rendererRef.current = renderer;
    }
  }, []);

  return (
    <div>
      <div
        onClick={handleDropStone}
        className="w-[780px] h-[780px] bg-orange-200"
      >
        <canvas
          ref={canvasBoardRef}
          width={780}
          height={780}
          style={{ position: "absolute", zIndex: "10" }}
        />
        <canvas
          ref={canvasStoneRef}
          width={780}
          height={780}
          style={{ position: "absolute", zIndex: "11" }}
        />
        <canvas
          ref={canvasPreviewStoneRef}
          width={780}
          height={780}
          style={{ position: "absolute", zIndex: "12" }}
        />
        <canvas
          ref={canvasHighlightRef}
          width={780}
          height={780}
          style={{ position: "absolute", zIndex: "13" }}
          onMouseMove={handleShowPreviewStone}
          onMouseLeave={() => {
            rendererRef.current?.cleanPreviewStone();
          }}
        />
      </div>
    </div>
  );
};

export default GoBoard;
