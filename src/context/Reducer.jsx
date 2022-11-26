const Reducer = (state, action) => {
  switch (action.type) {
    case "setDevice":
      return {
        currentProduct : action.payload.user,
        currentDevice : state.currentDevice
      }
      break;

    default:
      break;
  }
};

export default Reducer;
