import express from "express";
const cors = require("cors");

import {
  artistRouter,
  authRouter,
  songRouter,
  userRouter,
} from "./routes/index.routes";

const app = express();

app.use(cors());

app.get("/api", (req, res) => {
  res.send("Welcome to zema store!");
});

app.use(express.json({ limit: "10mb" }));

app.use(express.static(__dirname));

app.use("/api", authRouter);
app.use("/api", songRouter);
app.use("/api", artistRouter);
app.use("/api", userRouter);

export default app;
