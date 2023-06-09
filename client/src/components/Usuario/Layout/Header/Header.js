import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import Logo from './Logo/Logo';
import NavLinkItem from './NavLinkItem/NavLinkItem';
import classes from './Header.module.css';

const Header = ({ streamActivo }) => {
  return (
    <header className={classes.header}>
      <nav>
        <div className={classes.logo}>
          <Logo />
        </div>

        <ul className={classes['nav-links']}>
          <NavLinkItem to="/fechas" textoInterno="Fechas" />
          <NavLinkItem to="/torneos" textoInterno="Torneos" />
          <NavLinkItem to="/jugadores" textoInterno="Jugadores" />
          {streamActivo.length > 0 && (
            <NavLinkItem
              className={classes.vivo}
              to="/vivo"
              textoInterno="Vivo"
            />
          )}
        </ul>

        <div className={classes['header__buscar']}>
          <label htmlFor="buscar">
            <FontAwesomeIcon icon={faSearch} className={classes.icono} />
          </label>
          <input type="text" id="buscar" placeholder="Buscar..." />
        </div>
      </nav>
    </header>
  );
};

export default Header;
