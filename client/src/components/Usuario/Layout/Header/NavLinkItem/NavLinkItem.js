import { NavLink } from 'react-router-dom';

import classes from './NavLinkItem.module.css';

const NavLinkItem = ({ to, textoInterno }) => {
  const navLinkClasses = ({ isActive }) =>
    isActive ? classes.activo : classes['no-activo'];

  return (
    <li className={classes['nav-link-item']}>
      <NavLink to={to} className={navLinkClasses}>
        {textoInterno}
      </NavLink>
    </li>
  );
};

export default NavLinkItem;
