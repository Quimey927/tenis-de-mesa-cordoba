import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

import Button from '../../UI/Button/Button';
import { deleteTournament } from '../../../api';
import classes from './TournamentsList.module.css';

const TournamentsList = ({ tournaments }) => {
  const navigate = useNavigate();

  const deleteTournamentHandler = (id) => {
    const proceed = window.confirm(
      '¿Estás seguro de que querés eliminar el torneo?'
    );

    if (proceed) {
      deleteTournament(id);
      navigate('/admin/torneos');
    }
  };

  return (
    <>
      <div className={classes['list-header']}>
        <h2>Torneos</h2>
        <Link to="nuevo">
          <Button>Agregar torneo</Button>
        </Link>
      </div>
      <table className={classes.table} role="table">
        <thead>
          <tr role="row">
            <th role="columnheader">Título</th>
            <th role="columnheader">Temporada</th>
            <th role="columnheader">Editar</th>
            <th role="columnheader">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {tournaments.map((tournament) => (
            <tr key={tournament.id} role="row">
              <td role="cell" data-cell="título">
                {tournament.title}
              </td>
              <td role="cell" data-cell="temporada">
                {tournament.season}
              </td>
              <td role="cell" data-cell="editar">
                <Link to={tournament.id.toString()}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Link>
              </td>
              <td role="cell" data-cell="eliminar">
                <button
                  className={classes.btn}
                  onClick={deleteTournamentHandler.bind(null, tournament.id)}
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

export default TournamentsList;
