import { useState } from 'react';

import Button from '../../UI/Button/Button';
import {
  obtenerColoresFila,
  encontrarColorFila,
} from '../../../utils/funcionesColorFila';
import { obtenerNombreCompleto } from '../../../utils/obtenerNombreCompleto';
import classes from './TablaPosiciones.module.css';

const TablaPosiciones = ({ filasTabla, coloresTabla }) => {
  const [tablaEditandose, setTablaEditandose] = useState(false);

  const controladorAlternarEditarTabla = () =>
    setTablaEditandose((estadoAnterior) => !estadoAnterior);

  const coloresFila = obtenerColoresFila(coloresTabla);

  const datosTabla = [
    {
      dato: 'Partidos Jugados',
      codigo: 'pj',
    },
    {
      dato: 'Partidos Ganados',
      codigo: 'pg',
    },
    {
      dato: 'Partidos Perdidos',
      codigo: 'pp',
    },
    {
      dato: 'Sets a Favor',
      codigo: 'sf',
    },
    {
      dato: 'Sets en Contra',
      codigo: 'sc',
    },
    {
      dato: 'Puntos a Favor',
      codigo: 'pf',
    },
    {
      dato: 'Puntos en Contra',
      codigo: 'pc',
    },
  ];

  return (
    <>
      <form className={classes.form}>
        <table className={classes.tabla} style={{ width: '100%' }}>
          <thead>
            <tr className={classes.row}>
              <th style={{ width: '50px' }}>Pos.</th>
              <th className={classes['celda-ancha']}>Jugador</th>
              {datosTabla.map((dato) => (
                <th key={dato.codigo} style={{ width: '50px' }}>
                  {dato.codigo.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filasTabla.length > 0 &&
              filasTabla.map((fila) => (
                <tr
                  key={fila.id}
                  className={classes.row}
                  style={{
                    backgroundColor:
                      encontrarColorFila(coloresFila, fila.posicion) !== 'none'
                        ? `var(--color-${encontrarColorFila(
                            coloresFila,
                            fila.posicion
                          )}`
                        : 'none',
                  }}
                >
                  <td style={{ width: '50px' }}>
                    {!tablaEditandose ? (
                      fila.posicion
                    ) : (
                      <input
                        defaultValue={fila.posicion}
                        className={classes['input-tabla-numero']}
                      />
                    )}
                  </td>
                  <td key={fila.id} className={classes['celda-ancha']}>
                    {obtenerNombreCompleto(
                      fila.nombre,
                      fila.segundo_nombre,
                      fila.apellido,
                      fila.segundo_apellido
                    )}
                  </td>
                  {datosTabla.map((dato, i) => (
                    <td key={i} style={{ width: '50px' }}>
                      {!tablaEditandose ? (
                        fila[dato.codigo]
                      ) : (
                        <input
                          defaultValue={fila[dato.codigo]}
                          className={classes['input-tabla-numero']}
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
        <div className={classes['flex-container']}>
          <div>
            {coloresTabla.map((color) => (
              <div className={classes.color} key={color.id}>
                <div
                  className={classes.box}
                  style={{
                    backgroundColor: `var(--color-${color.color})` || 'red',
                  }}
                ></div>
                <div>{color.nota}</div>
              </div>
            ))}
          </div>
          <Button
            onClick={controladorAlternarEditarTabla}
            className={classes.btn}
          >
            {!tablaEditandose ? 'Editar' : 'Guardar'}
          </Button>
        </div>
      </form>
    </>
  );
};

export default TablaPosiciones;
