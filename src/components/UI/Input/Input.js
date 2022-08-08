import React from 'react';

import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.item.id}>{props.label}</label>
      <input {...props.item} ref={ref} />
    </div>
  );
});

export default Input;
