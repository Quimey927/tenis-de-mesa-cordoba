import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import AdminFormulario from '../AdminFormulario/AdminFormulario';
import Input from '../../UI/Input/Input';
import Select from '../../UI/Select/Select';
import { crearFecha, editarFecha } from '../../../api';
import { obtenerSlug } from '../../../utils/obtenerSlug';

const FormularioFecha = ({ method, fecha, torneos, clubes, fechas }) => {
  const { state } = useLocation();

  const slugTorneo = fecha
    ? `${fecha[0].torneo} ${fecha[0].temporada}`
    : state
    ? torneos.find((torneo) => torneo.id === state).slug
    : '';

  const [slug, setSlug] = useState(
    fecha ? obtenerSlug(`${fecha[0].nombre} ${slugTorneo}`) : ''
  );

  const id_torneo = fecha ? fecha[0].id_torneo : state;

  const fechasDelTorneo = slug
    ? fechas.filter((fecha) => fecha.slug === slug)
    : state !== null
    ? fechas.filter((fecha) => fecha.id_torneo === state)
    : [];

  return (
    <AdminFormulario
      method={method}
      textoTitulo={
        method === 'POST' ? ' Agregar fecha' : `Editar ${fecha[0].nombre}`
      }
      subtitulo={
        method !== 'POST' && `${fecha[0].torneo} ${fecha[0].temporada}`
      }
      navegarAlCancelar={-1}
    >
      <Input
        id="nombre"
        required={true}
        label="Nombre*"
        onChange={(evt) =>
          setSlug(obtenerSlug(`${evt.target.value} ${slugTorneo}`))
        }
        defaultValue={fecha ? fecha[0].nombre : ''}
      />

      <Input
        id="num_fecha"
        required={true}
        label="Número fecha"
        defaultValue={fecha ? fecha[0].num_fecha : fechasDelTorneo.length + 1}
      />

      <Select
        label="Torneo al que pertenece"
        disabled
        id="id_torneo"
        defaultValue={
          fecha ? fecha[0].id_torneo : state !== null ? state : 'elegir_torneo'
        }
        options={[
          { value: 'elegir_torneo', key: 0, texto: 'Elegir Torneo' },
          ...torneos.map((torneo) => {
            return {
              key: torneo.id,
              value: torneo.id,
              texto: `${torneo.titulo} ${torneo.temporada}`,
            };
          }),
        ]}
        style={method === 'PUT' ? { disabled: true } : {}}
      />

      <Select
        label="Lugar"
        id="id_club"
        defaultValue={fecha ? fecha[0].id_club : 'elegir_club'}
        options={[
          { value: 'elegir_club', key: 0, texto: 'Elegir Lugar' },
          ...clubes.map((club) => {
            return {
              key: club.id,
              value: club.id,
              texto: club.nombre,
            };
          }),
        ]}
      />

      <Input
        type="date"
        id="fecha_inicio"
        label="Fecha de inicio*"
        required={true}
        defaultValue={
          fecha && fecha[0].fecha_inicio !== null
            ? fecha[0].fecha_inicio.substring(0, 10)
            : ''
        }
      />

      <Input
        type="date"
        id="fecha_finalizacion"
        label="Fecha de finalización*"
        required={true}
        defaultValue={
          fecha && fecha[0].fecha_finalizacion !== null
            ? fecha[0].fecha_finalizacion.substring(0, 10)
            : ''
        }
      />

      <Select
        label="Se muestra en front"
        id="se_muestra_en_front"
        defaultValue={
          fecha ? (fecha[0].se_muestra_en_front ? 'si' : 'no') : 'si'
        }
        options={[
          { value: 'no', key: 'no', texto: 'No' },
          { value: 'si', key: 'si', texto: 'Sí' },
        ]}
      />

      {/* este input no se muestra, es para pasar el slug al action */}
      <input
        name="slug"
        value={slug}
        required
        readOnly
        style={{ display: 'none' }}
      />

      <input
        name="id_torneo"
        value={id_torneo}
        required
        readOnly
        style={{ display: 'none' }}
      />
    </AdminFormulario>
  );
};

export default FormularioFecha;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const id_torneo = data.get('id_torneo');

  const datosFecha = {
    nombre: data.get('nombre'),
    num_fecha: data.get('num_fecha'),
    id_torneo,
    id_club: data.get('id_club') !== 'elegir_club' ? data.get('id_club') : null,
    fecha_inicio: data.get('fecha_inicio'),
    fecha_finalizacion: data.get('fecha_finalizacion'),
    slug: data.get('slug'),
    se_muestra_en_front:
      data.get('se_muestra_en_front') === 'si' ? true : false,
  };

  if (method === 'POST') {
    return crearFecha(datosFecha, id_torneo);
  }

  return editarFecha(params.idFecha, datosFecha);
}
