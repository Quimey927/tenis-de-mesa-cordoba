import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import { obtenerArrayConDiasDelMes } from '../../../../utils/obtenerArrayConDiasDelMes';
import { meses } from '../../../../utils/funcionesSobreFechas';
import { capitalizar } from '../../../../utils/capitalizar';
import classes from './Calendario.module.css';

const Calendario = ({ año, mes, setAño, setMes, diasDeTorneo }) => {
  const arrayConDiasDelMes = obtenerArrayConDiasDelMes(año, mes);

  const fechaActual = new Date();
  const [diaActual, mesActual, añoActual] = [
    fechaActual.getDate(),
    fechaActual.getMonth(),
    fechaActual.getFullYear(),
  ];

  const esMesActual = año === añoActual && mes === mesActual;

  const cuerpoCalendario = arrayConDiasDelMes.map((dia) => {
    const diaDeTorneo = diasDeTorneo.find(
      (diaDeTorneo) => diaDeTorneo.dia === dia
    );

    return (
      <div
        key={dia}
        style={
          diasDeTorneo.find((diaDeTorneo) => diaDeTorneo.dia === dia)
            ? {
                backgroundColor: 'rgba(0,0,0,0.3)',
                border: '1px solid #333',
                borderLeftColor:
                  diaDeTorneo && diaDeTorneo.border === 'd'
                    ? 'transparent'
                    : '#333',
                borderRightColor:
                  diaDeTorneo && diaDeTorneo.border === 'i'
                    ? 'transparent'
                    : '#333',
              }
            : {}
        }
        className={
          dia === diaActual && esMesActual
            ? `${classes['dia-numero']} ${classes['es-fecha-actual']}`
            : classes['dia-numero']
        }
      >
        {dia > 0 && dia}
      </div>
    );
  });

  const controladorMesAnterior = () => {
    if (mes !== 0) {
      setMes((mesActual) => mesActual - 1);
    } else {
      setMes(11);
      setAño((añoActual) => añoActual - 1);
    }
  };

  const controladorMesSiguiente = () => {
    if (mes !== 11) {
      setMes((mesActual) => mesActual + 1);
    } else {
      setMes(0);
      setAño((añoActual) => añoActual + 1);
    }
  };

  return (
    <div className={classes.calendario}>
      <div className={classes['calendario__header']}>
        <button className={classes.btn} onClick={controladorMesAnterior}>
          <FontAwesomeIcon icon={faAngleLeft} size="xl" />
        </button>
        <div className={classes['mes-año']}>
          <span className={classes.mes}>{capitalizar(meses[mes])}</span>
          <span className={classes.año}>{año}</span>
        </div>
        <button className={classes.btn} onClick={controladorMesSiguiente}>
          <FontAwesomeIcon icon={faAngleRight} size="xl" />
        </button>
      </div>

      <div className={classes['calendario__cuerpo']}>
        <div className={classes['calendario__dia-semana']}>
          <div>Lun</div>
          <div>Mar</div>
          <div>Mié</div>
          <div>Jue</div>
          <div>Vie</div>
          <div>Sáb</div>
          <div>Dom</div>
        </div>
        <div className={classes['calendario__dias']}>{cuerpoCalendario}</div>
      </div>
    </div>
  );
};

export default Calendario;
