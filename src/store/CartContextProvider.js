import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReduser = (state, action) => {
  if (action.type === 'ADD') {
    const updatedItems = [...state.items, action.item];
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCartState;
};

const CartContextProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(
    cartReduser,
    defaultCartState
  );

  const addItemToCartContext = (item) => {
    dispatchCartState({ type: 'ADD', item });
  };

  const removeItemFromCartContext = (id) => {};

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartContext,
    removeItem: removeItemFromCartContext,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
