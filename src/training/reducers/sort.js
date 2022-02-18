var initialState = {
  //Create State

  sort: {
    by: "name",
    value: 1, // a-z
  },
};

var myReducer = (state = initialState, action) => {
  //Create Reducer

  if (action.type === "SORT") {
    var { by, value } = action.sort; //by = aciton.sort.by

    return { by, value };
  }

  return state;
};

export default myReducer;
