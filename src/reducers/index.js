import { combineReducers } from "redux";
import events from "./events";
import error from "./error";
import waiting from "./waiting";

export default combineReducers({ waiting,events, error });
