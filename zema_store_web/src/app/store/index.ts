import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import usersReducer from "./features/users/usersSlice";
import artistsReducer from "./features/artists/artistsSlice";
import albumsReducer from "./features/albums/albumsSlice";
import songsReducer from "./features/songs/songsSlice";

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const createStore = () =>
  configureStore({
    reducer: {
      users: usersReducer,
      artists: artistsReducer,
      albums: albumsReducer,
      songs: songsReducer,
    },
  });

export const store = createStore();

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
