import AdminFormulario from '../AdminFormulario/AdminFormulario';
import Input from '../../UI/Input/Input';
import Select from '../../UI/Select/Select';
import { crearJugador, editarJugador } from '../../../api';
import { obtenerSlug } from '../../../utils/obtenerSlug';

const FormularioJugador = ({ method, jugador, clubes }) => {
  return (
    <AdminFormulario
      method={method}
      textoTitulo={
        method === 'POST'
          ? ' Agregar jugador'
          : `Editar ${jugador[0].nombre_completo}`
      }
    >
      <Input
        id="nombre"
        required={true}
        label="Nombre*"
        defaultValue={jugador ? jugador[0].nombre : ''}
      />

      <Input
        id="segundo_nombre"
        label="Segundo Nombre"
        defaultValue={jugador ? jugador[0].segundo_nombre : ''}
      />

      <Input
        id="apellido"
        required={true}
        label="Apellido*"
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

      <Select
        label="Club*"
        id="id_club"
        defaultValue={jugador ? jugador[0].id_club : 'sin_club'}
        options={[
          { value: 'sin_club', key: 0, texto: 'Sin Club' },
          ...clubes.map((club) => {
            return {
              key: club.id,
              value: club.id,
              texto: club.nombre,
            };
          }),
        ]}
      />

      <Select
        label="Categoría FeCoTeMe"
        id="categoria_fecoteme"
        defaultValue={jugador ? jugador[0].categoria_fecoteme : 'sin_categoria'}
        options={[
          { value: 'sin_categoria', texto: 'Sin Categoría' },
          { value: 'SuperFECOTEME', texto: 'SuperFECOTEME' },
          { value: 'Primera', texto: 'Primera' },
          { value: 'Segunda', texto: 'Segunda' },
          { value: 'Tercera', texto: 'Tercera' },
          { value: 'Cuarta', texto: 'Cuarta' },
          { value: 'Quinta', texto: 'Quinta' },
          { value: 'Sexta', texto: 'Sexta' },
          { value: 'Séptima', texto: 'Séptima' },
        ]}
      />
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
