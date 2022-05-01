import { isNil } from "lodash";

import swagger from "../swagger/swagger.json";

const env = isNil(process.env.NODE_ENV) ? "local" : process.env.NODE_ENV;

const environments = {
  LOCAL: "local",
  DEV: "dev",
  STAGE: "stage",
};

const getSwaggerDoc = async () => {
  let modifiedSwagger = swagger;
  modifiedSwagger = {
    ...modifiedSwagger,
    servers: [
      {
        url: getServerUrlForSwagger(),
      },
    ],
  };

  return swagger;
};

const getServerUrlForSwagger = () => {
  switch (env) {
    case environments.LOCAL:
      return "http://localhost:3000/api";
    case environments.DEV:
      return "http://zema-store.herokuapp.com/api";
    case environments.STAGE:
      return "http://zema-store.herokuapp.com/api";
  }
};

export { getSwaggerDoc };
