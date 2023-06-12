import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

import { meses } from '../../../../../utils/funcionesSobreFechas';
import classes from './Fecha.module.css';

const Fecha = ({ fecha }) => {
  const {
    nombre_fecha,
    titulo_torneo,
    fecha_inicio,
    fecha_finalizacion,
    club,
    direccion,
    imagen_torneo,
    slug,
  } = fecha;

  const [, mes, diaInicio] = fecha_inicio.substring(0, 10).split('-');
  const [, , diaFin] = fecha_finalizacion.substring(0, 10).split('-');

  const diasFecha =
    diaFin !== diaInicio ? (
      <p>
        {+diaInicio} <span>y</span> {+diaFin}
      </p>
    ) : (
      <p>{+diaInicio}</p>
    );

  return (
    <li
      className={classes['fecha']}
      style={{
        backgroundImage: `${imagen_torneo}`,
      }}
    >
      <div className={classes['fecha__container']}>
        <div className={classes['calendario']}>
          <span className={classes['calendario__mes']}>{meses[mes - 1]}</span>
          <div className={classes['calendario__dias']}>{diasFecha}</div>
        </div>
        <div className={classes['descripcion']}>
          <p className={classes['descripcion__torneo']}>{titulo_torneo}</p>
          <p className={classes['descripcion__nombre']}>{nombre_fecha}</p>
          <div className={classes.btn}>
            <Link to={`/fechas/${slug}`}>Ver fecha</Link>
          </div>
        </div>
      </div>
      <div className={classes.lugar}>
        <div className={classes['lugar__info']}>
          {club ? (
            <>
              <p>{club}</p>
              <p>{direccion}</p>
            </>
          ) : (
            <p>Sin definir</p>
          )}
        </div>
        <FontAwesomeIcon
          icon={faLocationDot}
          className={classes['lugar__icono']}
        />
      </div>
    </li>
  );
};

export default Fecha;
