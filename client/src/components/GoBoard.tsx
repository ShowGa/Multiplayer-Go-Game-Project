import React, { useEffect, useRef } from "react";

import { Renderer } from "../goObject/Renderer";
import { Game } from "../goObject/Game";

type GoBoardProps = {
  game: Game;
};

const GoBoard: React.FC<GoBoardProps> = ({ game }: { game: Game }) => {
  const canvasBoardRef = useRef(null);
  const canvasStoneRef = useRef(null);
  const canvasPreviewStoneRef = useRef(null);
  const canvasHighlightRef = useRef(null);

  const rendererRef = useRef<Renderer | null>(null);

  // function
  function handleDropStone(e: React.MouseEvent) {
    if (!rendererRef.current) return;

    if (game.handleMove(5, 5)) {
      rendererRef.current.drawStone(5, 5, game.turn);
    }
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
      <div onClick={handleDropStone}>
        <canvas
          ref={canvasBoardRef}
          width={780}
          height={780}
          style={{ position: "absolute" }}
        />
        <canvas
          ref={canvasStoneRef}
          width={780}
          height={780}
          style={{ position: "absolute" }}
        />
        <canvas
          ref={canvasPreviewStoneRef}
          width={780}
          height={780}
          style={{ position: "absolute" }}
        />
        <canvas
          ref={canvasHighlightRef}
          width={780}
          height={780}
          style={{ position: "absolute" }}
        />
      </div>
    </div>
  );
};

export default GoBoard;
