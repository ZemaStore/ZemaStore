import express from "express";

import { authRouter } from "./routes/index.routes";

const app = express();

app.get("/api", (req, res) => {
  res.send("Welcome to zema store!");
});

app.use(express.json({}));

app.use("/api", authRouter);

export default app;
