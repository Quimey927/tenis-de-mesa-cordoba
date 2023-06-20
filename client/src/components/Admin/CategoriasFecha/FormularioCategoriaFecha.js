import AdminFormulario from '../AdminFormulario/AdminFormulario';
import Input from '../../UI/Input/Input';
import Select from '../../UI/Select/Select';
import { crearCategoriaFecha, editarCategoriaFecha } from '../../../api';

const FormularioCategoriaFecha = ({
  method,
  categoriaFecha,
  fecha_inicio,
  fecha_finalizacion,
}) => {
  return (
    <AdminFormulario
      method={method}
      textoTitulo={
        method === 'POST'
          ? ' Agregar categoría fecha'
          : `Editar ${categoriaFecha[0].categoria}`
      }
      subtitulo={method !== 'POST' && categoriaFecha[0].fecha}
      navegarAlCancelar={method === 'POST' ? '../../..' : '..'}
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

      {fecha_inicio !== fecha_finalizacion ? (
        <Select
          label="Día*"
          id="dia"
          defaultValue={
            categoriaFecha
              ? categoriaFecha[0].dia.substring(0, 10)
              : fecha_inicio
          }
          options={[
            { value: fecha_inicio, key: 'fecha_inicio', texto: fecha_inicio },
            {
              value: fecha_finalizacion,
              key: 'fecha_finalizacion',
              texto: fecha_finalizacion,
            },
          ]}
        />
      ) : (
        <input
          name="dia"
          value={fecha_inicio}
          readOnly
          style={{ display: 'none' }}
        />
      )}
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
    dia: data.get('dia'),
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
