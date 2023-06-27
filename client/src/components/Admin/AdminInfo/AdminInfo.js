import { Link } from 'react-router-dom';

import AdminTituloPagina from '../AdminTituloPagina/AdminTituloPagina';
import classes from './AdminInfo.module.css';

const AdminInfo = ({
  titulo,
  subtitulo = '',
  campos,
  imagen,
  to = '..',
  editarTo = 'editar',
}) => {
  return (
    <>
      <AdminTituloPagina titulo={titulo} subtitulo={subtitulo} />
      <div className={classes.info}>
        <div className={classes.columnas}>
          <div className={classes.campos}>
            {campos.map((campo) => (
              <p key={campo.nombre}>
                <small>{campo.nombre}: </small>
                {campo.valor ? campo.valor : 'No hay'}
              </p>
            ))}
          </div>
          {imagen && (
            <div>
              <small>Logo: </small>
              <img src={`/${imagen}`} alt={'Imagen del evento'} />
            </div>
          )}
        </div>
        <div className={classes.acciones}>
          <Link to={to} className={`${classes.btn} ${classes['btn-cancelar']}`}>
            <span>Atrás</span>
          </Link>
          <Link
            to={editarTo}
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
