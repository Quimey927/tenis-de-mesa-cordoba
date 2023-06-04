import { useState } from 'react';

import Calendario from './Calendario/Calendario';
import ListaFechas from './ListaFechas/ListaFechas';
import useObtenerFechasDelMes from '../../../hooks/useObtenerFechasDelMes';
import { obtenerDiasDeTorneo } from '../../../utils/obtenerDiasDeTorneo';
import classes from './Fechas.module.css';

const Fechas = ({ fechasDelMesActual, diasActualesDeTorneo }) => {
  const [año, setAño] = useState(new Date().getFullYear());
  const [mes, setMes] = useState(new Date().getMonth());
  const [diasDeTorneo, setDiasDeTorneo] = useState(diasActualesDeTorneo);
  const [fechasDelMes, setFechasDelMes] = useState(fechasDelMesActual);

  const mesFormateado = (mes + 1).toString().padStart(2, '0'); // en el caso de marzo, transforma 2 to 03

  const guardarEnEstado = (fechas) => {
    setFechasDelMes(fechas);
    setDiasDeTorneo(obtenerDiasDeTorneo(fechas));
  };

  useObtenerFechasDelMes(mesFormateado, año, guardarEnEstado);

  return (
    <section className={classes['fechas-del-mes']}>
      <div className={classes['fechas-del-mes__container']}>
        <Calendario
          año={año}
          mes={mes}
          setAño={setAño}
          setMes={setMes}
          className={classes.calendario}
          diasDeTorneo={diasDeTorneo}
        />
        <ListaFechas fechasDelMes={fechasDelMes} />
      </div>
    </section>
  );
};

export default Fechas;
