import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

import { capitalizar } from '../../../utils/capitalizar';
import classes from './AdminTablaPagina.module.css';

const AdminTablaPagina = ({
  array,
  controladorBorrarElemento,
  encabezadosColumnas,
}) => {
  return (
    <div className={classes['admin-tabla-pagina']}>
      <div className={classes.entradas}>
        <span>Cantidad de entradas: {array.length}</span>
        <div className={classes.buscar}>
          <input id="search" />
          <label htmlFor="search">Buscar</label>
        </div>
      </div>
      <table className={classes.tabla} role="table" border="1">
        <thead>
          <tr role="row">
            {encabezadosColumnas.map((encabezado) => (
              <th key={encabezado} role="columnheader">
                {capitalizar(encabezado)}
              </th>
            ))}
            <th role="columnheader">Editar</th>
            <th role="columnheader">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {array.map((elem) => (
            <tr key={elem.id} role="row">
              {encabezadosColumnas.map((encabezado) => (
                <td key={elem[encabezado]} role="cell" data-cell={encabezado}>
                  {elem[encabezado]}
                </td>
              ))}
              <td role="cell" data-cell="editar">
                <Link to={elem.id.toString()} className={classes['btn-editar']}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Link>
              </td>
              <td role="cell" data-cell="eliminar">
                <button
                  className={classes['btn-eliminar']}
                  onClick={controladorBorrarElemento.bind(null, elem.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTablaPagina;