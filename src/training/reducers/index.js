import status from "./status";   //reducer status
import sort from "./sort";   // reducer sort

import { combineReducers } from "redux";   //Combine (Gộp) status , sort 

const myReducer = combineReducers({
    status,     //status = status
    sort
})
export default myReducer;
