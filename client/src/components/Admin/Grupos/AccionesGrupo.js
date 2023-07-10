import { Link } from 'react-router-dom';

import classes from './AccionesGrupo.module.css';

const AccionesGrupo = ({ idGrupo, controladorBorrarElemento }) => {
  return (
    <>
      <div className={classes.acciones}>
        <Link to="editar" className={`${classes.btn} ${classes['btn-editar']}`}>
          <span>Editar Grupo</span>
        </Link>
        <Link to="nuevo" className={`${classes.btn} ${classes['btn-agregar']}`}>
          <span>Agregar Grupo</span>
        </Link>
        <button
          className={`${classes.btn} ${classes['btn-eliminar']}`}
          onClick={controladorBorrarElemento.bind(null, idGrupo)}
        >
          Borrar Grupo
        </button>
      </div>
    </>
  );
};

export default AccionesGrupo;
