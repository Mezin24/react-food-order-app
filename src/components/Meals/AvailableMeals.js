import { useState, useEffect } from 'react';

import MealItem from './MealItem/MealItem';
import Card from '../UI/Card/Card';

import classes from './AvailableMeals.module.css';

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLodaing, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          'https://react-http-65b90-default-rtdb.firebaseio.com/meals.json'
        );
        const data = await res.json();

        const mealArr = [];

        for (let [key, value] of Object.entries(data)) {
          const meal = {
            id: key,
            name: value.name,
            description: value.description,
            price: value.price,
          };
          mealArr.push(meal);
        }

        setMeals(mealArr);
      } catch (err) {
        setHttpError(err.message);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLodaing) {
    return (
      <section>
        <p className={classes['loading-msg']}>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section>
        <p className={classes['loading-msg']}>
          Sorry, something went wrong. {httpError}
        </p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => <MealItem key={meal.id} {...meal} />);
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
