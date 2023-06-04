import NavLinkCustomizado from './NavLinkCustomizado/NavLinkCustomizado';
import useObtenerAnchoVentana from '../../../hooks/useObtenerAnchoVentana';
import classes from './AdminNavbar.module.css';

const AdminNavbar = () => {
  const anchoVentana = useObtenerAnchoVentana();

  return (
    <nav
      className={`${classes.navbar} ${
        anchoVentana <= 768 ? 'nav-encogido' : ''
      }`}
    >
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
