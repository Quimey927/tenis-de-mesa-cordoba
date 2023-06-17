import { Link } from 'react-router-dom';

import classes from './AdminTituloPagina.module.css';

const AdminTituloPagina = ({
  titulo,
  to,
  textoInterno,
  state = null,
  subtitulo = '',
}) => {
  return (
    <div className={classes['titulo-pagina']}>
      <div>
        <h1>{titulo}</h1>
        {subtitulo !== '' && <h2>{subtitulo}</h2>}
      </div>
      {(to || textoInterno) && (
        <Link to={to} className={classes.btn} state={state}>
          <span>{textoInterno}</span>
        </Link>
      )}
    </div>
  );
};

export default AdminTituloPagina;
