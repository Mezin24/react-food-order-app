import { useState, useContext } from 'react';

import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal/Modal';
import CartItem from './CartItem';
import Confirm from './Confirm';

import classes from './Cart.module.css';

const Cart = (props) => {
  const [ordered, setOrdered] = useState(false);
  const [sending, setSending] = useState(false);
  const [didSend, setDidSend] = useState(false);
  const cartCtx = useContext(CartContext);

  const total = `$${cartCtx.totalAmount.toFixed(2)}`;

  const addItem = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const removeItem = (id) => {
    cartCtx.removeItem(id);
  };

  const submitOrderHandler = async (userData) => {
    setSending(true);
    await fetch(
      'https://react-http-65b90-default-rtdb.firebaseio.com/order.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderItems: cartCtx.items,
        }),
      }
    );

    setSending(false);
    setDidSend(true);
    cartCtx.clearItems();
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

  const orderHandler = () => setOrdered(true);

  const actionContent = !ordered && (
    <div className={classes.actions}>
      <button onClick={props.onCloseChat} className={classes['button--alt']}>
        Close
      </button>
      {showOrderBtn && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const orderContent = (
    <>
      {cartItems}
      <div className={classes.total}>Total amount: {total}</div>
      {ordered && (
        <Confirm onClick={props.onCloseChat} onConfirm={submitOrderHandler} />
      )}
      {actionContent}
    </>
  );

  const sendinContent = <p>Sending...</p>;

  const completeContent = (
    <>
      <p>Order complete! We'll call you soon!</p>
      <div className={classes.actions}>
        <button onClick={props.onCloseChat} className={classes['button--alt']}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onCloseChat={props.onCloseChat}>
      {sending && !didSend && sendinContent}
      {didSend && completeContent}
      {!sending && !didSend && orderContent}
    </Modal>
  );
};

export default Cart;
