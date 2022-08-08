import { useState, useRef } from 'react';

import Input from '../../UI/Input/Input';

import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const [isAmountValid, setIsAmountValid] = useState(true);
  const amountRef = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const itemAmount = amountRef.current.value;
    const itemAmountNumber = +itemAmount;

    if (
      itemAmount.trim() === '' ||
      itemAmountNumber < 1 ||
      itemAmountNumber > 5
    ) {
      setIsAmountValid(false);
      return;
    }

    props.onAddToCart(itemAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <Input
        ref={amountRef}
        label='Amount'
        item={{
          id: `amount${props.id}`,
          type: 'number',
          min: 1,
          max: 5,
          step: 1,
          defaultValue: 1,
        }}
      />
      <button>+ Add</button>
      {!isAmountValid && <p>Please, enter amount between 1 and 5</p>}
    </form>
  );
};

export default MealItemForm;
