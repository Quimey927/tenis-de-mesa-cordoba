import { useState } from 'react';

import AdminFormulario from '../AdminFormulario/AdminFormulario';
import Input from '../../UI/Input/Input';
import { crearFecha, editarFecha } from '../../../api';
import { obtenerSlug } from '../../../utils/obtenerSlug';
import classes from '../AdminFormulario/AdminFormulario.module.css';

const FormularioFecha = ({ method, fecha, torneos, clubes, fechas }) => {
  // si hay fecha, es decir, si es edición, buscamos el slug del torneo
  // al que corresponde la fecha, si no, dejamos en blanco, y lo
  // modificamos cuando elijamos el torneo
  const [slugTorneo, setSlugTorneo] = useState(
    fecha ? torneos.find((torneo) => torneo.id === fecha.torneo_id).slug : ''
  );

  // con options[selectedIndex].innerHTML obtenemos el texto interno
  // del select elegido, es decir, {torneo.titulo} {torneo.temporada},
  // a eso le obtenemos el slug, y ese es el slug del torneo
  const controladorCambio = (evt) => {
    const { options, selectedIndex } = evt.target;
    setSlugTorneo(obtenerSlug(options[selectedIndex].innerHTML));
  };

  return (
    <AdminFormulario
      method={method}
      elemento={fecha}
      nombre_tabla="fecha"
      columna_principal="nombre"
    >
      <Input
        id="nombre"
        required="true"
        label="Nombre*"
        defaultValue={fecha ? fecha[0].nombre : ''}
      />

      <Input
        id="num_fecha"
        required="true"
        label="Número Ronda*"
        defaultValue={fecha ? fecha[0].num_fecha : ''}
      />

      <div className={classes.campo}>
        <label htmlFor="id_torneo">Torneo al que pertenece*</label>
        <select
          id="id_torneo"
          name="id_torneo"
          defaultValue={fecha ? fecha[0].id_torneo : 'elegir_torneo'}
          onChange={controladorCambio}
        >
          <option value="elegir_torneo">Elegir Torneo</option>
          {torneos.map((torneo) => (
            <option key={torneo.id} value={torneo.id}>
              {torneo.titulo} {torneo.temporada}
            </option>
          ))}
        </select>
      </div>

      <div className={classes.campo}>
        <label htmlFor="nombre_club">Lugar*</label>
        <select
          id="nombre_club"
          name="nombre_club"
          defaultValue={fecha ? fecha[0].nombre_club : 'elegir_club'}
        >
          <option value="elegir_club">Elegir Lugar</option>
          {clubes.map((club) => (
            <option key={club.nombre} value={club.nombre}>
              {club.nombre}
            </option>
          ))}
        </select>
      </div>

      <Input
        id="fecha_inicio"
        required="true"
        label="Fecha de inicio (yyyy-mm-dd)"
        defaultValue={
          fecha && fecha[0].fecha_inicio !== null
            ? fecha[0].fecha_inicio.substring(0, 10)
            : ''
        }
      />

      <Input
        id="fecha_finalizacion (yyyy-mm-dd)"
        required="true"
        label="Fecha de finalización"
        defaultValue={
          fecha && fecha[0].fecha_finalizacion !== null
            ? fecha[0].fecha_finalizacion.substring(0, 10)
            : ''
        }
      />

      <div className={classes.campo}>
        <label htmlFor="id_edicion_previa">Edición anterior</label>
        <select
          id="id_edicion_previa"
          name="id_edicion_previa"
          defaultValue={
            fecha ? fecha[0].id_edicion_previa : 'sin_edicion_previa'
          }
        >
          <option value="sin_edicion_previa">No hay fecha previa</option>
          {fechas.map((fecha) => (
            <option key={fecha.id} value={fecha.id}>
              {fecha.nombre} {fecha.id_torneo}
            </option>
          ))}
        </select>
      </div>

      <div className={classes.campo}>
        <label htmlFor="id_edicion_siguiente">Edición siguiente</label>
        <select
          id="id_edicion_siguiente"
          name="id_edicion_siguiente"
          defaultValue={
            fecha ? fecha[0].id_edicion_siguiente : 'sin_edicion_siguiente'
          }
        >
          <option value="sin_edicion_siguiente">No hay fecha siguiente</option>
          {fechas.map((fecha) => (
            <option key={fecha.id} value={fecha.id}>
              {fecha.nombre} {fecha.id_torneo}
            </option>
          ))}
        </select>
      </div>

      <input
        name="slug_torneo"
        value={slugTorneo}
        style={{ display: 'none' }}
      />
    </AdminFormulario>
  );
};

export default FormularioFecha;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const datosJugador = {
    nombre: data.get('nombre'),
    num_fecha: data.get('num_fecha'),
    id_torneo: data.get('id_torneo'),
    nombre_club: data.get('nombre_club'),
    fecha_inicio: data.get('fecha_inicio'),
    fecha_finalizacion: data.get('fecha_finalizacion'),
    id_edicion_previa:
      data.get('id_edicion_previa') !== 'sin_edicion_previa'
        ? data.get('id_edicion_previa')
        : null,
    id_edicion_siguiente:
      data.get('id_edicion_siguiente') !== 'sin_edicion_siguiente'
        ? data.get('id_edicion_siguiente')
        : null,
    slug: `${obtenerSlug(data.get('nombre'))}-${data.get('slug_torneo')}`,
  };

  if (method === 'POST') {
    return crearFecha(datosJugador);
  }

  return editarFecha(params.idFecha, datosJugador);
}
