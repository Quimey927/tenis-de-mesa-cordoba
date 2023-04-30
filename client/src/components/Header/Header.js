import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import Logo from './Logo/Logo';
import NavLinkItem from './NavLink/NavLink';
import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <nav>
        <NavLink to="/" className={classes.logo}>
          <Logo />
        </NavLink>

        <ul className={classes['nav-links']}>
          <NavLinkItem to="/" hasActiveLogic="true" innerText="Inicio" />
          <NavLinkItem
            to="/eventos"
            hasActiveLogic="true"
            innerText="Eventos"
          />
          <NavLinkItem
            to="/jugadores"
            hasActiveLogic="true"
            innerText="Jugadores"
          />
        </ul>
        <div className={classes['header__search']}>
          <label htmlFor="search">
            <FontAwesomeIcon icon={faSearch} color="white" />
          </label>
          <input type="text" id="search" placeholder="Buscar..." />
        </div>
      </nav>
    </header>
  );
};

export default Header;
