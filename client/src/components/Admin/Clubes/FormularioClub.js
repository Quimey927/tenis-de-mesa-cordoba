import AdminFormulario from '../AdminFormulario/AdminFormulario';
import Input from '../../UI/Input/Input';
import Select from '../../UI/Select/Select';
import { crearClub, editarClub } from '../../../api';

const FormularioClub = ({ method, club, ciudades }) => {
  return (
    <AdminFormulario
      method={method}
      textoTitulo={
        method === 'POST' ? ' Agregar club' : `Editar ${club[0].nombre}`
      }
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

      <Select
        label="Ciudad"
        id="id_ciudad"
        defaultValue={club ? club[0].id_ciudad : '1'}
        options={ciudades.map((ciudad) => {
          return {
            key: ciudad.id,
            value: ciudad.id,
            texto: ciudad.nombre,
          };
        })}
      />

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
