import { useState } from "react";

import GoBoard from "../components/GoBoard";
import { Game } from "../goObject/Game";
import { socketDropData, Stone } from "../types/types";

const Battle = () => {
  const [goGame, setGoGame] = useState<Game>(new Game(19));
  const [currentTurn, setCurrentTurn] = useState<Stone>(goGame.turn);
  const [newStoneDrop, setNewStoneDrop] = useState<socketDropData | null>(null);

  const handleMove = (row: number, col: number): boolean => {
    const result = goGame.handleMove(row, col);

    if (result) {
      setCurrentTurn(goGame.turn);
    }

    return result;
  };

  return (
    <div className="">
      <GoBoard
        boardSize={goGame.board.size}
        boardState={goGame.board.state}
        currentTurn={currentTurn}
        newStoneData={newStoneDrop}
        onStoneDrop={(row: number, col: number) => {
          return handleMove(row, col);
        }}
      />
    </div>
  );
};

export default Battle;
