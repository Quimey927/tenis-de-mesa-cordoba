import AdminFormulario from '../AdminFormulario/AdminFormulario';
import Input from '../../UI/Input/Input';
import Select from '../../UI/Select/Select';
import { crearCategoriaFecha, editarCategoriaFecha } from '../../../api';

const FormularioCategoriaFecha = ({
  method,
  categoriaFecha,
  fecha_inicio,
  fecha_finalizacion,
  categoriasTorneoPosibles,
}) => {
  return (
    <AdminFormulario
      method={method}
      textoTitulo={
        method === 'POST' ? ' Agregar categoría fecha' : categoriaFecha[0].fecha
      }
      subtitulo={method !== 'POST' && `Editar ${categoriaFecha[0].categoria}`}
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

      <Select
        label="Categoría torneo por default para la que suma puntos"
        id="id_categoria_torneo_default"
        defaultValue={
          categoriaFecha
            ? categoriaFecha[0].id_categoria_torneo_default
            : 'sin_categoria'
        }
        options={[
          { value: 'sin_categoria', key: 0, texto: 'Sin categoría asignada' },
          ...categoriasTorneoPosibles.map((categoria) => {
            return {
              key: categoria.id,
              value: categoria.id,
              texto: categoria.categoria,
            };
          }),
        ]}
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
    dia: data.get('dia'),
    id_categoria_torneo_default:
      data.get('id_categoria_torneo_default') !== 'sin_categoria'
        ? data.get('id_categoria_torneo_default')
        : null,
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
