import classes from './Input.module.css';

const Input = (props) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.item.id}>{props.label}</label>
      <input {...props.item} />
    </div>
  );
};

export default Input;
