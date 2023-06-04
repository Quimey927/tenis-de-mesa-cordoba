import { Link } from 'react-router-dom';

import classes from './AdminTituloPagina.module.css';

const AdminTituloPagina = ({ titulo, to, textoInterno }) => {
  return (
    <div className={classes['titulo-pagina']}>
      <h1>{titulo}</h1>
      {(to || textoInterno) && (
        <Link to={to} className={classes.btn}>
          <span>{textoInterno}</span>
        </Link>
      )}
    </div>
  );
};

export default AdminTituloPagina;
