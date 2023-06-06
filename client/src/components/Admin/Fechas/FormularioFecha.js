import { useState, useEffect } from 'react';

import AdminFormulario from '../AdminFormulario/AdminFormulario';
import Input from '../../UI/Input/Input';
import { crearFecha, editarFecha } from '../../../api';
import { obtenerSlug } from '../../../utils/obtenerSlug';
import classes from '../AdminFormulario/AdminFormulario.module.css';

const FormularioFecha = ({ method, fecha, torneos, clubes, fechas }) => {
  const [slugTorneo, setSlugTorneo] = useState(fecha ? fecha.slug_torneo : '');

  const [numFecha, setNumFecha] = useState(fecha ? fecha[0].num_fecha : '');

  const fechasDelTorneo = slugTorneo
    ? fechas.filter((fecha) => fecha.slug_torneo === slugTorneo)
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

      <div className={classes.campo}>
        <label htmlFor="id_torneo">Torneo al que pertenece*</label>
        <select
          id="id_torneo"
          name="id_torneo"
          defaultValue={fecha ? fecha[0].id_torneo : 'elegir_torneo'}
          onChange={controladorCambio}
          disabled={method !== 'POST'}
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
        <label htmlFor="id_club">Lugar</label>
        <select
          id="id_club"
          name="id_club"
          defaultValue={fecha ? fecha[0].id_club : 'elegir_club'}
        >
          <option value="elegir_club">Elegir Lugar</option>
          {clubes.map((club) => (
            <option key={club.id} value={club.id}>
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
        id="fecha_finalizacion"
        required="true"
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

  const datosFecha = {
    nombre: data.get('nombre'),
    num_fecha: data.get('num_fecha'),
    id_torneo: data.get('id_torneo'),
    id_club: data.get('id_club') !== 'elegir_club' ? data.get('id_club') : null,
    fecha_inicio: data.get('fecha_inicio'),
    fecha_finalizacion: data.get('fecha_finalizacion'),
    slug: `${obtenerSlug(data.get('nombre'))}-${data.get('slug_torneo')}`,
  };

  if (method === 'POST') {
    return crearFecha(datosFecha);
  }

  return editarFecha(params.idFecha, datosFecha);
}
