import { combineReducers } from "redux";
import authReducer from "./auth";
import usersReducer from "./users";
import questionsReducer from "./questions";
import currentUserReducer from "./currentUser";

export default combineReducers({
  authReducer,
  usersReducer,
  questionsReducer,
  currentUserReducer,
});
