import AdminFormulario from '../AdminFormulario/AdminFormulario';
import Input from '../../UI/Input/Input';
import Select from '../../UI/Select/Select';
import Textarea from '../../UI/Textarea/Textarea';
import { crearStream, editarStream } from '../../../api';

const FormularioStream = ({ method, stream, idFecha }) => {
  return (
    <AdminFormulario
      method={method}
      textoTitulo={
        method === 'POST' ? ' Agregar stream' : `Editar ${stream[0].orden}`
      }
      navegarAlCancelar={`/admin/fechas/${idFecha}`}
    >
      <Input
        id="orden"
        required={true}
        label="Orden*"
        defaultValue={stream ? stream[0].orden : ''}
      />

      <Textarea
        id="codigo_youtube"
        label="Código Youtube*"
        rows="4"
        defaultValue={stream ? stream[0].codigo_youtube : ''}
        required={true}
      />

      <Select
        label="Estado"
        id="estado"
        defaultValue={stream ? stream[0].estado : 'na'}
        options={[
          { value: 'na', key: 'na', texto: 'No Activo' },
          { value: 'a', key: 'a', texto: 'Activo' },
        ]}
      />
    </AdminFormulario>
  );
};

export default FormularioStream;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const datosStream = {
    codigo_youtube: data.get('codigo_youtube'),
    id_fecha: params.idFecha,
    orden: data.get('orden'),
    estado: data.get('estado'),
  };

  if (method === 'POST') {
    return crearStream(params.idFecha, datosStream);
  }

  return editarStream(params.idStream, params.idFecha, datosStream);
}
