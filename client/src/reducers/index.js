import {combineReducers} from "redux";

import client from "./clientAccountReducer";
import supporter from "./supportAccountReducer";

export default combineReducers({client, supporter});
