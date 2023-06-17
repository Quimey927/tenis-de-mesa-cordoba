import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import classes from './PartidosDelGrupo.module.css';

const PartidosDelGrupo = ({ partidosDelGrupo, nombre_grupo }) => {
  return (
    <div className={classes.partidos}>
      <h3>{nombre_grupo}</h3>
      <table className={classes.table} style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Jugador 1</th>
            <th style={{ width: '110px' }}>vs.</th>
            <th>Jugador 2</th>
            <th style={{ width: '80px' }}>Editar</th>
          </tr>
        </thead>
        <tbody>
          {partidosDelGrupo.map((partido) => (
            <tr key={partido.id}>
              <td>{partido.jugador_1}</td>
              <td>
                <Link to={`resultado/${partido.id}`}>
                  {partido.estado === 'N'
                    ? 'vs.'
                    : `${partido.sets_jugador_1} - ${partido.sets_jugador_2}`}
                </Link>
              </td>
              <td>{partido.jugador_2}</td>
              <td>
                <Link to={`partido/${partido.id}`}>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className={classes['icono-editar']}
                  />
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PartidosDelGrupo;
