import {combineReducers} from "redux";

import client from "./clientAccountReducer";
import supporter from "./supportAccountReducer";
import admin from "./adminAccountReducer";

export default combineReducers({client, supporter, admin});
