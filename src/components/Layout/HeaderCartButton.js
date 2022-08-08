import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';

import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [isBtnBump, setIsBtnBump] = useState(false);

  const btnClass = `${classes.button} ${isBtnBump ? classes.bump : ''}`;

  const { items } = cartCtx;

  useEffect(() => {
    setIsBtnBump(true);
    const timerId = setTimeout(() => {
      setIsBtnBump(false);
    }, 300);

    return () => clearInterval(timerId);
  }, [items]);

  const numberOfCartItems = cartCtx.items.reduce(
    (acc, cur) => acc + cur.amount,
    0
  );

  return (
    <button className={btnClass} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
