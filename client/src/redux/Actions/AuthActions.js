import * as TYPES from "../actionTypes";
import * as API from "../apis";

export const AuthAction = (user, navigate) => async (dispatch) => {
  dispatch({ type: TYPES.LOADING_AUTH });

  const { data } = await API.LOGIN_URL(user);

  dispatch({ type: TYPES.LOGIN, payload: data });

  if (data.auth) {
    // The logout dispatch will remove previous users
    await dispatch({ type: TYPES.LOGOUT });

    await dispatch({ type: TYPES.LOADING_ACCOUNT });
    localStorage.setItem("token", data.auth);
    navigate("/userarea");
    dispatch({ type: TYPES.LOGIN, payload: data });
  }
};
