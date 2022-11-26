const Reducer = (state, action) => {
  switch (action.type) {
    case "setDevice":
      return action.payload.user
      break;

    default:
      break;
  }
};

export default Reducer;
