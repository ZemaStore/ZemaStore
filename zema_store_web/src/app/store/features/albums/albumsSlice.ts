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
      const { data } = await AlbumsService.getAlbums(payload);
      return fulfillWithValue(data);
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addAlbumsApi = createAsyncThunk<any, any>(
  "/addAlbum",
  async (payload, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      const { data, error } = await AlbumsService.addAlbum(payload);
      if (error) {
        return rejectWithValue(data);
      }
      console.log(data, " is the added album data");
      return fulfillWithValue(data);
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateAlbumsApi = createAsyncThunk<any, any>(
  "/updateAlbum",
  async (
    payload: FormData,
    { rejectWithValue, fulfillWithValue, dispatch }
  ) => {
    try {
      const albumId = payload.get("id")?.toString() || "";
      payload.delete("id");
      const { data } = await AlbumsService.updateAlbum(albumId, payload);

      return fulfillWithValue(data);
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteAlbumsApi = createAsyncThunk<any, any>(
  "/deleteAlbum",
  async (payload, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      const { data, error } = await AlbumsService.deleteAlbum(payload);
      console.log(data, " is the deleted album data");
      if (error) {
        return rejectWithValue(error);
      }
      dispatch(removeAlbum(payload));
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
      console.log(id, " is the album id");

      state.albums =
        state.albums &&
        state.albums.filter((album: any) => {
          console.log(album, id, " is the album id");
          return album.album.id !== id;
        });
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
        state.errorMessage = (payload as string).toString();
      })

      .addCase(addAlbumsApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAlbumsApi.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (state.albums.length === 10) {
          state.albums.pop();
        }
        state.albums.unshift(payload);
        state.searchAlbumsList = state.albums;
      })
      .addCase(addAlbumsApi.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = true;
        state.errorMessage = (payload as string).toString();
      })

      .addCase(updateAlbumsApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAlbumsApi.fulfilled, (state, { payload }) => {
        state.albums =
          state.albums &&
          state.albums.map((album: any) => {
            if (album.album.id === payload.album.id) {
              return {
                ...album,
                ...payload,
              };
            }
            return album;
          });
        state.searchAlbumsList = state.albums;
        state.isLoading = false;
      })
      .addCase(updateAlbumsApi.rejected, (state, { payload }) => {
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
