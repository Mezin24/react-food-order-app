import classes from './Confirm.module.css';
import { useRef, useState } from 'react';

const isEmpty = (val) => val.trim() === '';
const isFiveChar = (val) => val.trim().length === 5;

const Confirm = (props) => {
  const [isFormValid, setIsFormValid] = useState({
    nameInput: true,
    streetInput: true,
    codeInput: true,
    cityInput: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const codeInputRef = useRef();
  const cityInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const name = nameInputRef.current.value;
    const street = streetInputRef.current.value;
    const code = codeInputRef.current.value;
    const city = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(name);
    const enteredStreetIsValid = !isEmpty(street);
    const enteredCodeIsValid = isFiveChar(code);
    const enteredCityIsValid = !isEmpty(city);

    setIsFormValid({
      nameInput: enteredNameIsValid,
      streetInput: enteredStreetIsValid,
      codeInput: enteredCodeIsValid,
      cityInput: enteredCityIsValid,
    });

    const formIsValid =
      enteredCityIsValid &&
      enteredStreetIsValid &&
      enteredCodeIsValid &&
      enteredCodeIsValid;

    if (!formIsValid) return;

    props.onConfirm({
      name,
      street,
      code,
      city,
    });
  };

  const nameControlClasses = `${classes.control} ${
    isFormValid.nameInput ? '' : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    isFormValid.streetInput ? '' : classes.invalid
  }`;
  const codeControlClasses = `${classes.control} ${
    isFormValid.codeInput ? '' : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    isFormValid.cityInput ? '' : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' name='name' id='name' ref={nameInputRef} />
        {!isFormValid.nameInput && <p>Please enter a valid name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' name='street' id='street' ref={streetInputRef} />
        {!isFormValid.streetInput && <p>Please enter a valid street</p>}
      </div>
      <div className={codeControlClasses}>
        <label htmlFor='code'>Postal Code</label>
        <input type='text' name='code' id='code' ref={codeInputRef} />
        {!isFormValid.codeInput && (
          <p>Please enter a valid code (5 characters long)</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' name='city' id='city' ref={cityInputRef} />
        {!isFormValid.cityInput && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onClick}>
          Cancel
        </button>
        <button type='submit' className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Confirm;
