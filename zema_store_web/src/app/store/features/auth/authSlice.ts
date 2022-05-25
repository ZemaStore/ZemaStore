import {
  Action,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../..";
import AuthService from "../../../services/auth.service";

export type authState = {
  isAuthenticated: boolean;
  currentUser: any;
  token: {
    access: string;
    refresh: string;
  };
  isLoading: boolean;
  error: boolean;
  errorMessage: string;
};

// initial value
const initialState: authState = {
  isAuthenticated: false,
  currentUser: null,
  token: {
    access: "",
    refresh: "",
  },
  isLoading: false,
  error: false,
  errorMessage: "",
};

// This action is what we will call using the dispatch in order to trigger the API call.
// is used to get auth
export const loginApi = createAsyncThunk<any, any>(
  "/auth/login",
  async (payload, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      const { data } = await AuthService.login(payload);
      console.log(data, " is th data");
      return fulfillWithValue(data);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const logoutApi = createAsyncThunk<any, any>(
  "/auth/logout",
  async (payload, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      const data = await AuthService.logoutClientOnly();
      return fulfillWithValue(data);
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.isLoading = false;
      state.error = false;
      state.errorMessage = "";
    },
    login: (state, { payload }) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.currentUser = payload.user;
      state.token = payload.token;
    },
    logout: (state, { payload }) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      AuthService.logoutClientOnly();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginApi.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        console.log(payload, " is th payload");
      })
      .addCase(
        loginApi.rejected,
        (state, action: PayloadAction<any, string>) => {
          state.isLoading = false;
          state.errorMessage = action.payload;
          state.error = true;
        }
      );
  },
});

// Action creators are generated for each case reducer function
export const { clearMessage, login, logout } = authSlice.actions;

export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
