import AdminFormulario from '../AdminFormulario/AdminFormulario';
import Input from '../../UI/Input/Input';
import { crearCategoriaTorneo, editarCategoriaTorneo } from '../../../api';

const FormularioCategoriaTorneo = ({ method, categoriaTorneo, idTorneo }) => {
  return (
    <AdminFormulario
      method={method}
      textoTitulo={
        method === 'POST'
          ? ' Agregar categoría torneo'
          : `Editar ${categoriaTorneo[0].categoria}`
      }
      navegarAlCancelar={`/admin/torneos/${idTorneo}`}
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
    return crearCategoriaTorneo(params.idTorneo, datosCategoriaTorneo);
  }

  return editarCategoriaTorneo(
    params.idCategoriaTorneo,
    params.idTorneo,
    datosCategoriaTorneo
  );
}
