import AdminFormulario from '../AdminFormulario/AdminFormulario';
import Input from '../../UI/Input/Input';
import Select from '../../UI/Select/Select';
import Textarea from '../../UI/Textarea/Textarea';
import { crearFase, editarFase } from '../../../api';

const FormularioFase = ({ method, fase }) => {
  return (
    <AdminFormulario
      method={method}
      textoTitulo={
        method === 'POST' ? 'Agregar fase' : `Editar ${fase[0].nombre}`
      }
      navegarAlCancelar={-1}
    >
      <Input
        id="nombre"
        required="true"
        label="Nombre*"
        defaultValue={fase ? fase[0].nombre : ''}
        autoFocus={true}
      />

      <Input
        id="orden"
        required="true"
        label="Orden*"
        defaultValue={fase ? fase[0].orden : ''}
      />

      {method === 'POST' && (
        <Select
          label="Tipo"
          id="tipo"
          required={true}
          defaultValue={fase ? fase[0].tipo : ''}
          options={[
            { value: '', texto: 'Elegir tipo de fase*' },
            { value: 'G', texto: 'Grupos' },
            { value: 'E', texto: 'Eliminatoria' },
          ]}
        />
      )}

      <Textarea
        id="descripcion"
        label="Descripción"
        placeholder="Añadir descripción"
        defaultValue={fase ? fase[0].descripcion : ''}
      />
    </AdminFormulario>
  );
};

export default FormularioFase;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const datosFase = {
    nombre: data.get('nombre'),
    orden: data.get('orden'),
    tipo: data.get('tipo'),
    descripcion: data.get('descripcion'),
    id_categoria_fecha: params.idCategoriaFecha,
  };

  if (method === 'POST') {
    return crearFase(datosFase, params.idFecha, params.idCategoriaFecha);
  }

  return editarFase(
    params.idFase,
    datosFase,
    params.idFecha,
    params.idCategoriaFecha
  );
}
