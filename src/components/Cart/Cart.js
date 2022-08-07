import classes from './Cart.module.css';
import Modal from '../UI/Modal/Modal';

const Cart = () => {
  const cartItems = (
    <ul className={classes['cart-items']}>
      {[{ id: 1, name: 'Sushi', amount: 2, price: 15 }].map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );

  return (
    <Modal>
      {cartItems}
      <div className={classes.total}>Total amount: 35.5</div>
      <div className={classes.actions}>
        <button className={classes['button--alt']}>Close</button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
