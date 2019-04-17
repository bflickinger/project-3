import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import flashMessages from "./flashMessages";
import gameReducer from "./gameReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  flashMessages: flashMessages,
  game: gameReducer
});
