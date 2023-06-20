import { Link } from 'react-router-dom';

import classes from './AccionesGrupo.module.css';

const AccionesGrupo = ({ grupo_id, controladorBorrarElemento }) => {
  return (
    <>
      <div className={classes.acciones}>
        <Link
          to={`grupos/${grupo_id}/editar`}
          className={`${classes.btn} ${classes['btn-editar']}`}
        >
          <span>Editar Nombre del Grupo</span>
        </Link>
        <button
          className={`${classes.btn} ${classes['btn-editar']}`}
          onClick={controladorBorrarElemento.bind(null, grupo_id)}
        >
          Borrar Grupo
        </button>
      </div>
    </>
  );
};

export default AccionesGrupo;
