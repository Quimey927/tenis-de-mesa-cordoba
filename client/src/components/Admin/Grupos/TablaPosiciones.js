import {
  encontrarColorFila,
  obtenerColoresFila,
} from '../../../utils/funcionesColorFila';
import { editarFilaTabla } from '../../../api';
import { obtenerNombreCompleto } from '../../../utils/obtenerNombreCompleto';
import { datosTabla } from '../../../constants/datosTabla';
import classes from './TablaPosiciones.module.css';
import useGestionarEstadoFilas from '../../../hooks/useGestionarEstadoFilas';

const TablaPosiciones = ({
  filasTabla,
  coloresTabla,
  controladorRedireccionar,
}) => {
  const {
    filasEditandose,
    controladorEditarFilas,
    controladorCambiarValorFila,
  } = useGestionarEstadoFilas(
    filasTabla,
    editarFilaTabla,
    controladorRedireccionar
  );

  const coloresFila = obtenerColoresFila(coloresTabla);

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
                        : 'transparent',
                  }}
                >
                  <td style={{ width: '50px' }}>
                    {filasEditandose ? (
                      <input
                        name={`posicion-${fila.id}`}
                        defaultValue={fila.posicion}
                        className={classes['input-tabla-numero']}
                        onChange={controladorCambiarValorFila}
                      />
                    ) : (
                      fila.posicion
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
                      {filasEditandose ? (
                        <input
                          name={`${dato.codigo}-${fila.id}`}
                          defaultValue={fila[dato.codigo]}
                          className={classes['input-tabla-numero']}
                          onChange={controladorCambiarValorFila}
                        />
                      ) : (
                        fila[dato.codigo]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </form>

      <button
        type="button"
        className={classes['btn-editar']}
        onClick={controladorEditarFilas}
      >
        {filasEditandose ? (
          <span>Guardar Cambios</span>
        ) : (
          <span>Editar Tabla</span>
        )}
      </button>
    </>
  );
};

export default TablaPosiciones;
