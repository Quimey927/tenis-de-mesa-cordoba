import AdminFormulario from '../AdminFormulario/AdminFormulario';
import Input from '../../UI/Input/Input';
import { crearStream, editarStream } from '../../../api';

const FormularioStream = ({ method, stream, idFecha }) => {
  return (
    <AdminFormulario
      method={method}
      textoTitulo={
        method === 'POST'
          ? ' Agregar categoría fecha'
          : `Editar ${stream[0].orden}`
      }
      navegarAlCancelar={`/admin/fechas/${idFecha}`}
    >
      <Input
        id="orden"
        required="true"
        label="Orden*"
        defaultValue={stream ? stream[0].orden : ''}
      />

      <Input
        id="url"
        required="true"
        label="URL*"
        defaultValue={stream ? stream[0].url : ''}
      />
    </AdminFormulario>
  );
};

export default FormularioStream;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const datosStream = {
    url: data.get('url'),
    id_fecha: params.idFecha,
    orden: data.get('orden'),
  };

  if (method === 'POST') {
    return crearStream(params.idFecha, datosStream);
  }

  return editarStream(params.idStream, params.idFecha, datosStream);
}
