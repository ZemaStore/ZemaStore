export const baseUrl =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

export * from "./auth.service";
export * from "./users.service";
export * from "./songs.service";
export * from "./events.service";
export * from "./albums.service";
export * from "./subscriptions.service";
