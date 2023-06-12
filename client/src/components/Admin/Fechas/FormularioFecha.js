import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import AdminFormulario from '../AdminFormulario/AdminFormulario';
import Input from '../../UI/Input/Input';
import Select from '../../UI/Select/Select';
import { crearFecha, editarFecha } from '../../../api';
import { obtenerSlug } from '../../../utils/obtenerSlug';

const FormularioFecha = ({ method, fecha, torneos, clubes, fechas }) => {
  const { state } = useLocation();

  const [slugTorneo, setSlugTorneo] = useState(fecha ? fecha.slug_torneo : '');
  const [numFecha, setNumFecha] = useState(fecha ? fecha[0].num_fecha : '');

  const fechasDelTorneo = slugTorneo
    ? fechas.filter((fecha) => fecha.slug_torneo === slugTorneo)
    : state !== null
    ? fechas.filter((fecha) => fecha.id_torneo === state)
    : [];

  useEffect(() => {
    setNumFecha(fechasDelTorneo.length + 1);
    // eslint-disable-next-line
  }, [slugTorneo]);

  const controladorCambio = (evt) => {
    const { options, selectedIndex } = evt.target;
    setSlugTorneo(obtenerSlug(options[selectedIndex].innerHTML));
  };

  return (
    <AdminFormulario
      method={method}
      textoTitulo={
        method === 'POST' ? ' Agregar fecha' : `Editar ${fecha[0].nombre}`
      }
      navegarAlCancelar={-1}
    >
      <Input
        id="nombre"
        required={true}
        label="Nombre*"
        defaultValue={fecha ? fecha[0].nombre : ''}
        style={method === 'PUT' ? { cursor: 'not-allowed' } : {}}
      />

      <Select
        label="Torneo al que pertenece*"
        id="id_torneo"
        defaultValue={
          fecha ? fecha[0].id_torneo : state !== null ? state : 'elegir_torneo'
        }
        onChange={controladorCambio}
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
        style={method === 'PUT' ? { cursor: 'not-allowed' } : {}}
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
        id="fecha_inicio"
        label="Fecha de inicio (yyyy-mm-dd)"
        defaultValue={
          fecha && fecha[0].fecha_inicio !== null
            ? fecha[0].fecha_inicio.substring(0, 10)
            : ''
        }
      />

      <Input
        id="fecha_finalizacion"
        label="Fecha de finalización (yyyy-mm-dd)"
        defaultValue={
          fecha && fecha[0].fecha_finalizacion !== null
            ? fecha[0].fecha_finalizacion.substring(0, 10)
            : ''
        }
      />

      {/* este input no se muestra, es para pasar num_fecha al action */}
      <input
        name="num_fecha"
        required
        value={numFecha}
        readOnly
        style={{ display: 'none' }}
      />

      {/* este input no se muestra, es para pasar el slug del torneo al action */}
      <input
        name="slug_torneo"
        value={slugTorneo}
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

  const idTorneo = data.get('id_torneo');

  const datosFecha = {
    nombre: data.get('nombre'),
    num_fecha: data.get('num_fecha'),
    id_torneo: idTorneo,
    id_club: data.get('id_club') !== 'elegir_club' ? data.get('id_club') : null,
    fecha_inicio: data.get('fecha_inicio'),
    fecha_finalizacion: data.get('fecha_finalizacion'),
    slug: `${obtenerSlug(data.get('nombre'))}-${data.get('slug_torneo')}`,
  };

  if (method === 'POST') {
    return crearFecha(datosFecha, idTorneo);
  }

  return editarFecha(params.idFecha, datosFecha);
}
