import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

import { capitalizar } from '../../../utils/capitalizar';
import classes from './AdminTablaPagina.module.css';

const AdminTablaPagina = ({
  array,
  controladorBorrarElemento,
  encabezadosColumnas,
  mostrarCantidadEntradasYFiltro,
  prefijoLinkEditar = '',
}) => {
  const [arrayFiltrado, setArrayFiltrado] = useState(array);
  const [filtro, setFiltro] = useState('');

  const controladorCambiarFiltro = (evt) => setFiltro(evt.target.value);

  useEffect(() => {
    if (filtro.trim() === '') setArrayFiltrado(array);

    const nuevoArray = array.filter((elem) => {
      let elemEsFiltrado = false;
      for (let columna of encabezadosColumnas) {
        if (
          elem[columna].toString().toLowerCase().includes(filtro.toLowerCase())
        )
          elemEsFiltrado = true;
      }
      return elemEsFiltrado;
    });

    setArrayFiltrado(nuevoArray);
  }, [filtro, array, encabezadosColumnas]);

  return (
    <div className={classes['admin-tabla-pagina']}>
      {mostrarCantidadEntradasYFiltro && (
        <div className={classes.entradas}>
          <span>Total de entradas: {array.length}</span>
          <div className={classes.buscar}>
            <input id="search" onChange={controladorCambiarFiltro} />
            <label htmlFor="search">Buscar</label>
          </div>
        </div>
      )}
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
          {arrayFiltrado.map((elem) => (
            <tr key={elem.id} role="row">
              {encabezadosColumnas.map((encabezado) => (
                <td key={elem[encabezado]} role="cell" data-cell={encabezado}>
                  {elem[encabezado]}
                </td>
              ))}
              <td role="cell" data-cell="editar">
                <Link
                  to={`${prefijoLinkEditar}${elem.id.toString()}`}
                  className={classes['btn-editar']}
                >
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
