import express from "express";

import { authRouter, songRouter } from "./routes/index.routes";

const app = express();

app.get("/api", (req, res) => {
  res.send("Welcome to zema store!");
});

app.use(express.json({limit: "10mb"}));

app.use(express.static(__dirname));

app.use("/api", authRouter);
app.use("/api", songRouter);

export default app;
