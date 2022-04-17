import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { Artist } from "../../../../helpers/types";
import ArtistsService from "../../../services/artists.service";

export type artistsState = {
  artists: Array<Artist>;
  searchArtistsList: Array<Artist>;
  isLoading: boolean;
  error: boolean;
  meta: {
    totalPage: number;
    currentPage: number;
    limit: number;
  };
};

// initial value
const initialState: artistsState = {
  artists: [],
  searchArtistsList: [],
  isLoading: false,
  error: false,
  meta: {
    totalPage: 1,
    currentPage: 1,
    limit: 10,
  },
};

// This action is what we will call using the dispatch in order to trigger the API call.
// is used to get artists
export const getArtistsApi = createAsyncThunk<any, any>(
  "/artists",
  async (payload, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      const { data } = await ArtistsService.getArtists();
      return fulfillWithValue(data.artists);
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const artistsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      state.artists.push(payload);
      state.isLoading = false;
      state.searchArtistsList = state.artists;
    },
    //
    updateUser: (state, { payload }) => {
      state.artists =
        state.artists &&
        state.artists.map((artist: Artist) => {
          if (artist.id === payload.id) {
            return payload;
          }
          return artist;
        });
      state.searchArtistsList = state.artists;
    },
    // can be called when we want to remove User
    removeUser: (state, { payload: id }) => {
      state.artists =
        state.artists &&
        state.artists.filter((artist: Artist) => artist.id !== id);
      state.isLoading = false;
      state.searchArtistsList = state.artists;
    },
    searchartists: (
      state,
      { payload }: { payload: { name: string; tag: string } }
    ) => {
      state.searchArtistsList =
        state.artists &&
        state.artists.filter((artist: Artist) => {
          if (payload.name && artist.fullName) {
            return artist.fullName.toLowerCase().includes(payload.name);
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
      .addCase(getArtistsApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getArtistsApi.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.artists = payload;
        state.searchArtistsList = state.artists;
      })
      .addCase(getArtistsApi.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  addUser,
  searchartists,
  removeUser,
  handlePaginate,
  updateUser,
} = artistsSlice.actions;

export const artistsSelector = (state: RootState) => state.artists;

export default artistsSlice.reducer;
