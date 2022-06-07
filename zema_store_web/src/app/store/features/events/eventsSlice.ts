import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { Event } from "../../../../helpers/types";
import EventsService from "../../../services/events.service";

export type EventsState = {
  events: Array<Event>;
  searchEventsList: Array<Event>;
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
const initialState: EventsState = {
  events: [],
  searchEventsList: [],
  isLoading: false,
  error: false,
  errorMessage: "",
  meta: {
    total: 1,
    totalPage: 1,
    currentPage: 1,
    limit: 10,
  },
};

// This action is what we will call using the dispatch in order to trigger the API call.
// is used to get events
export const getEventsApi = createAsyncThunk<any, any>(
  "/events",
  async (payload, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      const { data } = await EventsService.getEvents(
        payload.currentPage,
        "createdAt%3Aasc"
      );

      return fulfillWithValue(data);
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addEventsApi = createAsyncThunk<any, any>(
  "/addEvent",
  async (payload, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      const { data } = await EventsService.addEvent(payload);

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

export const updateEventsApi = createAsyncThunk<any, any>(
  "/updateEvent",
  async (payload, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      const { data } = await EventsService.updateEvent(
        payload.id,
        payload.formData
      );
      return fulfillWithValue(data);
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteEventsApi = createAsyncThunk<any, any>(
  "/deleteEvent",
  async (payload, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      const { data } = await EventsService.deleteEvent(payload);
      dispatch(removeEvent(payload));
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.isLoading = false;
      state.error = false;
      state.errorMessage = "";
    },
    addEvent: (state, { payload }) => {
      state.events.unshift(payload);
      state.isLoading = false;
      state.searchEventsList = state.events;
    },
    addAllEvent: (state, { payload }) => {
      state.events = payload.events;
      state.isLoading = false;
      state.searchEventsList = state.events;
      state.meta = payload.meta;
      state.error = payload.error;
    },
    //
    updateEvent: (state, { payload }) => {
      state.events =
        state.events &&
        state.events.map((event: Event) => {
          if (event.id === payload.id) {
            return payload;
          }
          return event;
        });
      state.searchEventsList = state.events;
    },
    // can be called when we want to remove Event
    removeEvent: (state, { payload: id }) => {
      state.events =
        state.events && state.events.filter((album: Event) => album.id !== id);
      state.isLoading = false;
      state.searchEventsList = state.events;
    },
    searchEvents: (
      state,
      { payload }: { payload: { name: string; tag: string } }
    ) => {
      state.searchEventsList =
        state.events &&
        state.events.filter((album: Event) => {
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
      .addCase(getEventsApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEventsApi.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.events = payload;
        state.searchEventsList = state.events;
      })
      .addCase(getEventsApi.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  clearMessage,
  addEvent,
  addAllEvent,
  searchEvents,
  removeEvent,
  handlePaginate,
  updateEvent,
} = eventsSlice.actions;

export const eventsSelector = (state: RootState) => state.events;

export default eventsSlice.reducer;
