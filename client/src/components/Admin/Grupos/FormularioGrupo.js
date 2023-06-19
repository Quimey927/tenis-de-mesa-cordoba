import AdminFormulario from '../AdminFormulario/AdminFormulario';
import Input from '../../UI/Input/Input';
import { crearGrupo, editarGrupo } from '../../../api';

const FormularioGrupo = ({ method, grupo }) => {
  return (
    <AdminFormulario
      method={method}
      textoTitulo={
        method === 'POST' ? 'Agregar grupo' : `Editar ${grupo[0].nombre}`
      }
      navegarAlCancelar={'../..'}
    >
      <Input
        id="nombre"
        required="true"
        label="Nombre*"
        defaultValue={grupo ? grupo[0].nombre : ''}
      />

      {method === 'POST' && (
        <>
          <Input
            type="number"
            id="cant_jugadores"
            required="true"
            label="Cantidad de jugadores*"
          />
        </>
      )}
    </AdminFormulario>
  );
};

export default FormularioGrupo;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const { idFecha, idCategoriaFecha, idFase, idGrupo } = params;

  const datosGrupo = {
    nombre: data.get('nombre'),
    id_fase: idFase,
  };

  if (method === 'POST') {
    return crearGrupo(datosGrupo, idFecha, idCategoriaFecha, idFase);
  }

  return editarGrupo(idGrupo, datosGrupo, idFecha, idCategoriaFecha, idFase);
}
