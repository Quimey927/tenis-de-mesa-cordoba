import AdminFormulario from '../AdminFormulario/AdminFormulario';
import Input from '../../UI/Input/Input';
import { crearJugador, editarJugador } from '../../../api';
import { obtenerSlug } from '../../../utils/obtenerSlug';
import classes from '../AdminFormulario/AdminFormulario.module.css';

const FormularioJugador = ({ method, jugador, clubes }) => {
  return (
    <AdminFormulario
      method={method}
      elemento={jugador}
      nombre_tabla="jugador"
      columna_principal="nombre_completo"
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
        id="fecha_nacimiento"
        label="Fecha de Nacimiento (yyyy-mm-dd)"
        defaultValue={
          jugador && jugador[0].fecha_nacimiento !== null
            ? jugador[0].fecha_nacimiento.substring(0, 10)
            : ''
        }
      />

      <Input
        id="email"
        label="Email"
        defaultValue={jugador ? jugador[0].email : ''}
      />

      <Input
        id="foto_perfil"
        label="Foto de Perfil"
        defaultValue={jugador ? jugador[0].foto_perfil : ''}
      />

      <div className={classes.campo}>
        <label htmlFor="id_club">Club*</label>
        <select
          id="id_club"
          name="id_club"
          defaultValue={jugador ? jugador[0].id_club : 'sin_club'}
        >
          <option value="sin_club">Sin Club</option>
          {clubes.map((club) => (
            <option key={club.id} value={club.id}>
              {club.nombre}
            </option>
          ))}
        </select>
      </div>

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
    fecha_nacimiento: data.get('fecha_nacimiento'),
    email: data.get('email'),
    foto_perfil: data.get('foto_perfil'),
    id_club: data.get('id_club') !== 'sin_club' ? data.get('id_club') : null,
    categoria_fecoteme:
      data.get('categoria_fecoteme') !== 'sin_categoria'
        ? data.get('categoria_fecoteme')
        : null,
    slug: obtenerSlug(
      `${data.get('apellido')} ${data.get('segundo_apellido')} ${data.get(
        'nombre'
      )} ${data.get('segundo_nombre')}`
    ),
  };

  if (method === 'POST') {
    return crearJugador(datosJugador);
  }

  return editarJugador(params.idJugador, datosJugador);
}
