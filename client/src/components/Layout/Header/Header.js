import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import Logo from './Logo/Logo';
import NavLinkItem from './NavLinkItem/NavLinkItem';
import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <nav>
        <div className={classes.logo}>
          <Logo />
        </div>

        <ul className={classes['nav-links']}>
          <NavLinkItem to="/fechas" innerText="Fechas" />
          <NavLinkItem to="/torneos" innerText="Torneos" />
          <NavLinkItem to="/jugadores" innerText="Jugadores" />
        </ul>

        <div className={classes['header__search']}>
          <label htmlFor="search">
            <FontAwesomeIcon icon={faSearch} className={classes.icon} />
          </label>
          <input type="text" id="search" placeholder="Buscar..." />
        </div>
      </nav>
    </header>
  );
};

export default Header;
