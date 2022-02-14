import * as TYPES from "../actionTypes";
import * as API from "../apis";

export const SetPage = (page) => async (dispatch) => {
  dispatch({ type: TYPES.SET_PAGE, payload: page });
};

export const FetchAll = (token) => async (dispatch) => {
  dispatch({ type: TYPES.SET_PAGE, payload: "User" });
  dispatch({ type: TYPES.LOADING_ACCOUNT });
  dispatch({ type: TYPES.LOADING_NOTES });

  try {
    const { data } = await API.FETCH_ACCOUNT_URL(token);

    dispatch({ type: TYPES.FETCH_ACCOUNT_SUCESS, payload: data });
  } catch (err) {
    await dispatch({ type: TYPES.FETCH_ACCOUNT_ERROR });
    localStorage.removeItem("token");
  }
};

export const LogoutUser = () => async (dispatch) => {
  await dispatch({ type: TYPES.LOGOUT });
  await dispatch({ type: TYPES.LOADING_ACCOUNT });
  localStorage.removeItem("token");
};

export const DeleteAccount = (id) => async (dispatch) => {
  try {
    const { data } = await API.DELETE_ACCOUNT_URL(id);
    await dispatch({ type: TYPES.DELETE_ACCOUNT });
    dispatch({ type: TYPES.LOADING_ACCOUNT });
    localStorage.removeItem("token");
  } catch (err) {
    await dispatch({ type: TYPES.FETCH_ACCOUNT_ERROR });
    localStorage.removeItem("token");
  }
};
