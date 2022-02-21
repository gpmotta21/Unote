import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "./apis";

export const tryAuth = createAsyncThunk("/login", async (user) => {
  const { data } = await API.LOGIN_URL(user);
  return data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState: { response: false, isLoading: false, error: false },
  reducers: {
    resetAuth: (state) => {
      state.response = false;
    },
  },

  extraReducers: {
    [tryAuth.pending]: (state) => {
      state.isLoading = true;
    },
    [tryAuth.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.response = action.payload;
    },
    [tryAuth.rejected]: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;
