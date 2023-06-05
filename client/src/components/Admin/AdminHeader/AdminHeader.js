import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCaretDown, faBars } from '@fortawesome/free-solid-svg-icons';

import classes from './AdminHeader.module.css';

function AdminHeader() {
  const controladorCambiarEstadoNav = () => {
    const nav = document.getElementById('admin-navbar');
    nav.classList.toggle('nav-encogido');
  };

  return (
    <header className={classes.header}>
      <Link to={'/admin'} className={classes.brand}>
        <span>Admin Torneos Tenis de Mesa</span>
      </Link>

      <FontAwesomeIcon
        className={classes.bars}
        icon={faBars}
        onClick={controladorCambiarEstadoNav}
      />
      <button className={classes.usuario}>
        <FontAwesomeIcon className={classes.iconos} icon={faUser} size="sm" />{' '}
        Quimey Mata{' '}
        <FontAwesomeIcon
          className={classes.iconos}
          icon={faCaretDown}
          size="sm"
        />
      </button>
    </header>
  );
}

export default AdminHeader;
