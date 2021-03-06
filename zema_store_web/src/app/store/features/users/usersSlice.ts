import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { User } from "../../../../helpers/types";
import UsersService from "../../../services/users.service";

export type usersState = {
  users: Array<User>;
  searchUsersList: Array<User>;
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
const initialState: usersState = {
  users: [],
  searchUsersList: [],
  isLoading: false,
  error: false,
  meta: {
    total: 0,
    totalPage: 0,
    currentPage: 0,
    limit: 10,
  },
};

// This action is what we will call using the dispatch in order to trigger the API call.
// is used to get users
export const getUsersApi = createAsyncThunk<any, any>(
  "/users",
  async (payload, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      const { data } = await UsersService.getUsers(
        payload.currentPage,
        "createdAt%3Aasc"
      );
      console.log("data is ", data);
      return fulfillWithValue(data);
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);



export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      state.users.push(payload);
      state.isLoading = false;
      state.searchUsersList = state.users;
    },
    //
    updateUser: (state, { payload }) => {
      state.users =
        state.users &&
        state.users.map((user: User) => {
          if (user.id === payload.id) {
            return payload;
          }
          return user;
        });
      state.searchUsersList = state.users;
    },
    // can be called when we want to remove User
    removeUser: (state, { payload: id }) => {
      state.users =
        state.users && state.users.filter((user: User) => user.id !== id);
      state.isLoading = false;
      state.searchUsersList = state.users;
    },
    searchusers: (
      state,
      { payload }: { payload: { name: string; tag: string } }
    ) => {
      state.searchUsersList =
        state.users &&
        state.users.filter((user: User) => {
          if (payload.name && user.firstName && user.lastName) {
            return (
              user.firstName.toLowerCase().includes(payload.name) ||
              user.lastName.toLowerCase().includes(payload.name)
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
      .addCase(getUsersApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsersApi.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.meta.total = payload.totalItems;
        state.meta.totalPage = payload.totalPages;
        state.meta.currentPage = payload.pageNumber + 1;
        state.meta.limit = 10;
        state.users = payload.users;
        state.searchUsersList = state.users;
      })
      .addCase(getUsersApi.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const { addUser, searchusers, removeUser, handlePaginate, updateUser } =
  usersSlice.actions;

export const usersSelector = (state: RootState) => state.users;

export default usersSlice.reducer;
