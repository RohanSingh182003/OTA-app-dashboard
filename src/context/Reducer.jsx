const Reducer = (state, action) => {
  switch (action.type) {
    case "setProduct":
      return {
        currentProduct : action.payload.user,
        currentDevice : state.currentDevice
      }
      break;
    case "setDevice":
        return {
          currentProduct : state.currentProduct,
          currentDevice : action.payload.device
        }
        break;

    default:
      break;
  }
};

export default Reducer;
