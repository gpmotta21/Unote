import { combineReducers } from "redux";

import { UserReducer } from "./Reducers/UserReducer";
import { AuthReducer } from "./Reducers/AuthReducer";

const combinedReducers = combineReducers({ UserReducer, AuthReducer });

export default combinedReducers;
