import { NavLink } from 'react-router-dom';

import classes from './NavLink.module.css';

const NavLinkItem = ({ to, hasActiveLogic, innerText }) => {
  const navLinkClasses = hasActiveLogic
    ? ({ isActive }) => (isActive ? classes.active : classes['not-active'])
    : '';

  return (
    <li className={classes['nav-link-item']}>
      <NavLink to={to} className={navLinkClasses}>
        {innerText}
      </NavLink>
    </li>
  );
};

export default NavLinkItem;
