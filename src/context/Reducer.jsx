const Reducer = (state, action) => {
  switch (action.type) {
    case "setProduct":
      return {
        currentProduct : action.payload.user,
        currentDevice : state.currentDevice,
        key : state.key
      }
    case "setDevice":
        return {
          currentProduct : state.currentProduct,
          currentDevice : action.payload.device,
          key : state.key
        }
    case "setKey":
      return {
        currentProduct : state.currentProduct,
        currentDevice : state.currentDevice,
        key : Math.random()
      }

    default:
      break;
  }
};

export default Reducer;
