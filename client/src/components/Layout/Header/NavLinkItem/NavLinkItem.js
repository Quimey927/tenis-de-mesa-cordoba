import { NavLink } from 'react-router-dom';

import classes from './NavLinkItem.module.css';

const NavLinkItem = ({ to, innerText }) => {
  const navLinkClasses = ({ isActive }) =>
    isActive ? classes.active : classes['not-active'];

  return (
    <li className={classes['nav-link-item']}>
      <NavLink to={to} className={navLinkClasses}>
        {innerText}
      </NavLink>
    </li>
  );
};

export default NavLinkItem;
