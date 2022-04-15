import mongoose from "mongoose";

import app from "./app";
import configs from "./configs/app.configs";

mongoose.connect(configs.DATABASE_URL, {}).then(() => {
  app.listen(configs.PORT, () => {
    return console.log(`Express is listening at http://localhost:${configs.PORT}`);
  });
});
