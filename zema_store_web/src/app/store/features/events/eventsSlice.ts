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
      const { data } = await EventsService.getEvents();
     
      return fulfillWithValue(data);
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
      state.events.push(payload);
      state.isLoading = false;
      state.searchEventsList = state.events;
    },
    //
    updateEvent: (state, { payload }) => {
      state.events =
        state.events &&
        state.events.map((album: Event) => {
          if (album.id === payload.id) {
            return payload;
          }
          return album;
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
  searchEvents,
  removeEvent,
  handlePaginate,
  updateEvent,
} = eventsSlice.actions;

export const eventsSelector = (state: RootState) => state.events;

export default eventsSlice.reducer;
