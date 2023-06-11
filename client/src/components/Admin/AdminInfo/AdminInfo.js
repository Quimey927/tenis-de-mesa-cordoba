import { Link } from 'react-router-dom';

import AdminTituloPagina from '../AdminTituloPagina/AdminTituloPagina';
import classes from './AdminInfo.module.css';

const AdminInfo = ({ titulo, campos, imagen }) => {
  return (
    <>
      <AdminTituloPagina titulo={titulo} />
      <div className={classes.info}>
        <div className={classes.columnas}>
          <div>
            {campos.map((campo) => (
              <p key={campo.nombre}>
                <small>{campo.nombre}: </small>
                {campo.valor ? campo.valor : 'No hay'}
              </p>
            ))}
          </div>
          {imagen && <img src={`/${imagen}`} alt={'Imagen del evento'} />}
        </div>
        <div className={classes.acciones}>
          <Link
            to={'..'}
            className={`${classes.btn} ${classes['btn-cancelar']}`}
          >
            <span>Atrás</span>
          </Link>
          <Link
            to={'editar'}
            className={`${classes.btn} ${classes['btn-editar']}`}
          >
            <span>Editar Información</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminInfo;
