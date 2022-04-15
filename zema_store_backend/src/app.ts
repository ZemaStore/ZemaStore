import express from "express";

import { authRouter } from './routes/index'

const app = express();

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json({}));

app.use("/api/v1/auth", authRouter);

export default app;
