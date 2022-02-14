import * as TYPES from "../actionTypes";

const validation = { userError: false, passwordError: false, loadingAuth: false };

export const AuthReducer = (auth = validation, action) => {
  switch (action.type) {
    case TYPES.LOGIN:
      return {
        ...auth,
        userError: action.payload.userError,
        passwordError: action.payload.passwordError,
        loadingAuth: false,
      };
    case TYPES.LOADING_AUTH:
      return { ...auth, loadingAuth: true };

    default:
      return validation;
  }
};
