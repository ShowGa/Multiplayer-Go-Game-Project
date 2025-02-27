import { useState } from "react";

import GoBoard from "../components/GoBoard";
import { Game } from "../goObject/Game";

const Battle = () => {
  const [goGame, setGoGame] = useState(new Game(19));
  const [goGameState, setGoGameState] = useState(goGame.board.state);

  return (
    <div>
      <GoBoard game={goGame} />
    </div>
  );
};

export default Battle;
