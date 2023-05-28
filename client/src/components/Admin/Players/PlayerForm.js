import { Form, useNavigate, useNavigation } from 'react-router-dom';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { createPlayer, updatePlayer } from '../../../api';
import classes from './PlayerForm.module.css';

const PlayerForm = ({ method, player }) => {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  const cancelHandler = () => {
    navigate('..');
  };

  return (
    <Form method={method} className={classes.form}>
      <h2>{method === 'POST' ? 'Agregar jugador' : 'Editar jugador'}</h2>
      <Input
        id="first_name"
        required="true"
        label="Nombre"
        defaultValue={player ? player[0].first_name : ''}
      />
      <Input
        id="middle_name"
        label="Segundo Nombre"
        defaultValue={player ? player[0].middle_name : ''}
      />
      <Input
        id="last_name"
        required="true"
        label="Apellido"
        defaultValue={player ? player[0].last_name : ''}
      />
      <Input
        id="second_last_name"
        label="Segundo Apellido"
        defaultValue={player ? player[0].second_last_name : ''}
      />
      <Input
        id="birthdate"
        label="Fecha de Nacimiento (yyyy-mm-dd)"
        defaultValue={
          player && player[0].birthdate !== null
            ? player[0].birthdate.substring(0, 10)
            : ''
        }
      />
      <Input
        id="email"
        label="Email"
        defaultValue={player ? player[0].email : ''}
      />
      <Input
        id="club_name"
        label="Club"
        defaultValue={player ? player[0].club_name : ''}
      />
      <Input
        id="is_federated"
        label="¿Es federado? ('true' - 'false')"
        defaultValue={player ? player[0].is_federated : ''}
      />
      <div className={classes.select}>
        <label htmlFor="fecoteme_category">Categoría FeCoTeMe</label>
        <select
          id="fecoteme_category"
          name="fecoteme_category"
          defaultValue={player ? player[0].fecoteme_category : 'no_category'}
        >
          <option value="no_category">Sin Categoría</option>
          <option value="SuperFECOTEME">SuperFECOTEME</option>
          <option value="Primera">Primera</option>
          <option value="Segunda">Segunda</option>
          <option value="Tercera">Tercera</option>
          <option value="Cuarta">Cuarta</option>
          <option value="Quinta">Quinta</option>
          <option value="Sexta">Sexta</option>
          <option value="Séptima">Séptima</option>
        </select>
      </div>
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

export default PlayerForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const playerData = {
    first_name: data.get('first_name'),
    middle_name: data.get('middle_name'),
    last_name: data.get('last_name'),
    second_last_name: data.get('second_last_name'),
    birthdate: data.get('birthdate'),
    email: data.get('email'),
    club_name: data.get('club_name'),
    is_federated: data.get('is_federated'),
    fecoteme_category:
      data.get('fecoteme_category') !== 'no_category'
        ? data.get('fecoteme_category')
        : null,
  };

  if (method === 'POST') {
    return createPlayer(playerData);
  }

  return updatePlayer(params.playerId, playerData);
}
