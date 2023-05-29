import { Form, useNavigate, useNavigation } from 'react-router-dom';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { createTournament, updateTournament } from '../../../api';
import classes from './TournamentForm.module.css';

const TournamentForm = ({ method, tournament, tournaments }) => {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  const cancelHandler = () => {
    navigate('..');
  };

  return (
    <Form method={method} className={classes.form}>
      <h2>{method === 'POST' ? 'Agregar torneo' : 'Editar torneo'}</h2>
      <Input
        id="title"
        required="true"
        label="Título"
        defaultValue={tournament ? tournament[0].title : ''}
      />
      <Input
        id="season"
        required="true"
        label="Temporada"
        defaultValue={tournament ? tournament[0].season : ''}
      />
      <Input
        id="year"
        required="true"
        label="Año"
        defaultValue={tournament ? tournament[0].year : ''}
      />
      <Input
        id="tournament_image"
        label="Imagen"
        defaultValue={tournament ? tournament[0].tournament_image : ''}
      />
      <Input
        id="start_date"
        label="Fecha de inicio"
        defaultValue={
          tournament && tournament[0].start_date !== null
            ? tournament[0].start_date.substring(0, 10)
            : ''
        }
      />
      <Input
        id="finish_date"
        label="Fecha de finalización"
        defaultValue={
          tournament && tournament[0].finish_date !== null
            ? tournament[0].finish_date.substring(0, 10)
            : ''
        }
      />
      <Input
        id="description"
        label="Descripción"
        defaultValue={tournament ? tournament[0].description : ''}
      />
      <div className={classes.select}>
        <label htmlFor="previous_edition_id">Edición anterior</label>
        <select
          id="previous_edition_id"
          name="previous_edition_id"
          defaultValue={
            tournament ? tournament[0].previous_edition_id : 'no_tournament'
          }
        >
          <option value="no_tournament">No hay torneo previo</option>
          {tournaments.map((tournament) => (
            <option key={tournament.id} value={tournament.id}>
              {tournament.title} {tournament.season}
            </option>
          ))}
        </select>
      </div>
      <div className={classes.select}>
        <label htmlFor="next_edition_id">Edición siguiente</label>
        <select
          id="next_edition_id"
          name="next_edition_id"
          defaultValue={
            tournament ? tournament[0].next_edition_id : 'no_tournament'
          }
        >
          <option value="no_tournament">No hay torneo siguiente</option>
          {tournaments.map((tournament) => (
            <option key={tournament.id} value={tournament.id}>
              {tournament.title} {tournament.season}
            </option>
          ))}
        </select>
      </div>
      {/* <Input
        id="previous_edition_id"
        label="Edición anterior (id)"
        defaultValue={tournament ? tournament[0].previous_edition_id : ''}
      />
      <Input
        id="next_edition_id"
        label="Edición posterior (id)"
        defaultValue={tournament ? tournament[0].next_edition_id : ''}
      /> */}
      <div className={classes.actions}>
        <Button onClick={cancelHandler} disabled={isSubmitting}>
          Cerrar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? 'Subiendo...'
            : method === 'POST'
            ? 'Agregar'
            : 'Guardar'}
        </Button>
      </div>
    </Form>
  );
};

export default TournamentForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const tournamentData = {
    title: data.get('title'),
    season: data.get('season'),
    year: data.get('year'),
    tournament_image: data.get('tournament_image'),
    start_date: data.get('start_date'),
    finish_date: data.get('finish_date'),
    description: data.get('description'),
    previous_edition_id:
      data.get('previous_edition_id') !== 'no_tournament'
        ? data.get('previous_edition_id')
        : null,
    next_edition_id:
      data.get('next_edition_id') !== 'no_tournament'
        ? data.get('next_edition_id')
        : null,
  };

  if (method === 'POST') {
    return createTournament(tournamentData);
  }

  return updateTournament(params.tournamentId, tournamentData);
}
