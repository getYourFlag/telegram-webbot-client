import authReducer from "./auth";
import botReducer from "./bot";
import chatReducer from "./chat";
import messageReducer from "./message";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  authReducer,
  botReducer,
  chatReducer,
  messageReducer
});

export default allReducers;
