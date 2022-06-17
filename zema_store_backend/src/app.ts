import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import { getSwaggerDoc } from "./services/config";

import {
  albumRouter,
  artistRouter,
  authRouter,
  eventRouter,
  followRouter,
  playlistRouter,
  songRouter,
  userRouter,
  subscriptionRouter,
  notificationRouter,
  reportRouter,
} from "./routes/index.routes";

const corsOptions = {
  origin: "*",
  optionSuccessStatus: 200,
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));

var options = {
  swaggerOptions: {
    authAction: {
      JWT: {
        name: "JWT",
        schema: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          description: "",
        },
        value: "Bearer <JWT>",
      },
    },
  },
};

(async () => {
  const swagger = await getSwaggerDoc();
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger, options));
})();

app.get("/api", (req, res) => {
  res.send("Welcome to zema store!");
});

app.use(express.json({ limit: "10mb" }));

app.use(express.static(__dirname));

app.use("/api", authRouter);
app.use("/api", songRouter);
app.use("/api", artistRouter);
app.use("/api", userRouter);
app.use("/api", albumRouter);
app.use("/api", playlistRouter);
app.use("/api", followRouter);
app.use("/api", eventRouter);
app.use("/api", subscriptionRouter);
app.use("/api", notificationRouter);
app.use("/api", reportRouter);

export default app;
