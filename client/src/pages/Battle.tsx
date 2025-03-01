import { useState } from "react";

import GoBoard from "../components/GoBoard";
import { Game } from "../goObject/Game";

const Battle = () => {
  const [goGame, setGoGame] = useState(new Game(19));
  const [socketDropData, setSocketDropData] = useState();

  const handleMove = (row: number, col: number): boolean => {
    const result = goGame.handleMove(row, col);

    return result;
  };

  return (
    <div className="">
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
