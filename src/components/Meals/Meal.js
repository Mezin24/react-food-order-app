import classes from './Meal.module.css';

const Meal = (props) => {
  return (
    <li className={classes.meal}>
      <h3>{props.name}</h3>
      <div className={classes.description}>{props.description}</div>
      <div className={classes.price}>€ {props.price}</div>
    </li>
  );
};

export default Meal;
