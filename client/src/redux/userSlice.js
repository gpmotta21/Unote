import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "./apis";

export const fetchAll = createAsyncThunk("user", async (token) => {
  const { data } = await API.FETCH_ALL_URL(token);
  return data;
});

export const createNote = createAsyncThunk("note", async (note) => {
  const { data } = await API.CREATE_NOTE_URL(note, note.userId);
  return data;
});

export const editNote = createAsyncThunk("note", async (item) => {
  const { data } = await API.EDIT_NOTE_URL(item.noteId, item.edit);
  return data;
});

export const deleteNote = createAsyncThunk("note", async (item) => {
  const { data } = await API.DELETE_NOTE_URL(item.userId, item.noteId);
  return data;
});

export const deleteAccount = createAsyncThunk("deleteuser", async (id) => {
  await API.DELETE_ACCOUNT_URL(id);
});

export const userSlice = createSlice({
  name: "user",
  initialState: { response: false, loadingUser: false, loadingNotes: false, error: false, noteError: undefined },
  reducers: {
    logout: (state) => {
      state.response = false;
      state.loadingUser = false;
      state.loadingNotes = false;
      state.error = false;
      localStorage.removeItem("token");
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchAll.pending, (state) => {
        state.response = false;
        state.loadingUser = true;
        state.loadingNotes = true;
        state.error = false;
        state.noteError = false;
      })

      .addCase(fetchAll.fulfilled, (state, action) => {
        state.response = action.payload;
        state.loadingUser = false;
        state.loadingNotes = false;
      })

      .addCase(deleteAccount.pending, (state) => {
        state.loadingUser = true;
      })

      .addCase(deleteAccount.fulfilled, (state) => {
        state.response = "deleted";
        state.loadingUser = false;
        state.loadingNotes = false;
        localStorage.removeItem("token");
      })

      .addMatcher(
        (action) => action.type.endsWith("note/pending"),
        (state) => {
          state.loadingNotes = true;
          state.noteError = false;
        }
      )

      .addMatcher(
        (action) => action.type.endsWith("note/fulfilled"),
        (state, action) => {
          if (action.payload.noteError) {
            state.noteError = true;
            state.loadingNotes = false;
          } else {
            state.noteError = false;
            state.response = action.payload;
            state.loadingNotes = false;
          }
        }
      )

      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state) => {
          state.response = false;
          state.loadingUser = false;
          state.loadingNotes = false;
          state.error = true;
          localStorage.removeItem("token");
        }
      );
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
