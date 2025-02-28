import { useState } from "react";

import GoBoard from "../components/GoBoard";
import { Game } from "../goObject/Game";

const Battle = () => {
  const [goGame, setGoGame] = useState(new Game(19));
  // const [goGameState, setGoGameState] = useState(goGame.board.state);

  const handleMove = (row: number, col: number): boolean => {
    const result = goGame.handleMove(row, col);

    return result;
  };

  return (
    <div>
      <GoBoard
        game={goGame}
        onStoneDrop={(row: number, col: number) => {
          return handleMove(row, col);
        }}
      />
    </div>
  );
};

export default Battle;
