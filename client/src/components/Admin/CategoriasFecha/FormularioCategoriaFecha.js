import AdminFormulario from '../AdminFormulario/AdminFormulario';
import Input from '../../UI/Input/Input';
import { crearCategoriaFecha, editarCategoriaFecha } from '../../../api';

const FormularioCategoriaFecha = ({ method, categoriaFecha, idFecha }) => {
  return (
    <AdminFormulario
      method={method}
      textoTitulo={
        method === 'POST'
          ? ' Agregar categoría fecha'
          : `Editar ${categoriaFecha[0].categoria}`
      }
      navegarAlCancelar=".."
    >
      <Input
        id="categoria"
        required={true}
        label="Categoría*"
        defaultValue={categoriaFecha ? categoriaFecha[0].categoria : ''}
      />

      <Input
        id="orden"
        required={true}
        label="Orden*"
        defaultValue={categoriaFecha ? categoriaFecha[0].orden : ''}
      />
    </AdminFormulario>
  );
};

export default FormularioCategoriaFecha;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const datosCategoriaFecha = {
    categoria: data.get('categoria'),
    id_fecha: params.idFecha,
    orden: data.get('orden'),
  };

  if (method === 'POST') {
    return crearCategoriaFecha(params.idFecha, datosCategoriaFecha);
  }

  return editarCategoriaFecha(
    params.idCategoriaFecha,
    params.idFecha,
    datosCategoriaFecha
  );
}
