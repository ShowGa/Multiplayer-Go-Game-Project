import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import redisClient from "../redis/redisClient.js";

const router = Router();

router.post("/create-room", async (req, res) => {
  try {
    const { boardState } = req.body;

    const roomId = uuidv4();

    const data = {
      players: {
        // === Modify Later : When login functionality done === //
        black: { userId: "haha" },
        white: { userId: "hehe" },
      },
      boardState: boardState,
      currentTurn: "black",
      status: "matching",
    };

    // store into cache
    await redisClient.hSet(`Room:${roomId}`, {
      players: JSON.stringify(data.players),
      boardState: JSON.stringify(data.boardState),
      currentTurn: data.currentTurn,
      status: data.status,
    });

    return res.json({ roomId, ...data });
  } catch (e) {
    console.error("Error creating room:", e.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
