import AdminFormulario from '../AdminFormulario/AdminFormulario';
import Input from '../../UI/Input/Input';
import { crearJugador, editarJugador } from '../../../api';
import classes from '../AdminFormulario/AdminFormulario.module.css';

const FormularioJugador = ({ method, jugador, clubes }) => {
  return (
    <AdminFormulario
      method={method}
      elemento={jugador}
      nombre_tabla="jugador"
      columna_principal="apellido"
    >
      <Input
        id="nombre"
        required="true"
        label="Nombre"
        defaultValue={jugador ? jugador[0].nombre : ''}
      />
      <Input
        id="segundo_nombre"
        label="Segundo Nombre"
        defaultValue={jugador ? jugador[0].segundo_nombre : ''}
      />
      <Input
        id="apellido"
        required="true"
        label="Apellido"
        defaultValue={jugador ? jugador[0].apellido : ''}
      />
      <Input
        id="segundo_apellido"
        label="Segundo Apellido"
        defaultValue={jugador ? jugador[0].segundo_apellido : ''}
      />
      <Input
        id="cumpleaños"
        label="Fecha de Nacimiento (yyyy-mm-dd)"
        defaultValue={
          jugador && jugador[0].cumpleaños !== null
            ? jugador[0].cumpleaños.substring(0, 10)
            : ''
        }
      />
      <Input
        id="email"
        label="Email"
        defaultValue={jugador ? jugador[0].email : ''}
      />

      <div className={classes.campo}>
        <label htmlFor="nombre_club">Club*</label>
        <select
          id="nombre_club"
          name="nombre_club"
          defaultValue={jugador ? jugador[0].nombre_club : 'sin_club'}
        >
          <option value="sin_club">Sin Club</option>
          {clubes.map((club) => (
            <option key={club.nombre} value={club.nombre}>
              {club.nombre}
            </option>
          ))}
        </select>
      </div>

      <Input
        id="es_federado"
        label="¿Es federado? ('true' - 'false')"
        defaultValue={jugador ? jugador[0].es_federado : ''}
      />
      <div className={classes.campo}>
        <label htmlFor="categoria_fecoteme">Categoría FeCoTeMe</label>
        <select
          id="categoria_fecoteme"
          name="categoria_fecoteme"
          defaultValue={
            jugador ? jugador[0].categoria_fecoteme : 'sin_categoria'
          }
        >
          <option value="sin_categoria">Sin Categoría</option>
          <option value="SuperFECOTEME">SuperFECOTEME</option>
          <option value="Primera">Primera</option>
          <option value="Segunda">Segunda</option>
          <option value="Tercera">Tercera</option>
          <option value="Cuarta">Cuarta</option>
          <option value="Quinta">Quinta</option>
          <option value="Sexta">Sexta</option>
          <option value="Séptima">Séptima</option>
        </select>
      </div>
    </AdminFormulario>
  );
};

export default FormularioJugador;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const datosJugador = {
    nombre: data.get('nombre'),
    segundo_nombre: data.get('segundo_nombre'),
    apellido: data.get('apellido'),
    segundo_apellido: data.get('segundo_apellido'),
    cumpleaños: data.get('cumpleaños'),
    email: data.get('email'),
    nombre_club:
      data.get('nombre_club') !== 'sin_club' ? data.get('nombre_club') : null,
    es_federado: data.get('es_federado'),
    categoria_fecoteme:
      data.get('categoria_fecoteme') !== 'sin_categoria'
        ? data.get('categoria_fecoteme')
        : null,
  };

  if (method === 'POST') {
    return crearJugador(datosJugador);
  }

  return editarJugador(params.idJugador, datosJugador);
}
