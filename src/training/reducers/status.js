var initialState = false; // status = false

var myReducer = (state = initialState, action) => {
  //Create Reducer
  if (action.type === "TOGGLE_STATUS") {
    //check type action
    state = !state; //Set state
    return state;
  }

  return state;
};

export default myReducer;
