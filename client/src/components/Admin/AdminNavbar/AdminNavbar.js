import NavLinkCustomizado from './NavLinkCustomizado/NavLinkCustomizado';
import classes from './AdminNavbar.module.css';

const AdminNavbar = ({ navEncogido }) => {
  return (
    <nav
      id="admin-navbar"
      className={`${classes.navbar} ${navEncogido ? 'nav-encogido' : ''}`}
    >
      <NavLinkCustomizado
        to=""
        textoInterno="Inicio"
        navEncogido={navEncogido}
      />
      <NavLinkCustomizado
        to="torneos"
        textoInterno="Torneos"
        navEncogido={navEncogido}
      />
      <NavLinkCustomizado
        to="fechas"
        textoInterno="Fechas"
        navEncogido={navEncogido}
      />
      <NavLinkCustomizado
        to="jugadores"
        textoInterno="Jugadores"
        navEncogido={navEncogido}
      />
      <NavLinkCustomizado
        to="clubes"
        textoInterno="Clubes"
        navEncogido={navEncogido}
      />
      <NavLinkCustomizado
        to="ciudades"
        textoInterno="Ciudades"
        navEncogido={navEncogido}
      />
    </nav>
  );
};

export default AdminNavbar;
