import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReduser = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingItem = state.items.find((item) => item.id === action.item.id);
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    let updatedItem;
    let updatedItems;

    if (existingItem) {
      updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = [...state.items, action.item];
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === 'REMOVE') {
    const existingItem = state.items.find((item) => item.id === action.id);
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItem;
    let updatedItems;

    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      updatedItem = {
        ...state.items[existingItemIndex],
        amount: existingItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === 'CLEAR') {
    return defaultCartState;
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

  const removeItemFromCartContext = (id) => {
    dispatchCartState({ type: 'REMOVE', id: id });
  };

  const cleatItemsHandler = () => {
    dispatchCartState({ type: 'CLEAR' });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartContext,
    removeItem: removeItemFromCartContext,
    clearItems: cleatItemsHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
