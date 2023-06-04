import { NavLink } from 'react-router-dom';

import classes from './NavLinkCustomizado.module.css';

const NavLinkCustomizado = ({ to, textoInterno, onClick }) => {
  return (
    <NavLink
      to={`/admin/${to}`}
      className={({ isActive }) =>
        isActive
          ? `${classes.activo} ${classes['nav-link']}`
          : `${classes['no-activo']} ${classes['nav-link']}`
      }
      onClick={onClick}
    >
      {textoInterno}
    </NavLink>
  );
};

export default NavLinkCustomizado;
