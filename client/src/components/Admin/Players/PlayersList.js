import { Link, useNavigate } from 'react-router-dom';

import Button from '../../UI/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import classes from './PlayersList.module.css';
import { deletePlayer } from '../../../api';

const PlayersList = ({ players }) => {
  const navigate = useNavigate();

  const deletePlayerHandler = (id) => {
    const proceed = window.confirm(
      '¿Estás seguro de que querés eliminar el jugador?'
    );

    if (proceed) {
      deletePlayer(id);
      navigate('/admin/jugadores');
    }
  };

  return (
    <>
      <div className={classes['list-header']}>
        <h2>Jugadores</h2>
        <Link to="nuevo">
          <Button>Agregar jugador</Button>
        </Link>
      </div>
      <table className={classes.table} role="table">
        <thead>
          <tr role="row">
            <th role="columnheader">Nombre</th>
            <th role="columnheader">Editar</th>
            <th role="columnheader">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id} role="row">
              <td role="cell" data-cell="nombre">
                {player.second_last_name
                  ? `${player.last_name} ${player.second_last_name},`
                  : `${player.last_name},`}{' '}
                {player.middle_name
                  ? `${player.first_name} ${player.middle_name}`
                  : player.first_name}
              </td>
              <td role="cell" data-cell="editar">
                <Link to={player.id.toString()}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Link>
              </td>
              <td role="cell" data-cell="eliminar">
                <button
                  className={classes.btn}
                  onClick={deletePlayerHandler.bind(null, player.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PlayersList;
