const initialState = {
  data: [],
  Category: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "GETDATA":
      return { ...state, data: action.payload };
    case "SETDATA":
      return { ...state, data: action.payload };
    default:
      return state;
  }
}
