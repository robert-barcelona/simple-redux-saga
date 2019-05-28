import { combineReducers } from "redux";
import events from "./events";
import error from "./error";

export default combineReducers({ events, error });
