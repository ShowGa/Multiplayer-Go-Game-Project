import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import userRouter from "./routes/userRoutes.js";
import roomRouter from "./routes/roomRoutes.js";
import socketHandler from "./socket/index.js";

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// REST API
app.use("/api/users", userRouter);
app.use("/api/rooms", roomRouter);

// create socket.io server
const httpServer = createServer(app);
const io = new Server(httpServer, {
  // CORS
  cors: {
    origin: "*",
  },
});

socketHandler(io);

// 啟動 Server
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
