import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { Subscription } from "../../../../helpers/types";
import SubscriptionsService from "../../../services/subscriptions.service";

export type subscriptionsState = {
  subscriptions: Array<Subscription>;
  searchSubscriptionsList: Array<Subscription>;
  isLoading: boolean;
  error: boolean;
  meta: {
    totalPage: number;
    currentPage: number;
    limit: number;
  };
};

// initial value
const initialState: subscriptionsState = {
  subscriptions: [],
  searchSubscriptionsList: [],
  isLoading: false,
  error: false,
  meta: {
    totalPage: 1,
    currentPage: 1,
    limit: 10,
  },
};

// This action is what we will call using the dispatch in order to trigger the API call.
// is used to get subscriptions
export const getSubscriptionsApi = createAsyncThunk<any, any>(
  "/subscriptions",
  async (payload, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      const { data } = await SubscriptionsService.getSubscriptions();
      return fulfillWithValue(data);
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {
    addSubscription: (state, { payload }) => {
      state.subscriptions.push(payload);
      state.isLoading = false;
      state.searchSubscriptionsList = state.subscriptions;
    },
    //
    updateSubscription: (state, { payload }) => {
      state.subscriptions =
        state.subscriptions &&
        state.subscriptions.map((user: Subscription) => {
          if (user.id === payload.id) {
            return payload;
          }
          return user;
        });
      state.searchSubscriptionsList = state.subscriptions;
    },
    // can be called when we want to remove Subscription
    removeSubscription: (state, { payload: id }) => {
      state.subscriptions =
        state.subscriptions &&
        state.subscriptions.filter((user: Subscription) => user.id !== id);
      state.isLoading = false;
      state.searchSubscriptionsList = state.subscriptions;
    },
    searchSubscriptions: (
      state,
      { payload }: { payload: { name: string; tag: string } }
    ) => {
      state.searchSubscriptionsList =
        state.subscriptions &&
        state.subscriptions.filter((user: Subscription) => {
          if (payload.name && user.title) {
            return user.title.toLowerCase().includes(payload.name);
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
      .addCase(getSubscriptionsApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSubscriptionsApi.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.subscriptions = payload;
        state.searchSubscriptionsList = state.subscriptions;
      })
      .addCase(getSubscriptionsApi.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  addSubscription,
  searchSubscriptions,
  removeSubscription,
  handlePaginate,
  updateSubscription,
} = subscriptionsSlice.actions;

export const subscriptionsSelector = (state: RootState) => state.subscriptions;

export default subscriptionsSlice.reducer;
