import { Link } from 'react-router-dom';

import classes from './AccionesEliminatoria.module.css';
const AccionesEliminatoria = ({ eliminatoria }) => {
  return (
    <>
      <div className={classes.acciones}>
        <div>
          <p>
            <b>Descripción:</b>{' '}
            {eliminatoria[0].descripcion
              ? eliminatoria[0].descripcion
              : 'Sin descripción...'}
          </p>
        </div>
        <Link to="editar" className={`${classes.btn} ${classes['btn-editar']}`}>
          <span>Editar Descripción</span>
        </Link>
      </div>
    </>
  );
};

export default AccionesEliminatoria;
