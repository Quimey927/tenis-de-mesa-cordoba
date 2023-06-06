import AdminFormulario from '../AdminFormulario/AdminFormulario';
import Input from '../../UI/Input/Input';
import { crearClub, editarClub } from '../../../api';
import classes from '../AdminFormulario/AdminFormulario.module.css';

const FormularioClub = ({ method, club, ciudades }) => {
  return (
    <AdminFormulario
      method={method}
      textoTitulo={
        method === 'POST' ? ' Agregar club' : `Editar ${club[0].nombre}`
      }
      navegarAlCancelar="/admin/clubes"
    >
      <Input
        id="nombre"
        required="true"
        label="Nombre*"
        defaultValue={club ? club[0].nombre : ''}
      />

      <Input
        id="direccion"
        required="true"
        label="Dirección*"
        defaultValue={club ? club[0].direccion : ''}
      />

      <div className={classes.campo}>
        <label htmlFor="id_ciudad">Ciudad*</label>
        <select
          id="id_ciudad"
          name="id_ciudad"
          defaultValue={club ? club[0].id_ciudad : 'Córdoba'}
        >
          {ciudades.map((ciudad) => (
            <option key={ciudad.id} value={ciudad.id}>
              {ciudad.nombre}
            </option>
          ))}
        </select>
      </div>

      <Input
        id="escudo_club"
        label="Escudo Club"
        defaultValue={club ? club[0].escudo_club : ''}
      />
    </AdminFormulario>
  );
};

export default FormularioClub;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const datosClub = {
    nombre: data.get('nombre'),
    direccion: data.get('direccion'),
    id_ciudad: data.get('id_ciudad'),
    escudo_club: data.get('escudo_club'),
  };

  if (method === 'POST') {
    return crearClub(datosClub);
  }

  return editarClub(params.idClub, datosClub);
}
