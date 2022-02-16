import * as TYPES from "../actionTypes";
import * as API from "../apis";

export const CreateNote = (note, id) => async (dispatch) => {
  try {
    dispatch({ type: TYPES.LOADING_NOTES });
    const { data } = await API.CREATE_NOTE_URL(note, id);
    console.log(data);
    dispatch({ type: TYPES.CREATE_NOTE, payload: data });
  } catch (err) {
    await dispatch({ type: TYPES.FETCH_ACCOUNT_ERROR });
    localStorage.removeItem("token");
  }
};

export const EditNote = (noteId, edit) => async (dispatch) => {
  try {
    dispatch({ type: TYPES.LOADING_NOTES });
    const { data } = await API.EDIT_NOTE_URL(noteId, edit);
    dispatch({ type: TYPES.EDIT_NOTE, payload: data });
  } catch (err) {
    await dispatch({ type: TYPES.FETCH_ACCOUNT_ERROR });
    localStorage.removeItem("token");
  }
};

export const DeleteNote = (user, note) => async (dispatch) => {
  try {
    dispatch({ type: TYPES.LOADING_NOTES });
    const { data } = await API.DELETE_NOTE_URL(user, note);
    dispatch({ type: TYPES.DELETE_NOTE, payload: data });
  } catch (err) {
    await dispatch({ type: TYPES.FETCH_ACCOUNT_ERROR });
    localStorage.removeItem("token");
  }
};
