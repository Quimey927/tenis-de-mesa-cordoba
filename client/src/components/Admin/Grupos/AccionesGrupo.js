import { Link } from 'react-router-dom';

import classes from './AccionesGrupo.module.css';

const AccionesGrupo = ({ idGrupo, controladorBorrarElemento }) => {
  return (
    <>
      <div className={classes.acciones}>
        <Link to="editar" className={`${classes.btn} ${classes['btn-editar']}`}>
          <span>Editar Nombre del Grupo</span>
        </Link>
        <button
          className={`${classes.btn} ${classes['btn-editar']}`}
          onClick={controladorBorrarElemento.bind(null, idGrupo)}
        >
          Borrar Grupo
        </button>
      </div>
    </>
  );
};

export default AccionesGrupo;
