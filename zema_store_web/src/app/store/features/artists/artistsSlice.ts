import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { Artist } from "../../../../helpers/types";
import ArtistsService from "../../../services/artists.service";

export type artistsState = {
  artists: Array<Artist>;
  searchArtistsList: Array<Artist>;
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
const initialState: artistsState = {
  artists: [],
  searchArtistsList: [],
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
// is used to get artists
export const getArtistsApi = createAsyncThunk<any, any>(
  "/artists",
  async (payload, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      const { data } = await ArtistsService.getArtists(
        payload.currentPage,
        "createdAt%3Aasc"
      );
      const res = data.artists.map((artist: any) => {
        const [fname, lname] = artist.profileId.fullName.split(" ");
        return {
          ...artist,
          firstName: artist.profileId.firstName || fname || "firstName",
          lastName: artist.profileId.lastName || lname || "lastName",
          avatar: artist.photoUrl,
          followers: artist.profileId.followerNumber,
          listenedHours: artist.profileId.listenedHour,
          albumsCount: 21,
          songsCount: 21,
          createdAt: "2020-01-01",
        };
      });

      return fulfillWithValue({ ...data, artists: res });
      // return fulfillWithValue([
      //   {
      //     id: "23243234234234",
      //     fullName: "John Doe",
      //     avatar:
      //       "https://cdn.tuk.dev/assets/templates/olympus/projects(3).png",
      //     followers: 12,
      //     listenedHours: 4239,
      //     albumsCount: 21,
      //     songsCount: 21,
      //     createdAt: "2020-01-01",
      //   },
      //   {
      //     id: "322323234",
      //     fullName: "Jane Doe",
      //     avatar:
      //       "https://cdn.tuk.dev/assets/templates/olympus/projects(1).png",
      //     followers: 12,
      //     listenedHours: 4239,
      //     albumsCount: 21,
      //     songsCount: 21,
      //     createdAt: "2020-01-01",
      //   },
      //   {
      //     id: "wef3232423423423",
      //     fullName: "Thomas Doe",
      //     avatar:
      //       "https://cdn.tuk.dev/assets/templates/olympus/projects(1).png",
      //     followers: 12,
      //     listenedHours: 4239,
      //     albumsCount: 21,
      //     songsCount: 21,
      //     createdAt: "2020-01-01",
      //   },
      // ]);
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addArtistsApi = createAsyncThunk<any, any>(
  "/addArtist",
  async (payload, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      const { data } = await ArtistsService.addArtist(payload);

      return fulfillWithValue({
        ...data,
        fullName: data.profileId.fullName,
        avatar: data.photoUrl,
        followers: data.profileId.followerNumber,
        listenedHours: data.profileId.listenedHour,
        albumsCount: 0,
        songsCount: 0,
        createdAt: "2020-01-01",
      });
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateArtistsApi = createAsyncThunk<any, any>(
  "/updateArtist",
  async (payload, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      console.log(payload, " is the payload");
      const { data } = await ArtistsService.updateArtist(
        payload.id,
        payload.formData
      );
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
      const { data } = await ArtistsService.deleteArtist(payload);
      dispatch(removeArtist(payload));
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const artistsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.isLoading = false;
      state.error = false;
      state.errorMessage = "";
    },
    addArtist: (state, { payload }) => {
      state.artists.push(payload);
      state.isLoading = false;
      state.searchArtistsList = state.artists;
    },
    //
    updateArtist: (state, { payload }) => {
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
    removeArtist: (state, { payload: id }) => {
      state.artists =
        state.artists &&
        state.artists.filter((artist: Artist) => artist.id !== id);
      state.isLoading = false;
      state.searchArtistsList = state.artists;
    },
    searchArtists: (
      state,
      { payload }: { payload: { name: string; tag: string } }
    ) => {
      state.searchArtistsList =
        state.artists &&
        state.artists.filter((artist: Artist) => {
          if (payload.name && artist.firstName && artist.lastName) {
            return (
              artist.firstName.toLowerCase().includes(payload.name) ||
              artist.lastName.toLowerCase().includes(payload.name)
            );
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
        state.meta.total = payload.totalItems;
        state.meta.totalPage = payload.totalPages;
        state.meta.currentPage = payload.pageNumber + 1;
        state.meta.limit = 10;
        state.artists = payload.artists;
        state.searchArtistsList = state.artists;
      })
      .addCase(getArtistsApi.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(addArtistsApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addArtistsApi.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.artists.unshift(payload);
        state.searchArtistsList = state.artists;
      })
      .addCase(addArtistsApi.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = true;
        state.errorMessage = (payload as string).toString();
      })
      .addCase(updateArtistsApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateArtistsApi.fulfilled, (state, { payload }) => {
        console.log(payload, " is th payload");

        state.artists =
          state.artists &&
          state.artists.map((artist: Artist) => {
            if (artist.id === payload.id) {
              return {
                ...payload,
                fullName: payload.profileId.fullName,
                avatar: payload.photoUrl,
                followers: payload.profileId.followerNumber,
                listenedHours: payload.profileId.listenedHour,
                albumsCount: 0,
                songsCount: 0,
                createdAt: "2020-01-01",
              };
            }
            return artist;
          });
        state.searchArtistsList = state.artists;
        state.isLoading = false;
      })
      .addCase(updateArtistsApi.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  clearMessage,
  addArtist,
  searchArtists,
  removeArtist,
  handlePaginate,
  updateArtist,
} = artistsSlice.actions;

export const artistsSelector = (state: RootState) => state.artists;

export default artistsSlice.reducer;
