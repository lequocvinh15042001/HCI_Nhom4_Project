export const getCart = (state) => state.cart;
export const getTotalProduct = (state) => state.cart.totalProduct;
export const getProductQuantity = (state) => state.cart.items.length;
export const stateCart = (state) => state.cart.isSuccess;
