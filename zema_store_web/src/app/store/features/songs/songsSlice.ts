import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { Song } from "../../../../helpers/types";
import SongsService from "../../../services/songs.service";
import UsersService from "../../../services/songs.service";

export type songsState = {
  songs: Array<Song>;
  searchSongsList: Array<Song>;
  isLoading: boolean;
  error: boolean;
  meta: {
    total: number;
    totalPage: number;
    currentPage: number;
    limit: number;
  };
};

// initial value
const initialState: songsState = {
  songs: [],
  searchSongsList: [],
  isLoading: false,
  error: false,
  meta: {
    total: 0,
    totalPage: 1,
    currentPage: 1,
    limit: 10,
  },
};

// This action is what we will call using the dispatch in order to trigger the API call.
// is used to get songs
export const getSongsApi = createAsyncThunk<any, any>(
  "/songs",
  async (payload, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      console.log("payload is ", payload);
      const { data } = await SongsService.getSongs(payload);
      return fulfillWithValue(data);
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    addSong: (state, { payload }) => {
      state.songs.push(payload);
      state.isLoading = false;
      state.searchSongsList = state.songs;
    },
    //
    updateSong: (state, { payload }) => {
      state.songs =
        state.songs &&
        state.songs.map((song: Song) => {
          if (song.id === payload.id) {
            return payload;
          }
          return song;
        });
      state.searchSongsList = state.songs;
    },
    // can be called when we want to remove Song
    removeSong: (state, { payload: id }) => {
      state.songs =
        state.songs && state.songs.filter((song: Song) => song.id !== id);
      state.isLoading = false;
      state.searchSongsList = state.songs;
    },
    searchSongs: (
      state,
      { payload }: { payload: { name: string; tag: string } }
    ) => {
      state.searchSongsList =
        state.songs &&
        state.songs.filter((song: Song) => {
          if (payload.name && song.title) {
            return song.title.toLowerCase().includes(payload.name);
          } else {
            return false;
          }
        });
    },
    // if we use pagination we can call the handlePaginate method
    handlePaginate: (state, { payload }) => {
      state.meta.currentPage = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSongsApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSongsApi.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.songs = payload;
        state.searchSongsList = state.songs;

        state.songs = payload !== null ? payload.songs : [];
        state.searchSongsList = state.songs;
        state.meta.total = payload.totalItems;
        state.meta.totalPage = payload.totalPages;
        state.meta.currentPage = payload.pageNumber + 1;
        state.meta.limit = 10;
      })
      .addCase(getSongsApi.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const { addSong, searchSongs, removeSong, handlePaginate, updateSong } =
  songsSlice.actions;

export const songsSelector = (state: RootState) => state.songs;

export default songsSlice.reducer;
