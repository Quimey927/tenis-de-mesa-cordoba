import NavLinkCustomizado from './NavLinkCustomizado/NavLinkCustomizado';
import classes from './AdminNavbar.module.css';

const AdminNavbar = ({ navEncogido }) => {
  return (
    <nav className={`${classes.navbar} ${navEncogido ? 'nav-encogido' : ''}`}>
      <NavLinkCustomizado to="" textoInterno="Inicio" />
      <NavLinkCustomizado to="torneos" textoInterno="Torneos" />
      <NavLinkCustomizado to="fechas" textoInterno="Fechas" />
      <NavLinkCustomizado to="jugadores" textoInterno="Jugadores" />
      <NavLinkCustomizado to="clubes" textoInterno="Clubes" />
      <NavLinkCustomizado to="ciudades" textoInterno="Ciudades" />
    </nav>
  );
};

export default AdminNavbar;
