import AdminFormulario from '../AdminFormulario/AdminFormulario';
import Input from '../../UI/Input/Input';
import { crearCategoriaTorneo, editarCategoriaTorneo } from '../../../api';
// eslint-disable-next-line
import classes from '../AdminFormulario/AdminFormulario.module.css';

const FormularioCategoriaTorneo = ({ method, categoriaTorneo }) => {
  return (
    <AdminFormulario
      method={method}
      elemento={categoriaTorneo}
      nombre_tabla="categoría torneo"
      columna_principal="categoria"
    >
      <Input
        id="categoria"
        required="true"
        label="Categoría*"
        defaultValue={categoriaTorneo ? categoriaTorneo[0].categoria : ''}
      />

      <Input
        id="orden"
        required="true"
        label="Orden*"
        defaultValue={categoriaTorneo ? categoriaTorneo[0].orden : ''}
      />
    </AdminFormulario>
  );
};

export default FormularioCategoriaTorneo;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const datosCategoriaTorneo = {
    categoria: data.get('categoria'),
    id_torneo: params.idTorneo,
    orden: data.get('orden'),
  };

  if (method === 'POST') {
    return crearCategoriaTorneo(datosCategoriaTorneo);
  }

  return editarCategoriaTorneo(params.idCategoriaTorneo, datosCategoriaTorneo);
}
