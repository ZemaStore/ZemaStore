import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { Album } from "../../../../helpers/types";
import AlbumsService from "../../../services/albums.service";

export type AlbumsState = {
  albums: Array<Album>;
  searchAlbumsList: Array<Album>;
  isLoading: boolean;
  error: boolean;
  errorMessage: string;
  meta: {
    total: number;
    totalPage: number;
    currentPage: number;
    limit: number;
  };
};

// initial value
const initialState: AlbumsState = {
  albums: [],
  searchAlbumsList: [],
  isLoading: false,
  error: false,
  errorMessage: "",
  meta: {
    total: 0,
    totalPage: 1,
    currentPage: 1,
    limit: 10,
  },
};

// This action is what we will call using the dispatch in order to trigger the API call.
// is used to get albums
export const getAlbumsApi = createAsyncThunk<any, any>(
  "/albums",
  async (payload, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      const { data } = await AlbumsService.getAlbums();
      console.log("data is ", data);
      return fulfillWithValue(data);
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addArtistsApi = createAsyncThunk<any, any>(
  "/addArtist",
  async (payload, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      const { data } = await AlbumsService.addAlbum(payload);
      return fulfillWithValue(data);
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateArtistsApi = createAsyncThunk<any, any>(
  "/updateArtist",
  async (payload, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      const { data } = await AlbumsService.updateAlbum(payload);
      return fulfillWithValue(data);
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteArtistsApi = createAsyncThunk<any, any>(
  "/deleteArtist",
  async (payload, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      const { data } = await AlbumsService.updateAlbum(payload);
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.isLoading = false;
      state.error = false;
      state.errorMessage = "";
    },
    addAlbum: (state, { payload }) => {
      state.albums.push(payload);
      state.isLoading = false;
      state.searchAlbumsList = state.albums;
    },
    //
    updateAlbum: (state, { payload }) => {
      state.albums =
        state.albums &&
        state.albums.map((album: Album) => {
          if (album.id === payload.id) {
            return payload;
          }
          return album;
        });
      state.searchAlbumsList = state.albums;
    },
    // can be called when we want to remove Album
    removeAlbum: (state, { payload: id }) => {
      state.albums =
        state.albums && state.albums.filter((album: Album) => album.id !== id);
      state.isLoading = false;
      state.searchAlbumsList = state.albums;
    },
    searchAlbums: (
      state,
      { payload }: { payload: { name: string; tag: string } }
    ) => {
      state.searchAlbumsList =
        state.albums &&
        state.albums.filter((album: Album) => {
          if (payload.name && album.title) {
            return album.title.toLowerCase().includes(payload.name);
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
      .addCase(getAlbumsApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAlbumsApi.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.albums = payload !== null ? payload.albumList : [];
        state.searchAlbumsList = state.albums;
        state.meta.total = payload.totalItems;
        state.meta.totalPage = payload.totalPages;
        state.meta.currentPage = payload.pageNumber + 1;
        state.meta.limit = 10;
      })
      .addCase(getAlbumsApi.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  addAlbum,
  searchAlbums,
  removeAlbum,
  handlePaginate,
  updateAlbum,
} = albumsSlice.actions;

export const albumsSelector = (state: RootState) => state.albums;

export default albumsSlice.reducer;
