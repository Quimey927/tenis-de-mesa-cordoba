import AdminFormulario from '../AdminFormulario/AdminFormulario';

import Input from '../../UI/Input/Input';
import Select from '../../UI/Select/Select';
import Textarea from '../../UI/Textarea/Textarea';
import { crearTorneo, editarTorneo } from '../../../api';
import { obtenerSlug } from '../../../utils/obtenerSlug';

const FormularioTorneo = ({ method, torneo, torneos }) => {
  return (
    <AdminFormulario
      method={method}
      textoTitulo={
        method === 'POST' ? ' Agregar torneo' : `Editar ${torneo[0].titulo}`
      }
    >
      <Input
        id="titulo"
        required="true"
        label="Título*"
        disabled={method !== 'POST'}
        defaultValue={torneo ? torneo[0].titulo : ''}
      />

      <Input
        id="temporada"
        required="true"
        label="Temporada*"
        disabled={method !== 'POST'}
        defaultValue={torneo ? torneo[0].temporada : ''}
      />

      <Input
        id="año"
        required="true"
        label="Año*"
        defaultValue={torneo ? torneo[0].año : ''}
      />

      <Input
        id="imagen_torneo"
        label="Imagen"
        defaultValue={torneo ? torneo[0].imagen_torneo : ''}
      />

      <Input
        id="fecha_inicio"
        label="Fecha de inicio (yyyy-mm-dd)"
        defaultValue={
          torneo && torneo[0].fecha_inicio !== null
            ? torneo[0].fecha_inicio.substring(0, 10)
            : ''
        }
      />

      <Input
        id="fecha_finalizacion"
        label="Fecha de finalización (yyyy-mm-dd)"
        defaultValue={
          torneo && torneo[0].fecha_finalizacion !== null
            ? torneo[0].fecha_finalizacion.substring(0, 10)
            : ''
        }
      />

      <Textarea
        id="descripcion"
        label="Descripción"
        rows="4"
        defaultValue={torneo ? torneo[0].descripcion : ''}
      />

      <Select
        label="Edición anterior"
        id="id_edicion_previa"
        defaultValue={
          torneo ? torneo[0].id_edicion_previa : 'sin_edicion_previa'
        }
        options={[
          {
            value: 'sin_edicion_previa',
            key: 0,
            texto: 'No hay torneo previo',
          },
          ...torneos.map((torneo) => {
            return {
              key: torneo.id,
              value: torneo.id,
              texto: `${torneo.titulo} ${torneo.temporada}`,
            };
          }),
        ]}
      />

      <Select
        label="Edición siguiente"
        id="id_edicion_siguiente"
        defaultValue={
          torneo ? torneo[0].id_edicion_siguiente : 'sin_edicion_siguiente'
        }
        options={[
          {
            value: 'sin_edicion_siguiente',
            key: 0,
            texto: 'No hay torneo siguiente',
          },
          ...torneos.map((torneo) => {
            return {
              key: torneo.id,
              value: torneo.id,
              texto: `${torneo.titulo} ${torneo.temporada}`,
            };
          }),
        ]}
      />
    </AdminFormulario>
  );
};

export default FormularioTorneo;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const datosTorneo = {
    titulo: data.get('titulo'),
    temporada: data.get('temporada'),
    año: data.get('año'),
    imagen_torneo: data.get('imagen_torneo'),
    fecha_inicio: data.get('fecha_inicio'),
    fecha_finalizacion: data.get('fecha_finalizacion'),
    descripcion: data.get('descripcion'),
    id_edicion_previa:
      data.get('id_edicion_previa') !== 'sin_edicion_previa'
        ? data.get('id_edicion_previa')
        : null,
    id_edicion_siguiente:
      data.get('id_edicion_siguiente') !== 'sin_edicion_siguiente'
        ? data.get('id_edicion_siguiente')
        : null,
    slug:
      method === 'POST'
        ? `${obtenerSlug(data.get('titulo'))}-${obtenerSlug(
            data.get('temporada')
          )}`
        : '',
  };

  if (method === 'POST') {
    return crearTorneo(datosTorneo);
  }

  return editarTorneo(params.idTorneo, datosTorneo);
}
