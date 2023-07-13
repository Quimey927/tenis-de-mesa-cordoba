import { useState } from 'react';

import Input from '../../UI/Input/Input';
import {
  crearPartidosDelGrupo,
  crearPartidosDelGrupoConFecha,
  crearSetsPartido,
} from '../../../api';
import classes from './CrearPartidos.module.css';

const CrearPartidos = ({
  filasTabla,
  dia,
  idGrupo,
  controladorRedireccionar,
}) => {
  const [orden, setOrden] = useState('');
  const [cantFechas, setCantFechas] = useState(1);

  const controladorCrearPartidos = async (evt) => {
    evt.preventDefault();

    const idJugadores = orden
      .split('-')
      .map((num) => filasTabla[num - 1].id_jugador);

    const datosPartidos = {
      idJugadores,
      dia,
    };

    const idPartidos = await crearPartidosDelGrupo(idGrupo, datosPartidos);

    for (let partido of idPartidos) {
      await crearSetsPartido(partido.id);
    }

    controladorRedireccionar();
  };

  const controladorCrearPartidosConFecha = async (evt) => {
    evt.preventDefault();

    const datosPartidos = {
      cantFechas,
      cantJugadores: filasTabla.length,
      dia,
    };

    const idPartidos = await crearPartidosDelGrupoConFecha(
      idGrupo,
      datosPartidos
    );

    for (let partido of idPartidos) {
      await crearSetsPartido(partido.id);
    }

    controladorRedireccionar();
  };

  return (
    <div className={classes.grilla}>
      <form onSubmit={controladorCrearPartidos}>
        <button className={classes.btn}>Crear partidos sin fechas</button>

        <Input
          placeholder="Orden..."
          required={true}
          value={orden}
          onChange={(evt) => setOrden(evt.target.value)}
        />
      </form>

      <form onSubmit={controladorCrearPartidosConFecha}>
        <button className={classes.btn}>Crear partidos con fechas</button>

        <Input
          type="number"
          placeholder="Cant. Fechas..."
          required={true}
          value={cantFechas}
          onChange={(evt) => setCantFechas(+evt.target.value)}
        />
      </form>
    </div>
  );
};

export default CrearPartidos;
