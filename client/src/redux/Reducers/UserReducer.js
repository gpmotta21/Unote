import * as TYPES from "../actionTypes";

const initialState = {
  user: false,
  notes: [],
  error: false,
  loadingAccount: false,
  loadingNotes: false,
  page: false,
};

export const UserReducer = (user = initialState, action) => {
  switch (action.type) {
    case TYPES.LOADING_ACCOUNT:
      return { ...user, user: false, notes: [], error: false, loadingAccount: true };

    case TYPES.LOADING_NOTES:
      return { ...user, error: false, loadingNotes: true };

    case TYPES.FETCH_ACCOUNT_SUCESS:
      return {
        ...user,
        user: action.payload,
        notes: action.payload.notes,
        error: false,
        loadingAccount: false,
        loadingNotes: false,
      };
    case TYPES.FETCH_ACCOUNT_ERROR:
      return {
        ...user,
        user: false,
        notes: [],
        error: true,
        loadingAccount: false,
      };
    case TYPES.SET_PAGE:
      return { ...user, page: action.payload, loadingAccount: false };
    case TYPES.CREATE_NOTE:
      return { ...user, notes: action.payload, loadingNotes: false };
    case TYPES.EDIT_NOTE:
      return { ...user, notes: action.payload, loadingNotes: false };
    case TYPES.DELETE_NOTE:
      return { ...user, notes: action.payload, loadingNotes: false };
    case TYPES.LOGOUT:
      return initialState;
    default:
      return user;
  }
};
