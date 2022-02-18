import { createStore } from "redux";
import { status, sort } from "./actions/index";
import myReducer from "./reducers/index";

const store = createStore(myReducer); //Create Store
console.log(store.getState());
//Thay đổi Status
//var action ={type:'TOGGLE_STATUS'}  //Create Action ; cái biến action trên myReducer là của thằng action này truyền lên
//store.dispatch(action);   // Đem Action vào trong store thông qua hàm dispacth
store.dispatch(status()); // Goị hàm status() từ index.js

console.log(store.getState());

store.dispatch(
  sort({
    by: "name",
    value: -1,
  })
); // Đem Action vào trong store thông qua hàm dispacth
console.log(store.getState());
