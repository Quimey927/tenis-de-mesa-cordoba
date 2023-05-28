import { NavLink } from 'react-router-dom';

import classes from './AdminHeader.module.css';

function AdminHeader() {
  return (
    <header>
      <nav className={classes.navbar}>
        <span>Admin Torneos Tenis de Mesa</span>
        <div className={classes['nav-links']}>
          <NavLink
            to="/admin/torneos"
            className={({ isActive }) =>
              isActive ? classes.active : classes['not-active']
            }
          >
            Torneos
          </NavLink>
          <NavLink
            to="/admin/rondas"
            className={({ isActive }) =>
              isActive ? classes.active : classes['not-active']
            }
          >
            Rondas
          </NavLink>
          <NavLink
            to="/admin/jugadores"
            className={({ isActive }) =>
              isActive ? classes.active : classes['not-active']
            }
          >
            Jugadores
          </NavLink>
        </div>
        <span>Quimey</span>
      </nav>
    </header>
  );
}

export default AdminHeader;
