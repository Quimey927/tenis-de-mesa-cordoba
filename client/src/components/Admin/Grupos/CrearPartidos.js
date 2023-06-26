import { crearPartidosDelGrupo } from '../../../api';
import classes from './CrearPartidos.module.css';

const CrearPartidos = ({
  filasTabla,
  dia,
  idGrupo,
  controladorRedireccionar,
}) => {
  const jugadores = [];

  for (let fila of filasTabla) {
    jugadores.push(fila.id_jugador);
  }

  const controladorCrearPartidos = () => {
    const datosPartidos = {
      dia,
      jugadores,
    };

    crearPartidosDelGrupo(idGrupo, datosPartidos);
    controladorRedireccionar();
  };

  return (
    <button className={classes.btn} onClick={controladorCrearPartidos}>
      Crear Partidos
    </button>
  );
};

export default CrearPartidos;
