import HeaderCartButton from './HeaderCartButton';

import mainImg from '../../assets/img/meals.jpg';
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onChatOpen} />
      </header>
      <div className={classes['main-image']}>
        <img src={mainImg} alt='A table with delitios food' />
      </div>
    </>
  );
};

export default Header;
