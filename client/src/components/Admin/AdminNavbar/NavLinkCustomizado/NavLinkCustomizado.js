import { NavLink } from 'react-router-dom';

import classes from './NavLinkCustomizado.module.css';

const NavLinkCustomizado = ({ to, textoInterno, navEncogido }) => {
  const controladorEncogerNavbar = () => {
    if (!navEncogido) return;
    const nav = document.querySelector('nav');
    nav.classList.add('nav-encogido');
  };

  return (
    <NavLink
      to={`/admin/${to}`}
      className={({ isActive }) =>
        isActive
          ? `${classes.activo} ${classes['nav-link']}`
          : `${classes['no-activo']} ${classes['nav-link']}`
      }
      onClick={controladorEncogerNavbar}
    >
      {textoInterno}
    </NavLink>
  );
};

export default NavLinkCustomizado;
