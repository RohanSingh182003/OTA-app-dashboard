const Reducer = (state, action) => {
  switch (action.type) {
    case "setAllProduct":
      return {
        allProducts: action.payload.allProducts,
        currentProduct: state.currentProduct,
        currentDevice: state.currentDevice,
        key: state.key,
      };
    case "setProduct":
      return {
        allProducts: state.allProducts,
        currentProduct: action.payload.user,
        currentDevice: state.currentDevice,
        key: state.key,
      };
    case "setDevice":
      return {
        allProducts: state.allProducts,
        currentProduct: state.currentProduct,
        currentDevice: action.payload.device,
        key: state.key,
      };
    case "setKey":
      return {
        allProducts: state.allProducts,
        currentProduct: state.currentProduct,
        currentDevice: state.currentDevice,
        key: Math.random(),
      };
    case "setInitialState":
        return {
          allProducts : [],
          currentProduct : {},
          currentDevice : '',
          key : 0
        };

    default:
      break;
  }
};

export default Reducer;
