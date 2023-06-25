import { useNavigate } from 'react-router-dom';

import { crearPartidosDelGrupo } from '../../../api';
import classes from './CrearPartidos.module.css';

const CrearPartidos = ({
  filasTabla,
  dia,
  idGrupo,
  idFecha,
  idCategoriaFecha,
  idFase,
}) => {
  const navigate = useNavigate();

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

    navigate(
      `/admin/fechas/${idFecha}/editar/categorias/${idCategoriaFecha}/fases/${idFase}`
    );
  };

  return (
    <button className={classes.btn} onClick={controladorCrearPartidos}>
      Crear Partidos
    </button>
  );
};

export default CrearPartidos;
