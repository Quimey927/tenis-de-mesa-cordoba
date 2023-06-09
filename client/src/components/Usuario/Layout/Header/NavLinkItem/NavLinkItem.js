import { NavLink } from 'react-router-dom';

import classes from './NavLinkItem.module.css';

const NavLinkItem = ({ to, textoInterno, className }) => {
  const navLinkClasses = ({ isActive }) =>
    isActive ? classes.activo : classes['no-activo'];

  return (
    <li className={`${classes['nav-link-item']} ${className}`}>
      <NavLink to={to} className={navLinkClasses}>
        {textoInterno}
      </NavLink>
    </li>
  );
};

export default NavLinkItem;
