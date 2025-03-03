import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

const router = Router();

router.post("/create-room", (req, res) => {
  const roomId = uuidv4();
});

export default router;
