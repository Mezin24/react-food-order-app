import { useContext } from 'react';

import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal/Modal';
import CartItem from './CartItem';

import classes from './Cart.module.css';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const total = `$${cartCtx.totalAmount.toFixed(2)}`;

  const addItem = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const removeItem = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          {...item}
          onAdd={addItem.bind(null, item)}
          onRemove={removeItem.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const showOrderBtn = cartCtx.items.length > 0;

  return (
    <Modal onCloseChat={props.onCloseChat}>
      {cartItems}
      <div className={classes.total}>Total amount: {total}</div>
      <div className={classes.actions}>
        <button onClick={props.onCloseChat} className={classes['button--alt']}>
          Close
        </button>
        {showOrderBtn && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
