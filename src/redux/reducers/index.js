import { combineReducers } from "redux";
import usersReducers from "./usersReducer";

const rootReducer = combineReducers({
    usersList: usersReducers
});

export default rootReducer;