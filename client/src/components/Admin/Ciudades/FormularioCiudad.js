import AdminFormulario from '../AdminFormulario/AdminFormulario';
import Input from '../../UI/Input/Input';
import { crearCiudad, editarCiudad } from '../../../api';
// eslint-disable-next-line
import classes from '../AdminFormulario/AdminFormulario.module.css';

const FormularioCiudad = ({ method, ciudad }) => {
  return (
    <AdminFormulario
      method={method}
      textoTitulo={
        method === 'POST' ? ' Agregar ciudad' : `Editar ${ciudad[0].nombre}`
      }
      navegarAlCancelar="/admin/ciudades"
    >
      <Input
        id="nombre"
        required="true"
        label="Nombre*"
        defaultValue={ciudad ? ciudad[0].nombre : ''}
      />
    </AdminFormulario>
  );
};

export default FormularioCiudad;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const datosCiudad = {
    nombre: data.get('nombre'),
  };

  if (method === 'POST') {
    return crearCiudad(datosCiudad);
  }

  return editarCiudad(params.idCiudad, datosCiudad);
}
