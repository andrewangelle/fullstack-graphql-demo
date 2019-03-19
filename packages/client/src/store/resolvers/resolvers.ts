import {
  addCartItemResolver as addCartItem,
  clearCartResolver as clearCart,
  loginUserResolver as loginUser,
  logoutUserResolver as logoutUser,
  removeCartItemResolver as removeCartItem,
  updateCartItemResolver as updateCartItemQuantity,
} from 'store/resolvers';

export const resolvers = {
  Mutation: {
    addCartItem,
    clearCart,
    loginUser,
    logoutUser,
    removeCartItem,
    updateCartItemQuantity,
  }
}